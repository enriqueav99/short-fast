import socket
from flask import Flask, jsonify
import os

app = Flask(__name__)


@app.route("/")
def read_root():
    return "Hola mundo!"


@app.route("/carpeta")
def list_mp4_files():
    archivos_mp4 = []
    directorio = "doomy"  # Reemplaza "doomy" con la ruta real del directorio
    for archivo in os.listdir(directorio):
        if archivo.endswith('.mp4'):
            archivos_mp4.append(archivo)

    if archivos_mp4:
        response = {
            "message": "Archivos .mp4 encontrados:",
            "archivos": archivos_mp4
        }
    else:
        response = {
            "message": "No se encontraron archivos .mp4 en la carpeta."
        }

    return jsonify(response)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)


# Parámetros del cliente
HOST = 'localhost'
PORT = 8001

# Crear el socket del cliente
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    # Conectarse al servidor
    s.connect((HOST, PORT))
    print(f'Conectado al servidor {HOST}:{PORT}')

    # Abrir el archivo MP4 para leerlo en modo binario
    with open('asdf.mp4', 'rb') as f:
        # Leer el archivo en bloques de 1024 bytes y enviarlos
        while True:
            data = f.read(1024)
            if not data:
                break
            s.sendall(data)

    print('Archivo MP4 enviado correctamente.')
