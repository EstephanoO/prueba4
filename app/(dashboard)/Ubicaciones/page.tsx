import React from 'react';
import { Container, Grid, Paper, Button } from '@mui/material';
import TableUbi from './_components/TableUbi';
import { Map, MapView } from './_components/Map';
import { GeoButton } from './_components/Geo';

const UbiPage = () => {

  return (
    <div className='m-12'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <GeoButton />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <TableUbi />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Map />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default UbiPage;

