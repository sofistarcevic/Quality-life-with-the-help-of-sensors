const fs = require('fs');

// Función para leer el archivo y extraer temperaturas y presiones
function leerArchivo(nombreArchivo) {
  // Arrays para almacenar temperaturas y presiones
  const temperaturas = [];
  const humedad = [];
  const metrica_temperaturas = [];
  const metrica_humedad = [];
  const luz = [];
  const metrica_luz = [];
  const ruido = [];
  const metrica_ruido = [];
  const obstaculo = [];
  const metrica_obstaculo = [];

  try {
    // Leer el archivo línea por línea
    const chunk = fs.readFileSync(nombreArchivo, 'utf8').split('-END-');
    if (chunk.slice(0, 7) != "-START-") {
      chunk.shift();
    }
    console.log(chunk[0]);
    chunk.forEach(chunk => {
      const lineas = chunk.trim().split('\n');
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
        else if (clave === 'Humididy') {
          metrica_humedad.push(tiempo);
          humedad.push(valor);
        }
        else if (clave === 'Light_Intensity') {
          metrica_luz.push(tiempo);
          luz.push(valor);
        }
        else if (clave === 'Sound') {
          metrica_ruido.push(tiempo);
          ruido.push(valor);
        }
        else if (clave === 'Obstacle') {
          metrica_obstaculo.push(tiempo);
          obstaculo.push(valor);
        }
      })
    }
    );

    return { temperaturas, humedad, luz, ruido, obstaculo, metrica_temperaturas, metrica_humedad, metrica_luz, metrica_ruido, metrica_obstaculo };
  } catch (error) {
    console.error('Error al leer el archivo:', error.message);
    return { temperaturas: [], presiones: [] };
  }
}
const express = require('express');
const app = express();

app.use((req, res, next) => {

  console.log("---------Request-Recived--------");
  console.log(Date.now());
  // Nombre del archivo de texto
  const nombreArchivo = 'datos.log';

  // Llamar a la función para leer el archivo
  const { temperaturas, humedad, luz, ruido, obstaculo, metrica_temperaturas, metrica_humedad, metrica_luz, metrica_ruido, metrica_obstaculo } = leerArchivo(nombreArchivo);

  // Imprimir los arrays de temperaturas y presiones
  console.log('Temperaturas:', temperaturas);
  console.log('Metrica_Temperaturas:', metrica_temperaturas);
  console.log('Humedad:', humedad);
  console.log('Metrica_Humedad:', metrica_humedad);
  console.log('Luz:', luz);
  console.log('Metrica_Luz:', metrica_luz);
  console.log('Ruido:', ruido);
  console.log('Metrica_Ruido:', metrica_ruido);
  console.log('Obstaculo:', obstaculo)
  console.log('Metrica_Obstaculo:', metrica_obstaculo);

  res.status(200).json({ "Temperatura": temperaturas, "Metrica_temperaturas": metrica_temperaturas, "Humedad": humedad, "Metrica_humedad": metrica_humedad, "Luz": luz, "Metrica_Luz": metrica_luz, "Ruido": ruido, "Metrica_Ruido": metrica_ruido, "Obstaculo": metrica_obstaculo });
  console.log("---------Response-Send--------");
  console.log(Date.now());
});

module.exports = app;
