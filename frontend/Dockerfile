# Multi-stage Dockerfile for Next.js Frontend
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Pass build arg for public API URL
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

COPY package*.json ./
RUN npm ci

COPY . .

# Build Next.js
RUN npm run build

# Stage 2: Production runner
FROM node:20-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.ts ./next.config.ts

EXPOSE 3000

CMD ["npm", "run", "start"]
