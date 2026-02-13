# 🐚 Seashells API

A REST API for managing a seashell collection. This project is built using **Hono**, **Prisma**, and **Zod**.

## 🚀 Getting Started

### 1. Prerequisites

* **Node.js**: `>=18.0.0` (Recommended: v20 or v22 LTS)
* **npm**: Included with Node.js

### 2. Quick Setup

For convenience, a setup script is provided to handle environment configuration, dependency installation, and database initialization:

```bash
npm run setup

```

### 3. Manual Installation

If you prefer to run steps individually:

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env

# 3. Initialize database & generate types
npx prisma migrate dev --name init

# 4. Seed sample data
npx prisma db seed

```

### 5. Running the App

Development Mode

Uses tsx watch to automatically reload the server on every file change:

```bash
npm run dev

```
Production Build

Compile the TypeScript to JavaScript and run via the native Node.js engine:
```bash

# 1. Compile TypeScript to /dist
npm run build

# 2. Run the compiled JavaScript
npm run start
```


The server will start on [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

---

## API Documentation

The API is self-documenting via OpenAPI 3.0:

* **Interactive Swagger UI:** [http://localhost:3000/](https://www.google.com/search?q=http://localhost:3000/) — Explore and test endpoints directly in the browser.
* **Raw OpenAPI JSON:** [http://localhost:3000/doc](https://www.google.com/search?q=http://localhost:3000/doc)

---

## Architecture

This project follows a **Layered Architecture** to ensure high maintainability and clear separation of concerns:

* **Presentation Layer (`routes.ts` & `app.ts`)**: Defines the API contract, request/response shapes, and OpenAPI metadata.
* **Controller Layer (`shellController.ts`)**: Orchestrates data flow. Uses `RouteHandler` for strict type safety between the contract and implementation.
* **Service Layer (`shellService.ts`)**: Contains business logic and database interactions via Prisma.
* **Data Layer (`seashell.schema.ts` & `schema.prisma`)**: Acts as the single source of truth for Zod validation schemas and database models.

---

## Key Features

* **Contract-First Development**: OpenAPI documentation is generated automatically from Zod schemas, ensuring the documentation and code never drift apart.
* **End-to-End Type Safety**: Utilizes `zod-openapi` and `RouteHandler` to provide type safety from the HTTP request down to the database query.
* **Standardized Error Handling**: A global `defaultHook` intercepts validation failures and returns a consistent, nested JSON error format.
* **Local Testing Workflow**: Includes a `test.http` file for the VS Code [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension.

---

## Tech Stack

* **Framework:** [Hono](https://hono.dev/)
* **Validation:** [Zod](https://zod.dev/)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Database:** SQLite
* **API Docs:** Swagger UI & OpenAPI 3.0

---