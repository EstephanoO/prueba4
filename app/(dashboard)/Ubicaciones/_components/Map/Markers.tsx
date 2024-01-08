
import React from 'react';
import { Ubi } from '@/lib/types';
import { Marker, Popup } from 'react-leaflet';

export const generateMarkers = (ubis: Ubi[]) => {
  return ubis.map((ubi) => (
    <Marker key={ubi.id} position={[ubi.latitud, ubi.longitud]}>
      <Popup>{ubi.Descripcion}</Popup>
    </Marker>
  ));
};