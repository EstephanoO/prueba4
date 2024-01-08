'use client'

import { useEffect, useState } from 'react';
import Leaflet from 'leaflet';
import * as ReactLeaflet from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { TileLayer } from 'react-leaflet';
import { Ubi } from '@/lib/types';
import { UbiData } from '../DataUbi';
import { generateMarkers } from './Markers';


const { MapContainer } = ReactLeaflet;

const Map = ({...rest  }) => {


  const [ubis, setUbis] = useState<Ubi[]>([]);

  const fetchData = async () => {
    const data: Ubi[] = await UbiData();
    setUbis(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!ubis || ubis.length === 0) {
    return null;
  }

  const averageLat = ubis.reduce((sum, ubi) => sum + ubi.latitud, 0) / ubis.length;
  const averageLng = ubis.reduce((sum, ubi) => sum + ubi.longitud, 0) / ubis.length;
  return (
     <MapContainer center={[averageLat, averageLng]} zoom={10} {...rest}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {generateMarkers(ubis)}
      </MapContainer>
  )
}

export default Map;