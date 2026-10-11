# Multi-stage Dockerfile for NestJS Backend
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Install native compilation dependencies for argon2 on Alpine
RUN apk add --no-cache python3 make g++

# Install dependencies
COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# Copy application source code
COPY . .

# Build production bundle
RUN npm run build

# Stage 2: Production runner
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

# Install openssl for Prisma runtime
RUN apk add --no-cache openssl libc6-compat

ENV NODE_ENV=production
ENV PORT=3001

COPY package*.json ./
COPY prisma ./prisma/

# Copy compiled node_modules from builder to avoid re-compiling native modules
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copy built artifacts from builder
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3001

# Run migrations if DATABASE_URL is present, then start app
CMD ["sh", "-c", "if [ -n \"$DATABASE_URL\" ]; then npx prisma db push --skip-generate || true; fi && npm run start:prod"]
