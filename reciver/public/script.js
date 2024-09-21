// Seleccionar elementos del DOM
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const selectFileBtn = document.getElementById('select-file-btn');
const successMessage = document.getElementById('success-message');

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
    console.log('Archivo leído, enviando...', arrayBuffer);

    if (socket.readyState === WebSocket.OPEN) {
      socket.send(arrayBuffer);
      console.log('Archivo enviado');
      mostrarMensajeExito(archivo.name); // Mostrar mensaje de éxito
    } else {
      console.log('El WebSocket no está abierto');
    }
  };
  reader.readAsArrayBuffer(archivo);
}

// Mostrar mensaje de éxito
function mostrarMensajeExito(nombreArchivo) {
  successMessage.style.display = 'block';
  successMessage.textContent = `El archivo "${nombreArchivo}" se ha enviado correctamente.`;
}

// Configurar el evento drag and drop
dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('dragover');

  const archivo = event.dataTransfer.files[0];
  if (archivo) {
    console.log("Archivo arrastrado:", archivo);
    enviarArchivo(archivo);
  }
});

// Configurar el evento para hacer clic y seleccionar archivo
dropZone.addEventListener('click', () => {
  fileInput.click();
});

// Asegurarse de que el botón también abra el selector de archivos
selectFileBtn.addEventListener('click', () => {
  fileInput.click();
});

fileInput.addEventListener('change', (event) => {
  const archivo = event.target.files[0];
  console.log("Archivo seleccionado:", archivo);

  if (archivo) {
    enviarArchivo(archivo);
  }
});
