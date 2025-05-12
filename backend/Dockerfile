# Usa una imagen base más segura y ligera
FROM node:24-slim

# Crea directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Instala las dependencias
RUN npm install

# Expone el puerto que usa el backend
EXPOSE 3000

# Comando por defecto al iniciar el contenedor
CMD ["npm", "run", "start"]
