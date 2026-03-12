///logica para realizar un grafico utilizando chart.js
//importacion de chart.js
import { Chart } from "chart.js/auto";
import { ObtenerDatosMoneda } from "../services/apiservices";





const grafico = document.getElementById('canvas-tendencia') as HTMLCanvasElement;
const btn1M = document.getElementById('btn-1m') as HTMLButtonElement;
const btn3M = document.getElementById('btn-3m') as HTMLButtonElement;
const btn6M = document.getElementById('btn-6m') as HTMLButtonElement;
const btn1Y = document.getElementById('btn-1y') as HTMLButtonElement;


//variable global de caja vacia afuera para guardar ek grafico y poer borrarlo

let miGrafico : Chart | null = null;

//funcion que dibujara el grafico utilizando datos de la API
export const GraficoDolar = async(dias:number) =>{

    let datos ;
    if (dias <=30) {
    // Llamamos a la API
     datos = await ObtenerDatosMoneda('dolar');
    } else {
        const anioActual = new Date().getFullYear().toString();
        datos = await ObtenerDatosMoneda('dolar',anioActual);
    }


    if( datos && datos.serie.length > 0) {

        // tenemos que invertir el arreglo de la API ya que [0] es hoy y [1] es ayer y asi sucesivamente
        const historialInvertido = datos.serie.reverse(); // reverse se encarga de invertir los datos de la fecha

        // Cortamos los datos según el botón (30, 90, 180, 365)

        const datosCortados = historialInvertido.slice(-dias);

        //usamos Map para extraer solo las fechas que iran en el Eje X (el de abajo)
        const etiquetaFecha = datosCortados.map(dia => {
            return new Date(dia.fecha).toLocaleDateString('es-CL'); // con esto convertimos la fecha a 00/00/0000
        });

        //volvemos a usar Map ahora para extraer el valor que ira en el eje Y (los precios)
        const valorDolar = datosCortados.map(dia => dia.valor);

        // EL BORRADOR: Si ya existe un gráfico, lo destruimos para no encimarlos

        if (miGrafico) {
            miGrafico.destroy();
        }
        
/// Aqui Creamos el grafico utilizando Chart.js

miGrafico = new Chart(grafico, {
            type: 'line', // Queremos un gráfico de líneas
            data: {
                labels: etiquetaFecha, // Le pasamos la pila de fechas
                datasets: [{
                    label: 'Valor del Dólar (CLP)',
                    data: valorDolar, // Le pasamos la pila de números
                    borderColor: '#00d2ff', // Color de la línea (puedes cambiarlo a tu gusto)
                    tension: 0.1, // Qué tan curva es la línea (0 es recta, 0.5 es muy redonda)
                    pointRadius: 3 // El tamaño de los puntitos en cada día
                }]
            },
            options : {
                responsive :true,
                maintainAspectRatio : false // para desactivar el tamaño forzado que chart.js trae por defecto
            }
        });
    }
};

const cambiarBotonActivo = (botonClickeado: HTMLButtonElement) => {
    btn1M.classList.remove('activo');
    btn3M.classList.remove('activo');
    btn6M.classList.remove('activo');
    btn1Y.classList.remove('activo');
    botonClickeado.classList.add('activo');
};

// 5. Escuchamos los botones y le mandamos los días a tu función
btn1M.addEventListener('click', () => { GraficoDolar(30); cambiarBotonActivo(btn1M); });
btn3M.addEventListener('click', () => { GraficoDolar(90); cambiarBotonActivo(btn3M); });
btn6M.addEventListener('click', () => { GraficoDolar(180); cambiarBotonActivo(btn6M); });
btn1Y.addEventListener('click', () => { GraficoDolar(365); cambiarBotonActivo(btn1Y); });

GraficoDolar(30)
