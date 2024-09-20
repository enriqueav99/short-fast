// server.js
const express = require('express');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Configuración del servidor HTTP con Express
app.use(express.static(path.join(__dirname, 'public')));

// Iniciamos el servidor HTTP
const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });

// Iniciamos el servidor WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');

  ws.on('message', (data) => {
    console.log('Recibiendo archivo');
    // Aquí puedes manejar la recepción del archivo.
    // Por ejemplo, podrías guardar el archivo en el servidor
    fs.writeFileSync('archivo_recibido', data);
  });

  ws.on('close', () => {
    console.log('Cliente desconectado');
  });
});
