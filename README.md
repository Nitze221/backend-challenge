# 🐚 Seashells API

A REST API for managing a seashell collection. This project is built using **Hono**, **Prisma**, and **Zod**.

## 🚀 Getting Started

### 1. Prerequisites

* Docker & Docker Compose

### 2. Build and run with Docker 

Install + run Alpine Node and PostgreSQL container via docker compose

```bash
docker compose -f docker-compose.yml up --build

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
* **Database:** PostgreSQL
* **API Docs:** Swagger UI & OpenAPI 3.0

---