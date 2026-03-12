/// logica para mostrar los valores en las tarjetas 

import { ObtenerDatosMoneda } from "../services/apiservices";

//carta dolar
const valorDolar = document.getElementById('valor-dolar') as HTMLElement;
const previoDolar = document.getElementById('previo-dolar') as HTMLElement;
const spanTendenciaDolar = document.getElementById('tendencia-dolar') as HTMLElement;

//carta UF
const valorUf = document.getElementById('valor-uf') as HTMLElement;
const spanTendenciaUf = document.getElementById('tendencia-uf') as HTMLElement;

// CARTA EURO
const valorEuro = document.getElementById('valor-euro') as HTMLElement;
const previoEuro = document.getElementById('actualizacion-euro') as HTMLElement;
const spanTendenciaEuro = document.getElementById('tendencia-euro') as HTMLElement;

//CARTA UTM
const valorUtm = document.getElementById('valor-utm') as HTMLElement;
const spanTendenciaUtm = document.getElementById('tendencia-utm') as HTMLElement;


const calcularTendencia = (valorHoy:number,valorAyer:number,cajaDestino : HTMLElement)=>{

    //formula para calcular la tendencia

    const diferencia = ((valorHoy - valorAyer)/valorAyer)*100 ;
    const porcentaje = diferencia.toFixed(2);

    //agregamos el resultado en la caja HTML que le pasamos

    if(diferencia > 0) {
        cajaDestino.textContent = `+${porcentaje}%`;
        cajaDestino.className = 'tendencia-positiva';
    }else if(diferencia< 0){
        cajaDestino.textContent = `${porcentaje}%`;
        cajaDestino.className = 'tendencia-negativa' 
    }else{
        cajaDestino.textContent = `0.00%`;
        cajaDestino.className = 'tendencia-neutra'
    }
};


// funcion para cargar datos a las cartas 
export const cargarTarjetas = async ()=>{

    //tarjeta para dolar
    const datosDolar = await ObtenerDatosMoneda ('dolar');
    if (datosDolar && datosDolar.serie.length >1) {
        valorDolar.textContent = `${datosDolar.serie[0].valor.toLocaleString('es-CL')}`
        previoDolar.textContent = `${datosDolar.serie[1].valor.toLocaleString('es-CL')}`;


    const hoy = datosDolar.serie[0].valor;
    const ayer = datosDolar.serie[1].valor;
    calcularTendencia(hoy,ayer,spanTendenciaDolar);
    }

    // tarjeta para UF

    const datosUf = await ObtenerDatosMoneda ('uf');
    if(datosUf && datosUf.serie.length > 0){
        valorUf.textContent = `$${datosUf.serie[0].valor.toLocaleString('es-CL')}`;

    const hoy = datosUf.serie[0].valor;
    const ayer = datosUf.serie[1].valor;
    calcularTendencia(hoy,ayer,spanTendenciaUf);
        
    }

    // TARJETA EURO

    const datosEuro = await ObtenerDatosMoneda ('euro');
    if(datosEuro && datosEuro.serie.length > 0){
        valorEuro.textContent = `${datosEuro.serie[0].valor.toLocaleString('es-CL')}`;
        previoEuro.textContent = `${datosEuro.serie[1].valor.toLocaleString('es-CL')}`;

    const hoy = datosEuro.serie[0].valor;
    const ayer = datosEuro.serie[1].valor;
    calcularTendencia(hoy,ayer,spanTendenciaEuro);
    }

    // tarjeta UTM

    const datosUtm = await ObtenerDatosMoneda ('utm');
    if(datosUtm && datosUtm.serie.length > 0){
        valorUtm.textContent = `${datosUtm.serie[0].valor.toLocaleString('es-CL')}`;

    const hoy = datosUtm.serie[0].valor;
    const ayer = datosUtm.serie[1].valor;
    calcularTendencia(hoy,ayer,spanTendenciaUtm);
    }
    
}

cargarTarjetas()