# Imagen de producción de Build It: API + frontend compilado en un solo servicio.

# 1) Frontend
FROM node:24-slim AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# 2) Backend
FROM node:24-slim AS backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci
COPY backend/tsconfig.json ./
COPY backend/scripts ./scripts
COPY backend/src ./src
RUN npm run build

# 3) Ejecución: solo dependencias de producción y código compilado
FROM node:24-slim
ENV NODE_ENV=production
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force
COPY --from=backend /app/backend/dist ./dist
COPY --from=frontend /app/frontend/dist ./public
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]
