const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const httpPort = 3000; // Puerto para el servidor HTTP
const wsTargetPort = 8001; // Puerto del servidor WebSocket al que se enviarán los archivos

// Configuración del servidor HTTP con Express
app.use(express.static(path.join(__dirname, 'public')));

// Iniciamos el servidor HTTP
const server = app.listen(httpPort, '0.0.0.0', () => {
  console.log(`Servidor HTTP corriendo en http://localhost:${httpPort}`);
});

// Iniciamos el servidor WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (data) => {
    console.log('Recibiendo archivo');

    // Conectar al WebSocket del servidor en localhost:8001
    const wsClient = new WebSocket(`ws://cort:${wsTargetPort}`);

    wsClient.on('open', () => {
      console.log('Conectado al servidor WebSocket en localhost:8001');
      wsClient.send(data); // Enviar el archivo al servidor WebSocket
      console.log('Archivo enviado a localhost:8001');
      wsClient.close(); // Cerrar la conexión después de enviar
    });

    wsClient.on('error', (error) => {
      console.error('Error en el WebSocket:', error);
    });
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});
