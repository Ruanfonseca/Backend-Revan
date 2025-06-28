# Dockerfile

FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Copia o arquivo .env
COPY .env .env

EXPOSE 3000
CMD ["node", "app.js"]
