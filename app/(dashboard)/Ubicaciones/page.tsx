import React from 'react';
import { Container, Grid, Paper, Button } from '@mui/material';
import TableUbi from './_components/TableUbi';
import { Map, MapView } from './_components/Map';
import { GeoButton } from './_components/Geo';

const UbiPage = () => {

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <GeoButton />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            {/* TableUbi Component */}
            <TableUbi />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            {/* MapView Component */}
            <Map />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UbiPage;
