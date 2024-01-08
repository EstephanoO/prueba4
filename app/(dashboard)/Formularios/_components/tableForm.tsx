'use client'
// TableForm.tsx

import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { DataTable, TRABAJADOR_API_URL } from './dataTable';
import { Formularios } from '@/lib/types';
import axios from 'axios';


const columns: GridColDef[] = [
  { field: 'Fecha', headerName: 'Fecha', width: 110 },
  { field: 'Grupo', headerName: 'Grupo', width: 200 },
  { field: 'TipoTrabajo', headerName: 'Tipo Trabajo', width: 120 },
  { field: 'TrabajoRealizado', headerName: 'Trabajo Realizado', width: 130 },
  { field: 'Ubicacion', headerName: 'Ubicacion', width: 130 },
  { field: 'Observacion', headerName: 'Observacion', width: 200 },
];

const TableForm = () => {
  const [rows, setRows] = useState<Formularios[]>([]);
  const [workerNameMapping, setWorkerNameMapping] = useState<{ [key: string]: string }>({});
  const fetchData = async () => {
    const data = await DataTable();
    setRows(data);
  };

  useEffect(() => {
    fetchData();

    // Retrieve workerNameMapping and set it in the state
    const fetchWorkerNameMapping = async () => {
      try {
        const response = await axios.get(`${TRABAJADOR_API_URL}`);
        const workers = response.data.items;
        const mapping: { [key: string]: string } = {};
        workers.forEach((worker: any) => {
          mapping[worker.id] = worker.name;
        });
        setWorkerNameMapping(mapping);
      } catch (error) {
        console.error('Error fetching worker names:', error);
      }
    };

    fetchWorkerNameMapping();
  }, []);

  // Update the columns dynamically to show user names instead of worker IDs
  const updatedColumns: GridColDef[] = columns.map(column => {
    if (column.field === 'Grupo') {
      return {
        ...column,
        valueGetter: (params) => {
          // Use the workerNameMapping to get the user names based on the worker IDs
          const workerNames = params.row['WorkerNames'];
          return workerNames.join(', ') || "Sin Grupo";
        },
      };
    }
    return column;
  });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={updatedColumns}  />
    </div>
  );
};

export default TableForm;
