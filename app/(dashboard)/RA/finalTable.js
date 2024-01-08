import React from 'react';
import { Typography, List, ListItem } from '@mui/material';

const DistanceTable = ({ markers, totalMeters }) => {
  // Filtrar los marcadores de tipo Cata o Arqueta
  const filteredMarkers = markers.filter(marker => marker.type === 'Cata' || marker.type === 'Arqueta');

  // Encontrar el último marcador de tipo Cata o Arqueta
  const lastMarker = filteredMarkers.length > 0 ? filteredMarkers[filteredMarkers.length - 1] : null;

  let displayInfo = null;
  let remainingDistance = null;

  if (lastMarker !== null) {
    const totalMarkersMeters = filteredMarkers.reduce((acc, marker) => acc + marker.meters, 0);
    remainingDistance = totalMeters - totalMarkersMeters;
    const missingMeters = remainingDistance >= 0 ? remainingDistance : Math.abs(remainingDistance);
    const markerType = lastMarker.type;
    let markerNumber = filteredMarkers.filter(marker => marker.type === markerType).length;

    if (markerType === 'Arqueta') {
      markerNumber++;
    }

    const markerName = `${markerType} ${markerNumber}`;

    displayInfo = (
      <List>
        <ListItem>
          <Typography>
            {markerName} - {remainingDistance >= 0 ? `Faltan ${missingMeters} metros` : `Sobran ${missingMeters} metros`}
          </Typography>
        </ListItem>
      </List>
    );
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Información de Distancia
      </Typography>
      {displayInfo !== null ? (
        <>
          {displayInfo}
        </>
      ) : (
        <Typography variant="body2">
          No hay información disponible.
        </Typography>
      )}
    </div>
  );
};

export default DistanceTable;
