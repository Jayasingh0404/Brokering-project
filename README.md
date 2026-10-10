# ♻️ Waste Brokering Marketplace

[![CI](https://github.com/Jayasingh0404/Brokering-project/actions/workflows/ci.yml/badge.svg)](https://github.com/Jayasingh0404/Brokering-project/actions/workflows/ci.yml)
[![CD](https://github.com/Jayasingh0404/Brokering-project/actions/workflows/deploy.yml/badge.svg)](https://github.com/Jayasingh0404/Brokering-project/actions/workflows/deploy.yml)
[![NestJS](https://img.shields.io/badge/Backend-NestJS%2011-ea2849?logo=nestjs)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2016-black?logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%2015-336791?logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Container-Docker%20Compose-2496ED?logo=docker)](https://www.docker.com/)

A modern, full-stack B2B Circular Economy Waste Brokering Platform connecting industrial waste producers, buyers, brokers, and recyclers. Engineered with an enterprise-grade NestJS backend API, PostgreSQL with Prisma ORM, and a responsive Next.js frontend with Tailwind CSS and Radix UI.

---

## 🚀 1-Click Cloud Deployment

Deploy the entire fullstack system (PostgreSQL Database, NestJS API, and Next.js Frontend) in one click:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/Jayasingh0404/Brokering-project)

---

## 🏗️ System Architecture

```
                             ┌───────────────────────────────┐
                             │       Next.js 16 Web App      │
                             │  (Port 3000 / React 19 / UI)  │
                             └──────────────┬────────────────┘
                                            │ HTTP / REST
                                            ▼
                             ┌───────────────────────────────┐
                             │       NestJS 11 REST API      │
                             │   (Port 3001 / Swagger Docs)  │
                             └──────────────┬────────────────┘
                                            │ Prisma ORM
                                            ▼
                             ┌───────────────────────────────┐
                             │       PostgreSQL 15 DB        │
                             │         (Port 5432)           │
                             └───────────────────────────────┘
```

### Core Features
- **Authentication & RBAC:** Role-based access control (`BUYER`, `SELLER`, `ADMIN`) with Argon2 hashing and JWT bearer tokens.
- **Listings Management:** Create, browse, search, and manage waste listings with pricing, quantities, categories, and company profiles.
- **Interactive Dashboard:** Complete portals for buyers, sellers, and administrators.
- **Interactive API Documentation:** Native Swagger OpenAPI documentation available at `/api/docs`.
- **Automated CI/CD:** GitHub Actions workflows for continuous integration, linting, testing, and continuous deployment.

---

## 🛠️ Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16, React 19, Tailwind CSS, Radix UI, TanStack Query, React Hook Form, Zod, Lucide |
| **Backend** | NestJS 11, TypeScript, Passport.js, JWT, Argon2, Class Validator, Swagger |
| **Database & ORM** | PostgreSQL 15, Prisma ORM |
| **DevOps & CI/CD** | GitHub Actions, Docker, Docker Compose, Render Blueprint, Vercel |

---

## ⚙️ Quick Start (Local Development)

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (or a local PostgreSQL instance)

### 1. Clone Repository
```bash
git clone https://github.com/Jayasingh0404/Brokering-project.git
cd Brokering-project
```

### 2. Run Entire Stack with Docker Compose
```bash
docker compose up --build
```
- **Frontend Web App:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:3001/api/v1](http://localhost:3001/api/v1)
- **Swagger Documentation:** [http://localhost:3001/api/docs](http://localhost:3001/api/docs)
- **PostgreSQL:** `localhost:5432`

---

## 💻 Manual Setup

### 1. Database
Run PostgreSQL via Docker:
```bash
docker compose up postgres -d
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

### 3. Frontend Setup
```bash
cd ../frontend
cp .env.example .env.local
npm install
npm run dev
```

---

## 🌐 Cloud Deployment Guide

### Option 1: Render Blueprint (Full Stack)
1. Fork or push to your GitHub repository: `Jayasingh0404/Brokering-project`.
2. Navigate to [dashboard.render.com](https://dashboard.render.com/blueprints).
3. Click **New +** $\rightarrow$ **Blueprint**.
4. Select `Jayasingh0404/Brokering-project`.
5. Render will automatically parse [render.yaml](render.yaml) and provision:
   - `waste-marketplace-db` (Postgres Database)
   - `waste-brokering-api` (NestJS Web Service)
   - `waste-brokering-frontend` (Next.js Web Service)
6. Click **Apply**.

### Option 2: Split Deployment (Vercel + Render/Railway)
- **Backend & Database:** Deploy `backend` to Render or Railway with PostgreSQL.
- **Frontend:** Connect `frontend` folder to [Vercel](https://vercel.com):
  - Framework Preset: `Next.js`
  - Root Directory: `frontend`
  - Environment Variable: `NEXT_PUBLIC_API_URL=https://<your-backend-url>/api/v1`

---

## 🔄 GitHub Actions CI/CD Automation

This repository includes automated workflows under [`.github/workflows/`](.github/workflows):

1. **`ci.yml`**:
   - Runs on every push and pull request to `main`.
   - Executes dependency checks, Prisma generation, linting, tests, and builds for both `backend` and `frontend`.
2. **`deploy.yml`**:
   - Triggers on push to `main`.
   - Verifies manifests, validates container builds, and can trigger cloud deploy webhooks.

### Optional GitHub Repository Secrets
To enable automated deployments via GitHub Actions, add these secrets to your repository under **Settings > Secrets and variables > Actions**:
- `RENDER_BACKEND_DEPLOY_HOOK`: Webhook URL from your Render backend service.
- `RENDER_FRONTEND_DEPLOY_HOOK`: Webhook URL from your Render frontend service.

---

## 📜 License
Private & Proprietary. All rights reserved.
