# syntax=docker/dockerfile:1
# Use Playwright image with browsers and system deps preinstalled
FROM mcr.microsoft.com/playwright:v1.55.0-jammy

ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src

EXPOSE 3000
CMD ["node","src/server.js"]


