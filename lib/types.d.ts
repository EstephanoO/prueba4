export interface Formularios {
    id: string;
    collectionId: string;
    collectionName: string;
    created: string;
    updated: string;
    Fecha: string;
    Trabajador: string;
    Grupo: string[];
    TipoTrabajo: string;
    Ubicacion: string;
    Observacion: string;
    TrabajoRealizado: number;
  };
  interface User {
    id: string
    name: string
    email: string
    username: string
  }
  export interface Ubi {
    id: string
    longitud: number
    Descripcion: string
    latitud: number
    user: User[]
  }
  export type Coordinates = {
    longitud: number | null;
    latitud: number | null;
  };