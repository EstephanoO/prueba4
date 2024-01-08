'use client'
// Formulario.js
import { useForm, Controller } from 'react-hook-form';
import { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import { questions, Option } from './data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, Container, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';

const Formulario = () => {
  const { control, handleSubmit, setValue, register, formState, watch } = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const { isSubmitSuccessful } = formState;
  const questionRefs = Array.from({ length: questions.length }, () => createRef());

  const onSubmit = async (data: any) => {
    try {
      console.log(data)
      await axios.post('https://pym-database.pockethost.io/api/collections/Formulario/records', data);
      setCurrentStep((prevStep) => prevStep + 1); // Avanzar al siguiente paso después de enviar con éxito
    } catch (error) {
      console.error('Error al enviar el formulario', error);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  }, [isSubmitSuccessful]);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderQuestion = (question: any, index: any) => {
    if (index !== currentStep) {
      return null;
    }

    const { name, label, type, options } = question;

    switch (type) {
      case 'radio':
        return (
          <div key={name}>
            <label>{label}</label>
            <RadioGroup
              name={name}
              value={watch(name)}
              onChange={(e) => setValue(name, e.target.value)}
            >
              {options.map((option: any) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </div>
        );
      default:
        return (
          <div key={name}>
            <label>{label}</label>
            <TextField {...register(name, { required: true })} variant="outlined" fullWidth />
          </div>
        );
    }
  };

  return (
    <Container maxWidth="sm">
      <Card style={{ marginTop: '50px' }}>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {questions.map((question, index) => (
              <div key={question.name} >
                {renderQuestion(question, index)}
                {index === currentStep && (
                  <Button color="primary" type="button" onClick={handleNextStep} style={{ marginTop: '10px' }}>
                    Siguiente
                  </Button>
                )}
              </div>
            ))}
            {currentStep > 0 && (
              <Button color="default" type="button" onClick={handlePrevStep} style={{ marginTop: '10px' }}>
                Anterior
              </Button>
            )}
            {currentStep === questions.length - 1 && (
              <Button color="primary" type="submit" style={{ marginTop: '10px' }}>
                Enviar
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Formulario;
