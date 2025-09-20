# Node.js Project Structure Guide

This guide outlines recommended project structures for Node.js/Express applications based on complexity and scalability.

## 🔹 1. Basic Structure (Good for Small Apps / Beginners)`

```
my-express-app/
  │── node_modules/
  │── server.js # Entry point (Express app + routes)
  │── package.json
  │── .env # Env variables (PORT, DB_URL, etc.)
```

- Everything in **one file (`server.js`)**: routes, middleware, and logic.
- **Good for:** tiny apps, practice, learning basics.
- **Example:** a “Hello World” server or a simple API with a few routes.

## 🔹 2. Intermediate Structure (Modular, Maintainable)

```
my-express-app/
  │── node_modules/
  │── src/
  │ │── routes/                        # Route definitions
  │ │── controllers/                   # Business logic
  │ │── models/                        # Database models (MongoDB, Sequelize, etc.)
  │ │── middlewares/                   # Authentication, logging, error handling
  │ │── config/                        # DB connection, environment setup
  │ │── app.js                         # Express app setup
  │── server.js                        # Server start file
  │── package.json
  │── .env
  │── .gitignore
```

- **Separation of concerns:** routes call controllers, controllers talk to models.
- **Good for:** APIs with multiple resources (users, products, orders, etc.).
- Easier to maintain than the basic structure.

## 🔹 3. Advanced Structure (Scalable, Enterprise-Ready)

```
my-express-app/
├─ node_modules/
├─ src/
│ ├─ routes/              # Route definitions
│ ├─ controllers/         # Business logic
│ ├─ services/            # Service layer
│ ├─ models/              # Database models
│ ├─ middlewares/         # Auth, logging, validation, error handling
│ ├─ validations/         # Request validation schemas
│ ├─ utils/               # Utility/helper functions
│ ├─ config/              # Config files (db.js, env.js, constants)
│ ├─ jobs/                # Scheduled jobs / cron tasks
│ └─ app.js               # Express app setup
├─ tests/                 # Unit & integration tests
├─ public/                # Static files
├─ views/                 # Templates (EJS, Pug, Handlebars)
├─ server.js              # Server entry point
├─ package.json
├─ .env
├─ .gitignore
└─ README.md
```

---

### Key Directories & Files

- `src/routes/` → Define all API routes
- `src/controllers/` → Handle business logic
- `src/services/` → Service layer (emails, payments, external APIs)
- `src/models/` → Database models
- `src/middlewares/` → Auth, logging, validation, error handling
- `src/validations/` → Joi / Yup schemas for request validation
- `src/utils/` → Helper functions
- `tests/` → Unit & integration tests
- `public/` → Static files (CSS, JS, images)
- `views/` → Templates (EJS, Pug, Handlebars)

- **Three-layer separation:** Routes → Controllers → Services → Models.
- Includes validations, tests, background jobs, and utilities.
- **Good for:** large applications, enterprise APIs, microservices.
- Easier to scale, test, and maintain with a team.

## ✅ Summary

| Level        | Best for              | Features                                                |
| ------------ | --------------------- | ------------------------------------------------------- |
| Basic        | Beginners, tiny apps  | Everything in one file, simple API                      |
| Intermediate | Medium apps           | Modular, separation of concerns                         |
| Advanced     | Large/enterprise apps | Full separation, validations, services, tests, scalable |

---

— This structure guide **start simple and scale up** as your application grows.

---

<br/>

# HTTP status codes — categories & common ones with meaning

Think of status codes as short signals the server sends about the outcome.

1xx — informational (rarely used directly in APIs)

2xx — success

200 OK — request succeeded; response body contains result.

201 Created — resource created. Best practice: include Location header pointing to new resource URI and return created entity.

202 Accepted — request accepted for processing but not completed (useful for async jobs).

204 No Content — success, but no response body (common after DELETE or PUT where no body needed).

3xx — redirection (rare in APIs)

4xx — client errors

400 Bad Request — malformed request or validation error.

401 Unauthorized — authentication required or failed.

403 Forbidden — authenticated but not allowed to perform action.

404 Not Found — resource doesn’t exist.

409 Conflict — resource conflict (e.g., duplicate unique field).

422 Unprocessable Entity — semantic validation failed (useful for APIs that want a clear validation vs syntax error).

429 Too Many Requests — rate limiting.

5xx — server errors

500 Internal Server Error — generic server error.

502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout — infra issues (upstreams, maintenance, timeouts).

---
