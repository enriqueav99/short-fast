# Usar una imagen base de Python
FROM python:3.11-slim

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar el script al contenedor
COPY main.py .

# Exponer el puerto que usará el servidor
EXPOSE 8001

# Comando para ejecutar el servidor
CMD ["python", "main.py"]
