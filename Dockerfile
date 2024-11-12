# Usa la imagen base de Node.js
FROM node:20.18.0

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json e instala dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Compila la aplicación React para producción
RUN npm run build

# Usa un servidor estático para servir la aplicación (opcional, puedes usar Nginx o similar)
RUN npm install -g serve

# Expone el puerto en el que correrá la aplicación
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["serve", "-s", "dist", "-l", "5173"]
