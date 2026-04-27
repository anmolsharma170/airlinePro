# AirlinePro - Flight Booking Backend System | LLM Context Document

> **System Prompt / Context Info:** This document is designed to provide complete context about the AirlinePro backend project to AI assistants (like ChatGPT, Claude, etc.). It outlines the folder structure, architectural principles, database schema, established patterns, and the current project state so the AI can effectively conclude or extend the project.

## 📌 Project Overview
AirlinePro is an enterprise-grade, scalable Node.js backend system representing the core infrastructure of a flight booking platform. It manages cities, airports, airplanes, and flight scheduling. 

## 🛠️ Tech Stack
- **Environment**: Node.js
- **Web Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize (using mostly migrations and models)
- **Logging**: Winston
- **Utilities**: `http-status-codes`, `dotenv`

---

## 🏗️ Architectural Patterns (CRITICAL INSTRUCTIONS FOR AI)
If you are generating new code for this project, you **must** strictly adhere to this Modular Layered Architecture:

1. **Routes (`src/routes/`)**:
   - Maps URLs to controllers and applies Middlewares. Organized by API version (e.g., `v1`).
2. **Middlewares (`src/middlewares/`)**:
   - Intercepts requests for validation (schema checks) before hitting controllers.
3. **Controllers (`src/controllers/`)**:
   - Handles `req` and `res`. Extracts body/params, calls the appropriate Service, formatting the final API response using standardized utility classes (`SuccessResponse`, `ErrorResponse`).
4. **Services (`src/services/`)**:
   - Contains all **Business Logic**. It should only receive formatted data from controllers, apply rules, and call Repositories. Throw custom `AppError` instances if business rules fail.
5. **Repositories (`src/repositories/`)**:
   - Interacts directly with Models/Database. 
   - **MUST USE** the base `CrudRepository` (`src/repositories/crud-repository.js`) where possible, extending it for specific complex queries.
6. **Models (`src/models/`) & Migrations (`src/migrations/`)**:
   - Sequelize handles DB definitions. Always generate new entities using Sequelize CLI.

---

## 🗄️ Database Entities & Relationships
Based on the current migrations, here is the state of the entities:
- **Airplane**: Stores airplane details (`modelNumber`, `capacity`).
- **City**: Stores city data (`name`).
- **Airport**: Stores airport details (`name`, `code`, `cityId`). *Relation: A City has many Airports. An Airport belongs to a City.*
- **Flights**: Stores complex scheduling. Links Airplane, Departure Airport, Arrival Airport, Timings, Price, Boarding Gate, etc.

---

## 📂 Project Structure Context
```text
src/
 ├── config/         (Winston Logger, Database config, Server ENV)
 ├── controllers/    (AirplaneController, CityController, InfoController)
 ├── middlewares/    (Validation logic per entity)
 ├── migrations/     (DB state transitions)
 ├── models/         (Sequelize entity definitions)
 ├── repositories/   (DB queries - Airplane, City, plus Base CrudRepository)
 ├── routes/         (Express routers grouped by v1)
 ├── seeders/        (Initial DB population)
 ├── services/       (Business logic - AirplaneService, CityService)
 └── utils/          (Helpers: AppError, Standardized JSON structures for Success/Error)
```

---

## 🔌 Current API Endpoints

### Info & Health
- `GET /api/v1/info` - Health check

### Airplanes
- `POST /api/v1/airplanes` - Create Airplane
- `GET /api/v1/airplanes` - List Airplanes
- `GET /api/v1/airplanes/:id` - Get Airplane
- `PATCH /api/v1/airplanes/:id` - Update Airplane
- `DELETE /api/v1/airplanes/:id` - Delete Airplane

### Cities
- `POST /api/v1/cities` - Create City
- `PATCH /api/v1/cities/:id` - Update City
- `DELETE /api/v1/cities/:id` - Delete City

*(Note: Airports and Flights endpoints might be pending or in progress depending on codebase state).*

---

## 🚀 How to Run Locally

1. `npm install`
2. Define a `.env` file (`PORT=3000`).
3. Update `src/config/config.json` with MySQL credentials.
4. Run standard DB init: `npx sequelize db:create`
5. Apply migrations: `npx sequelize db:migrate`
6. Run system: `npm run dev`

---

## 🤖 Instructions for AI Assistant (To conclude the project)
When I ask you to build the next feature or conclude the project, please:
1. Identify which entity we are working on (e.g., Airports, Flights, Bookings).
2. Write the Model/Migration setup if it doesn't exist.
3. Write the Repository extending `CrudRepository`.
4. Write the Service encapsulating business errors.
5. Write the Controller and standard format responses (`SuccessResponse`/`ErrorResponse`).
6. Write the Route and inject any `validateCreateRequest` middleware.
7. Only output the needed code blocks for these steps, maintaining the EXACT same architectural pattern shown above.
