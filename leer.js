

const fs = require('fs');

const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 })
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))


// Nombre del archivo donde se guardarán los datos
const nombreArchivo = 'datos.log';

// Abre el archivo en modo de escritura, si no existe, lo crea
const archivoStream = fs.createWriteStream(nombreArchivo, { flags: 'a' });

// Manejador de evento para los datos del puerto serie
parser.on('data', data => {
    console.log(data + ': ' + Date.now()); // Imprime los datos recibidos en la consola
    archivoStream.write(data + ': '+ Date.now() + '\n'); // Escribe los datos en el archivo
});

// Manejador de evento para errores en el puerto serie
port.on('error', err => {
    console.error('Error en el puerto serie:', err.message);
});

// Manejador de evento para el cierre del puerto serie
port.on('close', () => {
    console.log('Puerto serie cerrado');
});

// Manejador de evento para el cierre del archivo
archivoStream.on('close', () => {
    console.log('Archivo cerrado');
});

// Manejador de evento para el error en el archivo
archivoStream.on('error', err => {
    console.error('Error en el archivo:', err.message);
});

// Manejador de evento para el cierre de la aplicación
process.on('SIGINT', () => {
    console.log('Cerrando la aplicación...');
    // Cierra el puerto serie
    port.close(err => {
        if (err) {
            console.error('Error al cerrar el puerto serie:', err.message);
        }
        // Cierra el archivo
        archivoStream.end(() => {
            console.log('Archivo cerrado');
            process.exit();
        });
    });
});

