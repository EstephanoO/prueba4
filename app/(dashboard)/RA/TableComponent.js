import React from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';


const TableComponent = ({ markers }) => {
  // Función para calcular las diferencias desde POP y entre marcadores consecutivos
  const calculateDistances = () => {
    const distances = [];
    let cataCount = 0;
    let arquetaCount = 0;

    // Calcula la distancia desde POP al primer marcador
    if (markers.length > 0) {
      if (markers[0].type === 'Cata') {
        cataCount++;
        distances.push({
          from: 'POP',
          to: `Cata ${cataCount}`,
          distance: markers[0].meters,
        });
      } else if (markers[0].type === 'Arqueta') {
        arquetaCount++;
        distances.push({
          from: 'POP',
          to: `Arqueta ${arquetaCount}`,
          distance: markers[0].meters,
        });
      }
    }

    // Calcula las distancias entre marcadores consecutivos
    for (let i = 0; i < markers.length - 1; i++) {
      const distance = markers[i + 1].meters;
      if (markers[i].type === 'Cata' && markers[i + 1].type === 'Cata') {
        cataCount++;
        distances.push({
          from: `Cata ${cataCount - 1}`,
          to: `Cata ${cataCount}`,
          distance: distance,
        });
      } else if (markers[i].type === 'Arqueta' && markers[i + 1].type === 'Arqueta') {
        arquetaCount++;
        distances.push({
          from: `Arqueta ${arquetaCount - 1}`,
          to: `Arqueta ${arquetaCount}`,
          distance: distance,
        });
      } else if (markers[i].type === 'Cata' && markers[i + 1].type === 'Arqueta') {
        arquetaCount++;
        distances.push({
          from: `Cata ${cataCount}`,
          to: `Arqueta ${arquetaCount}`,
          distance: distance,
        });
      } else if (markers[i].type === 'Arqueta' && markers[i + 1].type === 'Cata') {
        cataCount++;
        distances.push({
          from: `Arqueta ${arquetaCount}`,
          to: `Cata ${cataCount}`,
          distance: distance,
        });
      }
    }

    return distances;
  };

  const distances = calculateDistances();

  return (
    <div className="table-container">
      <Typography variant="h6" gutterBottom>
        Distancias entre marcadores
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Desde - Hasta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {distances.map((distance, index) => (
            <TableRow key={index}>
              <TableCell>{`${distance.from} - ${distance.to} = ${distance.distance} metros`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableComponent;
