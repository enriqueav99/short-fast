#la versión de Pillow tiene que ser anterior a la 10.0.0


# import socket
# # Parámetros del servidor
# HOST = 'localhost'  # Dirección IP del servidor
# PORT = 8001        # Puerto en el que se escuchará

# # Crear el socket del servidor
# with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
#     s.bind((HOST, PORT))
#     s.listen()
#     print(f'Servidor escuchando en {HOST}:{PORT}...')
#     # Esperar una conexión del cliente
#     conn, addr = s.accept()
#     with conn:
#         print(f'Conexión establecida con {addr}')
#         # Abrir un archivo para escribir el contenido que llegará
#         with open('video_recibido.mp4', 'wb') as f:
#             while True:
#                 # Recibir datos del cliente en bloques de 1024 bytes
#                 data = conn.recv(1024)
#                 if not data:
#                     break
#                 # Escribir los datos recibidos en el archivo
#                 f.write(data)
#         print('Archivo MP4 recibido y guardado como video_recibido.mp4.')

from moviepy.editor import *
#Para después aligerar los imports:
#from moviepy.video.fx.all import crop

#Crea un clip con el video que reciba de la parte anterior del proceso
clipImportante = VideoFileClip("MielPops.mp4")


#Crea un clip de la rampa muteado y del tamaño del video que nos pasen
try:
    clipRampa = (VideoFileClip("Rampitas.mp4")
             .without_audio()
             .resize((clipImportante.w, clipImportante.h)))
except IOError:
    print('Error: Faltan unas rampitas por aquí\n')
    exit()

#Ponemos un clip encima del otro
clipMezclado = clips_array([[clipImportante],[clipRampa]])

#Cortamos el clip final para que quede en 9/16
clipMezclado = clipMezclado.crop(x_center=clipMezclado.size[0]/2, y_center=clipMezclado.h/2, width=clipMezclado.size[1]/16*9, height=clipMezclado.h)

#Creamos el vídeo
clipMezclado.write_videofile("clip_final.mp4", codec="libx264")
