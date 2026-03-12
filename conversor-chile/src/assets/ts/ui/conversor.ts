import { ObtenerDatosMoneda } from "../services/apiservices";

// logica para realizar la conversion de las monedas
//capturar los campos de ingreso de moneda y selector de moneda
// el uso de los  as HTMLElement o HTMLInputElement es para que TS no se rompa"
const inputOrigen = document.getElementById('monto-origen') as HTMLInputElement;
const selectOrigen = document.getElementById('moneda-origen') as HTMLSelectElement;
const inputDestino = document.getElementById('monto-destino') as HTMLInputElement;
const selectDestino = document.getElementById('moneda-destino') as HTMLSelectElement;
const spanTasa = document.getElementById('tasa-actual') as HTMLSpanElement;
const spanTiempo = document.getElementById ('tiempo-actualizacion') as HTMLSpanElement;
// const btnconvertir = document.getElementById('btn-convertir') as HTMLButtonElement;

// funcion principal  asincrona de flecha 
export const calcularConversion = async()=>{

    //que moneda eligio el usuario???
    const monedaSeleccionda = selectOrigen.value;

    //hacer un switch para cambir USD por dolar UF por uf segun nombres de la API
    let indicadorAPI : string = "";

    switch(monedaSeleccionda) {
        case 'USD' : indicadorAPI = 'dolar'; break;
        case 'EUR' : indicadorAPI = 'euro' ; break;
        case 'UF'  : indicadorAPI = 'uf';    break;
        default    : indicadorAPI = 'dolar' ; break;
    }

    // ahora si llamamos la API usando el await para esperar respuesta
    const datos = await ObtenerDatosMoneda(indicadorAPI);

    //verificamos si los datos llegaron bien y hacemos la logica 
    // el operador && significa "ademas" o "and" usado en If para hacer preguntas dobles
    if(datos && datos.serie.length >0) {
        const valorActual = datos.serie[0].valor; //tomamos el ultimo valor osea el valor del dia

        spanTasa.textContent = `1 ${monedaSeleccionda} = ${valorActual} CLP`;
       // 3. MAGIA AQUÍ: Creamos la hora actual y la inyectamos
        const horaActual = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
        spanTiempo.textContent = `a las ${horaActual}`


    //que numero escribio el usuario? usamos value para saber
    // el '+' convierte el texto '10' a numero 10    
    const monto = +inputOrigen.value;

    // SI EL USUARIO BORRA Y DEJA VACIO, NO SE CALCULA NADA.
    if(monto === 0 || isNaN(monto)){
        inputOrigen.value = "";
        return;
    }

        const resultado = monto * valorActual;
        inputDestino.value = new Intl.NumberFormat('es-CL').format(Math.round(resultado)); // con esto formateamos a los numeros en moneda chilena

    console.log(`Calculo exitoso: ${monto} de la moneda ${monedaSeleccionda}`);

    }
};

  // escuchadores 
  //esuchar el input del usuario al escribir 
  inputOrigen.addEventListener('input',calcularConversion);

  //escuchar cuando el usuario cambia la moneda " para los <select> usamos el evento change"
  selectOrigen.addEventListener('change',calcularConversion);

  calcularConversion();

//escuchar el clic del boton convertir
//   btnconvertir.addEventListener('click',calcularConversion);

  

