// api.ts

import axios from "axios";
import { Formularios } from "@/lib/types";
import { pb } from "@/lib/db";

export const API_URL = 'https://pym-database.pockethost.io';
export const TRABAJADOR_API_URL = `${API_URL}/api/collections/users/records`; // Update the endpoint
export const FORMULARIO_API_URL = `${API_URL}/api/collections/Formulario/records`;

interface ExtendedFormulario extends Formularios {
  WorkerNames: string[];
}

export const DataTable = async (): Promise<ExtendedFormulario[]> => {
  try {
    const userId = pb.authStore.model?.id
    const response = await pb.collection('Formulario').getList(1, 50, {
      filter: `Trabajador = "${userId}"`
    })
    const formData = response.items as Formularios[];

    // Log the entire formData array for inspection

    const workerInfoPromises = formData.map(async (item: Formularios) => {
      const workerNames = await Promise.all(
        item.Grupo.map(async (workerId: string) => {
          try {
            const workerResponse = await axios.get(`${TRABAJADOR_API_URL}/${workerId}`);
            return workerResponse.data.name;
          } catch (error) {
            console.error(`Error fetching worker name for ID ${workerId}:`, error);
            return "Sin Grupo";
          }
        })
      );

      return {
        ...item,
        WorkerNames: workerNames,
      };
    });

    const extendedFormData = await Promise.all(workerInfoPromises);

    // Log the extendedFormData array for inspection

    return extendedFormData;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
};
