# Node.js Express Boilerplate / Template Details

This repository is a foundational Node.js boilerplate configured to kickstart a standardized, scalable, and professional backend application. It enforces a strict directory structure, separation of concerns (layered architecture), and built-in modern backend utilities.

## 📁 Directory Structure & Layered Architecture

The project follows a modular, layered architecture pattern which ensures that components only communicate with their adjacent layers.

```text
src/
├── config/       # Environment variables, database connection strings, logger setups.
├── controllers/  # Receives incoming HTTP requests, extracts parameters, and passes to the service layer.
├── middlewares/  # Express middlewares (e.g., authentication, error handling, validation).
├── repositories/ # Direct interactions with the database (CRUD operations, queries).
├── routes/       # API route definitions and endpoint mapping to controllers.
├── services/     # Business logic. Connects to the repository layer to fetch/save data.
└── utils/        # Helper functions, error classes, constants, and shared utilities.
```

### Key Components Built So Far

1. **Express Server Setup (`src/index.js`)**
   - Initializes an Express application.
   - Routes all API requests using a central `/api` router (`apiRoutes`).
   - Starts the server on a port dynamically configured via environment variables.

2. **Configuration Management (`src/config/server-config.js`)**
   - Utillizes the `dotenv` package.
   - Extracts configurations (like `PORT`) from the `.env` file safely, keeping sensitive variables out of the codebase.

3. **Custom Logging (`src/config/logger-config.js`)**
   - Uses `winston`, a versatile and robust logging library.
   - Configured with a custom print format to display timestamps, labels, log levels (e.g., `info`, `error`), and messages clearly.
   - Dispatches logs both to the `Console` and external files (e.g., `combined.log`), preserving the history of server activities and errors.

4. **Routing Structure (`src/routes/`)**
   - Provides an organized mechanism (`v1`, `v2`) for API versioning ensuring we don't break older consumers of the API when making breaking changes.

## 📦 Core Dependencies
- **`express`**: Fast, minimal web framework for Node.js.
- **`dotenv`**: For loading environment variables from a `.env` file into `process.env`.
- **`winston`**: Advanced, customizable logging for diagnostics and auditing.
- **`http-status-codes`**: Enums for HTTP status codes to prevent hard-coding "magic numbers" (like 404, 500).
- **`nodemon`**: Development utility that automatically restarts the node application when file changes in the directory are detected.

---

## 🎤 Interview Questions Based on this Template

If you are using this template or explaining it in a system design/backend interview, these are the questions you might face:

### 1. Architecture & Design Patterns
**Q: Why did you choose this specific folder structure (Controllers, Services, Repositories)?**
*Answer:* This implements the "Separation of Concerns" (SoC) principle through a layered architecture. It ensures that Business Logic (Services) is independent of the HTTP transport layer (Controllers) and Database operations (Repositories). This makes the code highly modular, easily testable (you can mock the repo while testing the service), and highly maintainable.

**Q: Explain the flow of a single HTTP request in this architecture.**
*Answer:* Route (URL matched) -> Middleware (validation/auth) -> Controller (extracts req query/body) -> Service (executes business logic) -> Repository (interacts with the DB) -> back to Service -> back to Controller (sends HTTP response).

**Q: Why do you have a `v1` folder inside your routes?**
*Answer:* It's for API Versioning. If our application's data models or logic change drastically in the future, we can introduce a `v2` without breaking existing mobile apps or third-party integrations that still rely on `v1`.

### 2. Environment Configurations
**Q: What is the purpose of `dotenv` and why shouldn't we push the `.env` file to GitHub?**
*Answer:* `dotenv` loads variables into `process.env`. We shouldn't commit `.env` files because they store sensitive information like database passwords, API keys, and JWT secrets. Exposing these on GitHub compromises system security.

**Q: How does `server-config.js` help your project scale?**
*Answer:* It provides a single source of truth for all configurations. Instead of calling `process.env.PORT` randomly across 20 files, we import it from `server-config`. If we switch from `process.env` to a cloud secret manager like AWS Secrets Manager, we only update `server-config.js`, not the entire codebase.

### 3. Logging & Monitoring
**Q: Why use `winston` instead of `console.log()`?**
*Answer:* `console.log()` is blocking (synchronous) in some edge cases but mainly, it doesn't provide severity tracking (info vs warn vs error), log formatting, or persistence. `winston` allows you to write logs into files, streams, or external observability services (like Datadog/Splunk), and formats logs with precise timestamps which helps with debugging production issues.

**Q: What are "Transports" in the context of your Winston logger?**
*Answer:* Transports dictate *where* the logs should go. In my setup, I have a `Console` transport for local development visibility, and a `File` transport (e.g., `combined.log`) to persist logs over time.

### 4. General Node.js
**Q: Why do you have `nodemon` as a dependency? Should it be a regular dependency or a devDependency?**
*Answer:* `nodemon` restarts the server automatically upon file changes, saving time locally. It should ideally be a `devDependency` (using `npm i -D nodemon`) because it isn't required in a production environment where the server process is usually managed by PM2, Docker, or Kubernetes.

**Q: How does Node.js handle concurrency if it's single-threaded?**
*Answer:* Node.js uses an Event Loop and non-blocking I/O. Tasks like fetching from a database or reading a file are offloaded to system kernel/worker threads (libuv). While those execute, Node handles other incoming requests. Once I/O tasks finish, their callbacks are pushed to the Event Queue to be executed by the main thread.

---

## ?? Project Essence: AirlinePro
This project is an Airline Management System backend (AirlinePro). The goal is to build a scalable and robust API for managing airplanes, flight reservations, and scheduling using Node.js, Express.js, and Sequelize ORM while strictly adhering to an enterprise-grade layered architecture.

## ?? File Tracking & Their Purpose

Here is a detailed breakdown of what specific files do in this project and why we created them:

### 1. Configuration & Logging (`src/config/`)
- **`logger-config.js`**: Integrates `winston` to generate standardized, timestamped logs. Logs are outputted to the console and saved to `combined.log`. This helps us debug issues historically instead of relying entirely on temporary console logs.
- **`server-config.js`**: A centralized configuration file to securely extract and manage variables from the `.env` file (like `PORT`).
- **`config.json`**: Generated by Sequelize, it stores the database connection credentials for different environments (`development`, `test`, `production`).

### 2. Database Operations: Sequelize, Models & Migrations
Sequelize is our ORM (Object Relational Mapper) used to interact with the SQL database without writing raw SQL queries.

**Key Commands Executed:**
- `npx sequelize init`: Bootstrapped the structure by creating `config/`, `models/`, `migrations/`, and `seeders/` folders.
- `npx sequelize model:generate --name Airplane --attributes modelNumber:string,capacity:integer`: Automatically generated the `Airplane` JS model and the corresponding database migration file.
- `npx sequelize db:migrate`: Executes the migration files, converting our JS instructions into actual SQL tables (e.g., creating the `Airplanes` table in the database).

**What is the difference between Models and Migrations?**
- **Models (`src/models/airplane.js`, `index.js`)**: These hold the JavaScript-level representation of our tables. They define associations, validations, and are used by the application code to manipulate data.
- **Migrations (`src/migrations/20260413105652-create-airplane.js`):** These hold the database-level changes. They act as version control for our database schema, detailing exactly how tables are created (`CREATE TABLE`) or altered. 

### 3. Architecture Layers in Use
- **Repositories (`src/repositories/crud-repository.js`)**: We implemented the Repository Pattern. All raw database interactions (like `create`, `destroy`, `findAll`) are placed here. This abstracts Sequelize code away from our main business logic, making it easier to replace the ORM later if needed.
- **Controllers (`src/controllers/info-controller.js`)**: Receives the incoming HTTP request, passes data to services/repositories, and sends formatted HTTP responses back to the client.
- **Routes (`src/routes/v1/`)**: Connects endpoints (URLs) directly to specific Controller functions. It defines the structure of our API (e.g., `/api/v1/info`).
