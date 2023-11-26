const vm = require('node:vm');
// const fs = require('node:fs'); 

// const vm = require('vm');

// Crea un contexto vacío
const contexto = vm.createContext();

// Objeto para almacenar la salida de la consola
const salidaConsola = { log: [] };

// Redirige la salida estándar
contexto.console = {
  log: (...args) => salidaConsola.log.push(args.join(' ')),
};

let codigo = 'console.log("Hola mundo")';

// Ejecuta el código en el contexto
vm.runInContext(codigo, contexto);

// Obtiene la salida capturada
let resultadoConsola = salidaConsola.log.join('\n');

// Muestra el resultado en un elemento <p>
// const resultadoElement = document.createElement('p');
// resultadoElement.textContent = resultadoConsola;

// Agrega el elemento al cuerpo del documento
// document.body.appendChild(resultadoElement);

// Imprime la salida capturada
console.log(salidaConsola.log.join('\n'));