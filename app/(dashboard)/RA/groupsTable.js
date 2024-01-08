// GroupTable.js
import React from 'react';
import { Typography, List, ListItem } from '@mui/material';

export const GroupTable = ({ groupNames }) => {
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom>
        Grupo:
      </Typography>
      <List>
        {groupNames.map((groupName, index) => (
          <ListItem key={index}>
            <Typography>{groupName}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default GroupTable;
