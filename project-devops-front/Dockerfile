# Etapa 1: Build de Angular
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Etapa 2: Servir con Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist/project-devops-front /usr/share/nginx/html
EXPOSE 80
