///utilizamos un interfaces para indicar los tipos de datos a trabajar segun la API de miindicador.cl

export interface DatosSerie {

    fecha : string;
    valor : number;
}

export interface IndicadorBusqueda {

    codigo  : string;
    nombre : string;
    unidad_medida : string;
    serie : DatosSerie[];
}