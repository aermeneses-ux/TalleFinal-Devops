# Etapa 1: Build de Angular
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

# Borramos todo el contenido por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos usando el comodín * para traer SOLO los archivos internos
COPY --from=build /app/dist/project-devops-front/browser/* /usr/share/nginx/html/

EXPOSE 80