// aplicamos el "type" para las interfaces ya que estas no existen en javascript y es necesario para poder exportar y visualizar en el Main.ts
import { animator } from 'chart.js';
import type { IndicadorBusqueda } from '../interfaces/indicador';

// creacion de la funcion exportable para que se pueda usar en el Main

export const ObtenerDatosMoneda = async (tipoIndicador : string,anio?:string) : Promise <IndicadorBusqueda | null> =>{

    try {

        // llamamos a la api usando Fetch y comillas  template string ``

        const url = anio 
        ?`https://mindicador.cl/api/${tipoIndicador}/${anio}`
        :`https://mindicador.cl/api/${tipoIndicador}`;

        const resp = await fetch (url);/// con esto llamamos a la API

       // revisemos que todo salio bien 

        if(!resp.ok){
            throw new Error ('No se pudo obtener la informacion');
        }

        ///convertir a objeto de js
        const data : IndicadorBusqueda = await resp.json();

        // console.log('obtuvimos la data',data)

        return data;

    }catch(error) {
        console.error('Error al llamar a la API:',error);
        return null ;
    }   

}
    

