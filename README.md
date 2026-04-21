# AirlinePro - Flight Booking Backend System

An enterprise-grade, scalable Node.js backend system for managing flight reservations, airplanes, and scheduling. Built utilizing Express.js and the Sequelize ORM, this API heavily enforces layered architecture to maintain clear separation of concerns.

## ?? Tech Stack

- **Framework**: Node.js with Express.js
- **Database Architecture**: MySQL
- **ORM**: Sequelize (Migrations, Seeders, Models)
- **Logging**: Winston 
- **Utilities**: `http-status-codes`

## ?? Project Architecture

This system relies on a strict **Modular Layered Architecture**:
- **Controllers (`/src/controllers`)**: Handle incoming HTTP requests, format response structures, and delegate business logic to services.
- **Services (`/src/services`)**: Contain the core business logic of the application. Act as an intermediary bridging controllers and repositories.
- **Repositories (`/src/repositories`)**: Responsible for direct database communication using the Repository Pattern (e.g., standardizing CRUD operations via a base `CrudRepository`).
- **Middlewares (`/src/middlewares`)**: Express middleware for intercepting requests, performing validation, and handling errors.
- **Routes (`/src/routes`)**: API route definitions cleanly mapped by API versions (e.g., `v1`).

## ?? API Endpoints

### Info API
| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/info` | Health check route to verify server status |

### Airplane APIs
| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/v1/airplanes` | Create a new Airplane |
| `GET` | `/api/v1/airplanes` | Retrieve all Airplanes |
| `GET` | `/api/v1/airplanes/:id` | Retrieve an Airplane by ID |
| `PATCH` | `/api/v1/airplanes/:id` | Update an existing Airplane |
| `DELETE` | `/api/v1/airplanes/:id` | Delete an Airplane by ID |

### City APIs
| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/v1/cities` | Create a new City |
| `PATCH` | `/api/v1/cities/:id` | Update a City |
| `DELETE` | `/api/v1/cities/:id` | Delete a City |

## ?? Setup & Installation

1. Clone the repository and navigate into the folder:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   ```
3. Configure your database credentials in `src/config/config.json`.
4. Run Sequelize migrations to build the tables:
   ```bash
   npx sequelize db:migrate
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
