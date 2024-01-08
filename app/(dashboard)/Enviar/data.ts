// data.js
export interface Option {
  label: string;
  value: string | number; // Puedes ajustar el tipo según tus necesidades
}

// Define un tipo personalizado para las claves de tus preguntas
export type QuestionKeys = "Fecha" | "Grupos2" | "Grupos" | "TipoTrabajo" | "TrabajoRealizado" | "Ubicacion" | "Observacion";

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
    type: "date"
  },
  {
    name: "Grupos2",
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
    name: "Grupos",
    label: "Grupos",
    required: true,
  },
  {
    name: "TipoTrabajo",
    label: "Tipo de trabajo",
    type: "select", // Actualizado a "select"
    options: [
      { label: "RD", value: "RD" },
      { label: "RA", value: "RA" },
      { label: "DP", value: "DP" },
      { label: "BANDEJAS", value: "BANDEJAS" },
      { label: "INSTALACIONES", value: "INSTALACIONES" },
      { label: "ACTIVACIONES", value: "ACTIVACIONES" },
      { label: "ACTIVACIONES Y INSTALACIONES", value: "BOTH" },
      { label: "SOPLADO", value: "SOPLADO" },
      { label: "FUSIONES", value: "FUSIONES" },
      { label: "OTROS", value: "OTROS" },
    ],
    required: true,
  },
  {
    name: "TrabajoRealizado",
    label: "Trabajo realizado",
    type: "number",
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

