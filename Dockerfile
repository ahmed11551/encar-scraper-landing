# syntax=docker/dockerfile:1
FROM node:20-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev && npx playwright install --with-deps chromium
COPY src ./src
EXPOSE 3000
CMD ["node","src/server.js"]


