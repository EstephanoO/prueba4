// data.js
export interface Option {
  label: string;
  value: string | number; // Puedes ajustar el tipo según tus necesidades
}

// Define un tipo personalizado para las claves de tus preguntas
export type QuestionKeys = "Fecha" | "Grupo" | "NombresGrupo" | "TipoTrabajo" | "TrabajoRealizado" | "Ubicacion" | "Observacion";

export interface Question {
  name: QuestionKeys;
  label: string;
  type?: string;
  options?: Option[];
  required?: boolean;
}

export const questions: Question[] = [
  {
    name: "Fecha",
    label: "Fecha",
    required: true,
  },
  {
    name: "Grupo",
    label: "¿El trabajo fue en grupo?",
    type: "radio",
    options: [
      {
        label: "Sí",
        value: "Sí",
      },
      {
        label: "No",
        value: "No",
      },
    ],
  },
  {
    name: "NombresGrupo",
    label: "Nombres del grupo",
    required: true,
  },
  {
    name: "TipoTrabajo",
    label: "Tipo de trabajo",
    required: true,
  },
  {
    name: "TrabajoRealizado",
    label: "Trabajo realizado",
    required: true,
  },
  {
    name: "Ubicacion",
    label: "Ubicación",
    required: true,
  },
  {
    name: "Observacion",
    label: "Observaciones",
  },
];

// Otro código relacionado con el formulario, si lo tienes

