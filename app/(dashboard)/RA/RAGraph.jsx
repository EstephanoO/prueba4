'use client'
import React, { useState, useRef, useEffect } from 'react';
import './SliderComponent.css'; // Importar los estilos
import TableComponent from './TableComponent'
import DistanceTable from './finalTable';
import { GroupTable } from './groupsTable'
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputGroup from './InputGroup'

const SliderComponent = () => {
  const [markers, setMarkers] = useState([]);
  const [addingMode, setAddingMode] = useState(null);
  const [draggingMarker, setDraggingMarker] = useState(null);
  const [totalMeters, setTotalMeters] = useState(0); // Estado para almacenar los metros totales ingresados
  const sliderRef = useRef(null);
  const [groupNames, setGroupNames] = useState([]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (draggingMarker !== null) {
        const rect = sliderRef.current.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percentage = (offsetX / rect.width) * 100;

        if (percentage >= 0 && percentage <= 100) {
          const newMarkers = markers.map((marker, index) =>
            index === draggingMarker ? { ...marker, position: percentage } : marker
          );
          setMarkers(newMarkers);
        }
      }
    };

    const handleMouseUp = () => {
      setDraggingMarker(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingMarker, markers]);

  const handleClickSlider = (e) => {
    if (addingMode !== null) {
      const rect = sliderRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percentage = (offsetX / rect.width) * 100;

      const meters = prompt('¿Cuántos metros avanzados?', '0');
      if (meters !== null) {
        const newMarkers = [
          ...markers,
          { id: markers.length, position: percentage, meters: parseFloat(meters), type: addingMode }
        ];
        setMarkers(newMarkers);
        setAddingMode(null);
      }
    }
  };

  const addMarkerCata = () => {
    setAddingMode('Cata');
  };

  const addMarkerArqueta = () => {
    setAddingMode('Arqueta');
  };

  const handleMarkerMouseDown = (id) => {
    setDraggingMarker(id);
  };
  const handleAddGroupNames = () => {
    const groupName = prompt('Ingrese el nombre del grupo:', '');
    if (groupName) {
      setGroupNames([...groupNames, groupName]);
    }
  };

  return (

    <div className="slider-wrapper">
      <div className="slider-container rounded-md shadow-md p-4">
        <header className='text-2xl'>JPF-230-DP032</header>
        <Label>Metros totales: </Label>
        <Input
          className='border-2 border-neutral-300 rounded-md'
          onChange={(e) => setTotalMeters(parseFloat(e.target.value))}
        />
        <InputGroup handleAddGroupNames={handleAddGroupNames} />

        <header className='pb-4 p-2 flex justify-between'>
          <span>POP</span>
          <span>DP</span>
        </header>
        <div className="slider" ref={sliderRef} onClick={handleClickSlider}>
          {/* Marcadores existentes */}
          {markers.map((marker, index) => (
            <div
              key={marker.id}
              style={{
                left: `${marker.position}%`,
                backgroundColor: marker.type === 'Cata' ? '#3f95cf' : 'red',
              }}
              onMouseDown={() => handleMarkerMouseDown(marker.id)}
              title={`${marker.type} ${index}: ${marker.meters} metros`} // Modificación del título
            ></div>
          ))}
        </div>
        {/* Indicadores de porcentaje */}
        <div className="flex justify-between">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
        {/* Botones para agregar marcadores */}
        <div className='mt-8 flex'>
          <Button onClick={addMarkerCata} className="mr-2" variant='cata'>
            {addingMode ? null : 'Agregar Cata'}
          </Button>
          <Button onClick={addMarkerArqueta} variant='destructive'>
            {addingMode ? null : 'Agregar Arqueta'}
          </Button>
        </div>
        <div className="tables-container flex bg-neutral-300">
          <div className="table-wrapper">
            <GroupTable groupNames={groupNames} />
          </div>
          <TableComponent markers={markers} />
          <div className="table-wrapper">
            <DistanceTable markers={markers} totalMeters={totalMeters} />
          </div>      </div>
        <div className="table-wrapper">
        </div>
      </div>
    </div>
  );
};

export default SliderComponent;
