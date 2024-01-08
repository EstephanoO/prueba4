import React from 'react';
import { Button } from '@/components/ui/button';
const InputGroup = ({ handleAddGroupNames }) => {
  return (
    <>
  
      <Button variant='default' className='mt-2' onClick={handleAddGroupNames}>
        Grupo
      </Button>
    </>
  );
};

export default InputGroup;
