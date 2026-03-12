import '../css/variables.css';
import '../css/base.css';
import '../css/header.css';
import '../css/calculadora.css';
import '../css/indicadores.css';
import '../css/dashboard.css';
import '../css/footer.css';
import '../ts/ui/tarjetas';
import '../ts/ui/conversor.js';
import '../ts/ui/dashboard.js';
import { inicializarModoClaro } from "./modo-claro.js";
import { ObtenerDatosMoneda } from '../ts/services/apiservices';
import { cargarTarjetas } from '../ts/ui/tarjetas';
// import { calcularConversion } from '../ts/ui/conversor.js';






/// solo llamando la funcion el import se deberia hacer automaticamente
inicializarModoClaro();
ObtenerDatosMoneda('dolar');
// calcularConversion();
cargarTarjetas()