'use client'

import React, { useState } from 'react';
import { TextField } from "@mui/material";
import axios from 'axios';
import { pb } from '@/lib/db';
import { API_URL } from '@/app/(dashboard)/Formularios/_components/dataTable';
import { Coordinates } from '@/lib/types';
import { Button } from '@/components/ui/button';

const GeoButton = () => {
  const [location, setLocation] = useState<Coordinates>({ longitud: null, latitud: null });
  const [descripcion, setDescripcion] = useState('');

  const handleEnviarUbicacion = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setLocation({ longitud: longitude, latitud: latitude });

          // Verificar si la descripción está vacía
          const descripcionFinal = descripcion.trim() === '' ? 'Ubicación sin descripción' : descripcion.trim();
          const userId = pb.authStore.model?.id

          // Lógica para enviar la ubicación a través de Axios
          axios.post(`${API_URL}/api/collections/Ubicacion/records`, {
            longitud: longitude,
            latitud: latitude,
            Descripcion: descripcionFinal,
            user: userId,
          })
            .then(response => {
              console.log('Ubicación enviada con éxito:', response.data);
            })
            .catch(error => {
              console.error('Error al enviar la ubicación:', error);
            });
        },
        (error) => {
          console.error('Error al obtener la geolocalización:', error.message);
        }
      );
    } else {
      alert('Tu navegador no tiene acceso a la Geolocalización');
    }
  };

  return (
    <div className='m-4 pb-2 '>
      {/* Campo de entrada para la descripción */}
      <TextField
        label="Descripción"
        variant="outlined"
        fullWidth
        margin="normal"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      {/* Botón para enviar la ubicación */}
      <Button color="primary" onClick={handleEnviarUbicacion}>
        Enviar Ubicación
      </Button>
    </div>
  );
}

export default GeoButton;
