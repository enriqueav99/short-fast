// public/script.js

// Seleccionar elementos del DOM
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');

// Configurar WebSocket
const socket = new WebSocket('ws://localhost:3000');

socket.onopen = () => {
  console.log('Conectado al servidor WebSocket');
};

socket.onclose = () => {
  console.log('Desconectado del servidor WebSocket');
};

// Función para enviar el archivo vía WebSocket
function enviarArchivo(archivo) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const arrayBuffer = event.target.result;
    socket.send(arrayBuffer);
    console.log('Archivo enviado');
  };
  reader.readAsArrayBuffer(archivo);
}

// Configurar el evento drag and drop
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.style.backgroundColor = '#e1e7f0';
});

dropZone.addEventListener('dragleave', () => {
  dropZone.style.backgroundColor = '#fff';
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.style.backgroundColor = '#fff';

  const archivo = event.dataTransfer.files[0];
  if (archivo) {
    enviarArchivo(archivo);
  }
});

// Configurar el evento para hacer clic y seleccionar archivo
dropZone.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const archivo = event.target.files[0];
  if (archivo) {
    enviarArchivo(archivo);
  }
});
