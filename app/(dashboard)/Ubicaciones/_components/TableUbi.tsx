'use client'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { UbiData } from './DataUbi';

const columns: GridColDef[] = [
  { field: 'Descripcion', headerName: 'Descripcion', width: 200 },
  { field: 'latitud', headerName: 'latitud', width: 110 },
  { field: 'longitud', headerName: 'longitud', width: 110 }
];
const TableUbi = () => {
  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    const data = await UbiData();
    setRows(data);
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns}  />
    </div>
  )
}
export default TableUbi