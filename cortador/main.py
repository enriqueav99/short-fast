import socket
import os

# Parámetros del servidor
HOST = '0.0.0.0'  # Escuchar en todas las interfaces
PORT = os.environ.get('CORTADOR_PORT')     # Puerto en el que se escuchará
# Crear el socket del servidor
with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    print(f'Servidor escuchando en {HOST}:{PORT}...')

    # Esperar una conexión del cliente
    conn, addr = s.accept()
    with conn:
        print(f'Conexión establecida con {addr}')

        # Abrir un archivo para escribir el contenido que llegará
        with open('video_recibido.mp4', 'wb') as f:
            while True:
                # Recibir datos del cliente en bloques de 1024 bytes
                data = conn.recv(1024)
                if not data:
                    break
                # Escribir los datos recibidos en el archivo
                f.write(data)
        print('Archivo MP4 recibido y guardado como video_recibido.mp4.')
