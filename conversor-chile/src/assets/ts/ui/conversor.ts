import { ObtenerDatosMoneda } from '../services/apiservices';

// logica para realizar la conversion de las monedas
//capturar los campos de ingreso de moneda y selector de moneda
// el uso de los  as HTMLElement o HTMLInputElement es para que TS no se rompa"
const inputOrigen = document.getElementById('monto-origen') as HTMLInputElement;
const selectOrigen = document.getElementById('moneda-origen') as HTMLSelectElement;
const inputDestino = document.getElementById('monto-destino') as HTMLInputElement;
const selectDestino = document.getElementById('moneda-destino') as HTMLSelectElement;
const spanTasa = document.getElementById('tasa-actual') as HTMLSpanElement;
const spanTiempo = document.getElementById ('tiempo-actualizacion') as HTMLSpanElement;
const btnSwap = document.querySelector('.btn-swap') as HTMLButtonElement; // para las clases

// const btnconvertir = document.getElementById('btn-convertir') as HTMLButtonElement;


const obtenerIndicadorApi = (moneda :string) =>{
    switch(moneda) {
        case 'USD' : return 'dolar';
        case 'EUR' : return 'euro';
        case 'UF'  : return 'uf';
        default    : return '';        
    }
};


// funcion principal  asincrona de flecha 
export const calcularConversion = async()=>{
    const origen = selectOrigen.value;
    const destino = selectDestino.value;
    const monto = +inputOrigen.value;

    // 1. Buscamos el valor de la moneda ORIGEN en la API SIEMPRE
    let valorOrigen = 1; 
    if (origen !== 'CLP') {
        const datosOrigen = await ObtenerDatosMoneda(obtenerIndicadorApi(origen));
        if (datosOrigen && datosOrigen.serie.length > 0) {
            valorOrigen = datosOrigen.serie[0].valor;
        }
    }

    // 2. Buscamos el valor de la moneda DESTINO en la API SIEMPRE
    let valorDestino = 1; 
    if (destino !== 'CLP') {
        const datosDestino = await ObtenerDatosMoneda(obtenerIndicadorApi(destino));
        if (datosDestino && datosDestino.serie.length > 0) {
            valorDestino = datosDestino.serie[0].valor;
        }
    }

    // 3. Actualizamos los textos de Tasa y Hora SIEMPRE, haya o no haya monto escrito
    spanTasa.textContent = `1 ${origen} = ${(valorOrigen / valorDestino).toFixed(2)} ${destino}`;
    const horaActual = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    spanTiempo.textContent = `a las ${horaActual}`;

    // 4. EL MURO: Si el usuario borra y deja vacío, limpiamos el destino y cortamos la función aquí
    if(monto === 0 || isNaN(monto)){
        inputDestino.value = "";
        return;
    }

    // 5. Si pasamos el muro (hay un número válido), hacemos el cálculo y lo mostramos
    const montoEnCLP = monto * valorOrigen;
    const resultado = montoEnCLP / valorDestino;
    inputDestino.value = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 }).format(resultado);
};

  // escuchadores 
  //esuchar el input del usuario al escribir 
  inputOrigen.addEventListener('input',calcularConversion);

  //escuchar cuando el usuario cambia la moneda " para los <select> usamos el evento change"
  selectOrigen.addEventListener('change',calcularConversion);

// escuhar al boton swap para cambiar el tipo de cambio
  btnSwap.addEventListener('click',()=>{
    //para guardar la moneda de origen
    const temporal =selectOrigen.value;
    // pasar la moneda de destino a el de origen EJ CLP pasa a la izquierda y USD a la derecha
    selectOrigen.value = selectDestino.value;
    // completar el destino con la variable temporal 
    selectDestino.value = temporal;
  })

  calcularConversion();
//escuchar el clic del boton convertir
//btnconvertir.addEventListener('click',calcularConversion);

  

