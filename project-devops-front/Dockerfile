# Etapa 1: Build de Angular
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine

# Limpiamos cualquier archivo por defecto que traiga Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos apuntando a la subcarpeta browser
COPY --from=build /app/dist/project-devops-front/browser /usr/share/nginx/html

EXPOSE 80