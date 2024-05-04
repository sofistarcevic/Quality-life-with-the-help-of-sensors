const fs = require('fs');

// Función para leer el archivo y extraer temperaturas y presiones
function leerArchivo(nombreArchivo) {
  // Arrays para almacenar temperaturas y presiones
  const temperaturas = [];
  const presiones = [];
  const metrica_temperaturas = [];
  const metrica_presiones = [];

  try {
    // Leer el archivo línea por línea
    const lineas = fs.readFileSync(nombreArchivo, 'utf8').split('\n');

    // Iterar sobre cada línea
    lineas.forEach(linea => {
      // Dividir la línea en partes usando ':' como separador
      const partes = linea.trim().split(': ');
      // Si la línea tiene el formato correcto
      const clave = partes[0].trim();
      const valor = parseFloat(partes[1]);
      const tiempo = parseFloat(partes[2]);
      // Si la clave es "Temperatura", agregar el valor al array de temperaturas
      if (clave === 'Temperature') {
        metrica_temperaturas.push(tiempo);
        temperaturas.push(valor);
      }
      // Si la clave es "Pression", agregar el valor al array de presiones
      else if (clave === 'Pression') {
        metrica_presiones.push(tiempo);
        presiones.push(valor);
      }
    });

    // Devolver los arrays de temperaturas y presiones
    return { temperaturas, presiones, metrica_temperaturas, metrica_presiones };
  } catch (error) {
    console.error('Error al leer el archivo:', error.message);
    return { temperaturas: [], presiones: [] };
  }
}

// Nombre del archivo de texto
const nombreArchivo = 'datos.txt';

// Llamar a la función para leer el archivo
const { temperaturas, presiones, metrica_temperaturas, metrica_presiones } = leerArchivo(nombreArchivo);

// Imprimir los arrays de temperaturas y presiones
console.log('Temperaturas:', temperaturas);
console.log('Temperaturas:', metrica_temperaturas);
console.log('Presiones:', presiones);
console.log('Presiones:', metrica_presiones);
