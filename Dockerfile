# Usa una imagen base ligera de Node
FROM node:20-alpine

# Crea una carpeta dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código del proyecto
COPY . .

# Expone el puerto que usa tu servidor
EXPOSE 8080

# Comando para ejecutar la app
CMD ["npm", "start"]
