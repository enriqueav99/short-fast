# Usa una imagen base oficial de Node.js con la versión LTS
FROM node

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de dependencias package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias de Node.js
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto que utiliza la aplicación (3000 en este caso)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
