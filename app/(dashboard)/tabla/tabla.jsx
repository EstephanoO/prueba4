'use client'

import React, { useState, useRef } from 'react';
import { useQuery } from 'react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  Pagination,
  Button,
  Container,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from 'antd';
import * as XLSX from 'xlsx';
import { pb } from '@/lib/db';
import { DataTable } from '../Formularios/_components/dataTable';

const API_URL = 'https://pym-database.pockethost.io/api/collections';



async function updateFormulario(id, data) {
  const response = await fetch(`${API_URL}/Formulario/records/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const updatedData = await response.json();
  return updatedData;
}

async function deleteFormulario(id) {
  const response = await fetch(`${API_URL}/Formulario/records/${id}`, {
    method: 'DELETE',
  });
  const deletedData = await response.json();
  return deletedData;
}

function TablaPage() {
  const { isLoading, error, data } = useQuery('formularios', DataTable);
  const [filterName, setFilterName] = useState('');
  const [filterTrabajo, setFilterTrabajo] = useState('');
  const [filterFecha, setFilterFecha] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 11;
  const excelTableRef = useRef(null);

  if (isLoading) return 'Cargando...';

  if (error) return `Error al cargar los datos: ${error.message}`;

  const filteredData = data.filter((row) => {
    const trabajoMatch = row.TipoTrabajo.toLowerCase().includes(filterTrabajo.toLowerCase());

    // Convertir las fechas al formato deseado antes de comparar
    const rowFecha = new Date(row.Fecha).toLocaleDateString('en-GB');
    const filterFechaFormatted = filterFecha ? filterFecha.toLocaleDateString('en-GB') : '';

    const fechaMatch = filterFecha ? rowFecha === filterFechaFormatted : true;

    // Nuevo: Filtrar por rango de fechas
    const dateInRange = startDate && endDate ? new Date(row.Fecha) >= startDate && new Date(row.Fecha) <= endDate : true;

    return trabajoMatch && fechaMatch && dateInRange;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleCellDoubleClick = (rowIndex, cellIndex) => {
    setEditingCell({ rowIndex, cellIndex });
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const handleCellKeyDown = async (event, rowIndex, cellIndex, id) => {
    if (event.key === 'Enter') {
      const newData = [...filteredData];
      newData[rowIndex][Object.keys(newData[rowIndex])[cellIndex]] = event.target.value;
      await updateFormulario(id, newData[rowIndex]);
      setEditingCell(null);
    }
  };

  const handleDeleteRow = async (id) => {
    await deleteFormulario(id);
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handleDownloadExcel = () => {
    const filteredDataForExport = filteredData.map((row) => ({
      Fecha: new Date(row.Fecha).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short', hour12: false }),
      Grupos: row.Grupos,
      RD: row.TipoTrabajo.includes('RD') ? 'RD' : '',
      RA: row.TipoTrabajo.includes('RA') ? 'RA' : '',
      DP: row.TipoTrabajo.includes('DP') ? 'DP' : '',
      BANDEJAS: row.TipoTrabajo.includes('BANDEJAS') ? 'BANDEJAS' : '',
      INSTALACIONES: row.TipoTrabajo.includes('INSTALACIONES') ? 'INSTALACIONES' : '',
      ACTIVACIONES: row.TipoTrabajo.includes('ACTIVACIONES') ? 'ACTIVACIONES' : '',
      soplado: row.TipoTrabajo.includes('soplado') ? 'soplado' : '',
      fusiones: row.TipoTrabajo.includes('fusiones') ? 'fusiones' : '',
      TrabajoRealizado: row.TrabajoRealizado,
      Observacion: row.Observacion,
    }));

    const ws = XLSX.utils.json_to_sheet(filteredDataForExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
    XLSX.writeFile(wb, 'tabla_excel.xlsx');
  };

  return (
    <div className='bg-slate-200'>
      <header className=' bg-neutral-100 p-2 border-solid border-slate-200 border-4'>
        <TextField
          label="Nombre"
          value={filterName || ''}
          onChange={(event) => setFilterName(event.target.value)}
          className='ml-8 bg-white'
        />
        <TextField
          label="Tipo Trabajo"
          value={filterTrabajo || ''}
          onChange={(event) => setFilterTrabajo(event.target.value)}
          className=' bg-white'
        />
        <DatePicker
          label="Fecha Inicial"
          value={startDate || null}
          onChange={(date) => setStartDate(date)}
          className=' bg-white'
        />
        <DatePicker
          label="Fecha Final"
          value={endDate || null}
          onChange={(date) => setEndDate(date)}
          className=' bg-white'
        />
        <Button variant="contained" color="primary" onClick={handleDownloadExcel}>
          Descargar Excel
        </Button>
      </header>
      <div style={{ display: "flex" }}>
        <TableContainer component={Paper} className='p-6 pl-6' ref={excelTableRef} style={{ width: "90%", overflow: "auto", height: '100vh', marginLeft: "50px" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>NombresGrupo</TableCell>
                <TableCell>TipoTrabajo</TableCell>
                <TableCell>TrabajoRealizado</TableCell>
                <TableCell>Ubicacion</TableCell>
                <TableCell>Observacion</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getPaginatedData().map((row, rowIndex) => (
                <TableRow key={row.ID}>
                  <TableCell>{new Date(row.Fecha).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short', hour12: false })}</TableCell>

                  <TableCell
                    onDoubleClick={() => handleCellDoubleClick(rowIndex, 4)}
                    onBlur={handleCellBlur}
                  >
                    {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 4 ? (
                      <>
                        <TextField
                          value={row.Grupos}
                          onChange={(event) => {
                            const newData = [...filteredData];
                            newData[rowIndex].Grupos = event.target.value;
                            setEditingCell({ rowIndex, cellIndex: 4 });
                          }}
                          onBlur={handleCellBlur}
                          onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 4, row.ID)}
                        />
                        <IconButton
                          onClick={() => handleCellKeyDown(null, rowIndex, 4, row.ID)}
                        >
                        </IconButton>
                      </>
                    ) : (
                      row.Grupos
                    )}
                  </TableCell>
                  <TableCell
                    onDoubleClick={() => handleCellDoubleClick(rowIndex, 5)}
                    onBlur={handleCellBlur}
                  >
                    {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 5 ? (
                      <>
                        <TextField
                          value={row.TipoTrabajo}
                          onChange={(event) => {
                            const newData = [...filteredData];
                            newData[rowIndex].TipoTrabajo = event.target.value;
                            setEditingCell({ rowIndex, cellIndex: 5 });
                          }}
                          onBlur={handleCellBlur}
                          onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 5, row.ID)}
                        />
                        <IconButton
                          onClick={() => handleCellKeyDown(null, rowIndex, 5, row.ID)}
                        >
                        </IconButton>
                      </>
                    ) : (
                      row.TipoTrabajo
                    )}
                  </TableCell>
                  <TableCell
                    onDoubleClick={() => handleCellDoubleClick(rowIndex, 6)}
                    onBlur={handleCellBlur}
                  >
                    {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 6 ? (
                      <>
                        <TextField
                          value={row.TrabajoRealizado}
                          onChange={(event) => {
                            const newData = [...filteredData];
                            newData[rowIndex].TrabajoRealizado = event.target.value;
                            setEditingCell({ rowIndex, cellIndex: 6 });
                          }}
                          onBlur={handleCellBlur}
                          onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 6, row.ID)}
                        />
                        <IconButton
                          onClick={() => handleCellKeyDown(null, rowIndex, 6, row.ID)}
                        >
                        </IconButton>
                      </>
                    ) : (
                      row.TrabajoRealizado
                    )}
                  </TableCell>
                  <TableCell
                    onDoubleClick={() => handleCellDoubleClick(rowIndex, 7)}
                    onBlur={handleCellBlur}
                  >
                    {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 7 ? (
                      <>
                        <TextField
                          value={row.Ubicacion}
                          onChange={(event) => {
                            const newData = [...filteredData];
                            newData[rowIndex].Ubicacion = event.target.value;
                            setEditingCell({ rowIndex, cellIndex: 7 });
                          }}
                          onBlur={handleCellBlur}
                          onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 7, row.ID)}
                        />
                        <IconButton
                          onClick={() => handleCellKeyDown(null, rowIndex, 7, row.ID)}
                        >
                        </IconButton>
                      </>
                    ) : (
                      row.Ubicacion
                    )}
                  </TableCell>
                  <TableCell
                    onDoubleClick={() => handleCellDoubleClick(rowIndex, 8)}
                    onBlur={handleCellBlur}
                  >
                    {editingCell && editingCell.rowIndex === rowIndex && editingCell.cellIndex === 8 ? (
                      <>
                        <TextField
                          value={row.Observacion}
                          onChange={(event) => {
                            const newData = [...filteredData];
                            newData[rowIndex].Observacion = event.target.value;
                            setEditingCell({ rowIndex, cellIndex: 8 });
                          }}
                          onBlur={handleCellBlur}
                          onKeyDown={(event) => handleCellKeyDown(event, rowIndex, 8, row.ID)}
                        />
                        <IconButton
                          onClick={() => handleCellKeyDown(null, rowIndex, 8, row.ID)}
                        >
                        </IconButton>
                      </>
                    ) : (
                      row.Observacion
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDeleteRow(row.ID)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </div>
  );
}

export default TablaPage;
