// Formulario.tsx
'use client'
import { useForm } from 'react-hook-form';
import { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import { questions, Option } from './data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, Container, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';
import { pb } from '@/lib/db';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from "date-fns"

const Formulario = () => {
  const { control, handleSubmit, setValue, register, formState, watch } = useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const { isSubmitSuccessful } = formState;
  const questionRefs = Array.from({ length: questions.length }, () => createRef());
  const [date, setDate] = useState<Date>()
  const onSubmit = async (data: any) => {
    try {
      const userId = pb.authStore.model?.id;

      if (!userId) {
        console.error('No se pudo obtener el ID del usuario.');
        return;
      }

      const formattedDate = date ? format(date, "yyyy-MM-dd HH:mm:ss") : null;

      // Convierte TrabajoRealizado a número
      const trabajoRealizado = parseInt(data.TrabajoRealizado, 10);

      // Asegúrate de incluir la propiedad Grupos en el objeto Trabajador solo cuando Grupo es "Sí"
      const trabajadorData = {
        ...data,

        Trabajador: userId,
        Fecha: formattedDate,
        TrabajoRealizado: isNaN(trabajoRealizado) ? 0 : trabajoRealizado,
        ...(data.Grupo === 'Sí' && { Grupos: data.Grupos }),

      };

      console.log(trabajadorData);
      try {
        const result = await axios.post('https://pym-database.pockethost.io/api/collections/Formulario/records', trabajadorData);
        setCurrentStep((prevStep) => prevStep + 1); // Avanzar al siguiente paso después de enviar con éxito
        console.log(result)
      } catch (error) {
        console.error('Error: ', error)

      }
    } catch (error) {
      console.error('Error al enviar el formulario', error);
    }
  }; useEffect(() => {
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
      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        );
      case 'select':
        return (
          <div key={name}>
            <label>{label}</label>
            <select {...register(name, { required: true })} defaultValue="" className="w-full p-2 border border-gray-300 rounded-md">
              <option value="" disabled>Select an option</option>
              {options?.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )
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
                  <Button color="primary" type="button" onClick={index === questions.length - 1 ? handleSubmit(onSubmit) : handleNextStep} style={{ marginTop: '10px' }}>
                    {index === questions.length - 1 ? "Enviar" : "Siguiente"}
                  </Button>
                )}
              </div>
            ))}
            {currentStep > 0 && (
              <Button color="default" type="button" onClick={handlePrevStep} style={{ marginTop: '10px' }}>
                Anterior
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Formulario;

