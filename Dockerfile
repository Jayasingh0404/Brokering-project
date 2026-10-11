# Root fallback Dockerfile for deployment platforms targeting the root directory
# By default, runs the Backend API service
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

RUN apk add --no-cache python3 make g++

COPY backend/package*.json ./
COPY backend/prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY backend/ ./

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=10000

COPY backend/package*.json ./
COPY backend/prisma ./prisma/
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 10000

CMD ["sh", "-c", "npx prisma db push --skip-generate && npm run start:prod"]
