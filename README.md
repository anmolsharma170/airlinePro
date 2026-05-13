# AirlinePro - Flight Booking Backend System

## 📌 Project Overview
AirlinePro is an enterprise-grade, scalable Node.js backend system representing the core infrastructure of a flight booking platform. It manages cities, airports, airplanes, and flight scheduling operations with strict adherence to separation of concerns and robust error handling.

## 🛠️ Tech Stack
- **Environment**: Node.js
- **Web Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize (Migrations, Models, CLI)
- **Logging**: Winston 
- **Utilities**: `http-status-codes`, `dotenv`

---

## ⭐ Star Features & Architectural Patterns

This project adheres tightly to enterprise software practices:

1. **Strict Modular Layered Architecture**: 
   Ensures strong Separation of Concerns (SoC). Request flow follows `Router -> Middleware -> Controller -> Service -> Repository`.
2. **Generic Base Repository Pattern (`CrudRepository`)**: 
   A DRY approach to database queries. All specific entity repositories (like `AirplaneRepository`) inherit from `CrudRepository` to automatically leverage scalable CRUD operations.
3. **Standardized API Responses**: 
   Using unified templates (`SuccessResponse`, `ErrorResponse`) to ensure clients consume predictable, structured JSON structures across all endpoints.
4. **Centralized Error Handling Architecture**: 
   Services map DB and business logic errors directly into standard HTTP-friendly custom `AppError` payloads gracefully sent to the user instead of unparsed exceptions.
5. **Robust Input Validation (Middlewares)**: 
   Express middlewares securely validate schemas, parameters, and bodies prior to hitting controllers.
6. **Relational Data Mapping with Sequelize ORM**: 
   Full capability to manage models, associations (City-Airport `1..n`), and schema changes through automated DB Migrations and Seeders.
7. **Config-Driven Logger**:
   Custom integration of `Winston` logging setup configured centrally inside the config directory.

---

## 🗄️ Database Entities & Relationships
- **Airplane**: Stores airplane parameters (`modelNumber`, `capacity`).
- **City**: Stores distinct cities (`name`). 
- **Airport**: Stores airport details (`name`, `code`, `cityId`). 
   *Relation Setup: A City has many Airports. An Airport belongs to a City.*
- **Flights**: Stores complex scheduling properties. Represents a flight journey bridging Airplanes, Departure Airports, Arrival Airports, timings, price, gate info, etc.

---

## 💻 Progress & Established API Endpoints 

Complete and ready to consume from the API:

### 🌟 Info / Health
- `GET /api/v1/info` - API Health check.

### ✈️ Airplanes (Full CRUD)
- `POST /api/v1/airplanes` - Create new Airplane
- `GET /api/v1/airplanes` - List all Airplanes
- `GET /api/v1/airplanes/:id` - Get Airplane details
- `PATCH /api/v1/airplanes/:id` - Update Airplane details
- `DELETE /api/v1/airplanes/:id` - Delete Airplane

### 🏙️ Cities
- `POST /api/v1/cities` - Create new City
- `PATCH /api/v1/cities/:id` - Update City details
- `DELETE /api/v1/cities/:id` - Delete City

### 🛫 Airports (Full CRUD)
- `POST /api/v1/airports` - Create new Airport
- `GET /api/v1/airports` - List all Airports
- `GET /api/v1/airports/:id` - Get Airport details
- `PATCH /api/v1/airports/:id` - Update Airport details
- `DELETE /api/v1/airports/:id` - Delete Airport

### 🕒 Flights
- `POST /api/v1/flights` - Create newly sequenced Flight journey

---

## 📂 Project Structure Context
```text
src/
 ├── config/         (Winston Logger, Database credentials, Server ENV setup)
 ├── controllers/    (Maps req/res payloads and utilizes services)
 ├── middlewares/    (Validation logic rules)
 ├── migrations/     (DB state transitions & relationship creations)
 ├── models/         (Sequelize entity & schema definitions)
 ├── repositories/   (DB queries - Includes Base CrudRepository implementation)
 ├── routes/         (Express routers grouped by endpoints v1)
 ├── seeders/        (Database populating scripts)
 ├── services/       (Business logic implementation throwing specific AppErrors)
 └── utils/          (Helpers: AppError, standardized Success/Error structured objects)
```

---

## 🚀 How to Run Locally

1. Install modules:
   ```bash
   npm install
   ```
2. Configure Environment variables in a `.env` file directly at workspace root:
   ```env
   PORT=3000
   ```
3. Update `src/config/config.json` with correct MySQL credentials.
4. Database Initialization, Creation & Migration executions:
   ```bash
   npx sequelize db:create
   npx sequelize db:migrate
   ```
5. Seed Data (Optional):
   ```bash
   npx sequelize db:seed:all
   ```
6. Run System (Development):
   ```bash
   npm run dev
   ```
