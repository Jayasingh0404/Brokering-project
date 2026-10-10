# Multi-stage Dockerfile for NestJS Backend
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install build dependencies
COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci || npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy application source code
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Production runner
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3001

COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm ci --only=production || npm install --only=production

# Generate Prisma Client for production runtime
RUN npx prisma generate

# Copy built artifacts from builder
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3001

# Run migrations and start app
CMD ["sh", "-c", "npx prisma db push --skip-generate && node dist/main.js"]
