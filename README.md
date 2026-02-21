# SecureNest - Scalable Task Management API & UI

A mini production-ready full-stack application with Node.js, Express, TypeScript, Prisma, and React.

## 🚀 Key Features

- **Secure Authentication**: JWT-based auth with password hashing (bcrypt).
- **Role-Based Access Control (RBAC)**: Different permissions for USER and ADMIN.
- **Scalable Architecture**: Layered architecture (Controller -> Service -> Repository).
- **Security Hardening**: Helmet, CORS, and Express Rate Limiter.
- **Robust Validation**: Strong input validation using Zod.
- **API Documentation**: Integrated Swagger documentation.
- **Modern UI**: Dark-themed, glassmorphic React dashboard with micro-animations.

## 🛠️ Tech Stack

### Backend
- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **TypeScript**: Type safety and better developer experience.
- **Prisma (v7)**: Modern ORM with centralized configuration.
- **PostgreSQL**: Relational database.
- **Zod**: Schema-based validation.
- **Winston**: Production-grade logging.

### Frontend
- **React (Vite)**: Component-based UI.
- **Axios**: API communication with interceptors.
- **Lucide React**: Premium icon set.
- **Vanilla CSS**: Premium dark mode aesthetics with glassmorphism.

## 📁 Project Structure

```text
SecureNest Project/
├── server/
│   ├── src/
│   │   ├── config/       # Database & Config
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── repositories/ # Database abstraction
│   │   ├── middlewares/  # Auth, Error, Validation
│   │   ├── routes/       # API endpoints (v1)
│   │   ├── validations/  # Zod schemas
│   │   ├── utils/        # Loggers, Error classes
│   │   ├── docs/         # Swagger definitions
│   │   ├── app.ts        # Express setup
│   │   └── server.ts     # Entry point
│   ├── prisma/
│   │   └── schema.prisma # DB Models
│   ├── prisma.config.ts  # Prisma 7 configuration
│   └── Dockerfile
└── client/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── context/
    │   └── App.tsx
```

## ⚙️ Scalability Thinking

### 1. Vertical Scaling
- The backend is stateless (JWT), allowing it to handle more vertical resources effectively.
- Prisma Query engine handles connection pooling efficiently.

### 2. Horizontal Scaling
- Since authentication is **stateless**, multiple instances of the backend can run behind a **Load Balancer** (like Nginx or AWS ALB).
- Session storage is not required, making the system easy to replicate.

### 3. Caching
- Future versions can integrate **Redis** for frequently accessed tasks or to blacklist revoked JWT tokens.

### 4. Microservices Ready
- The layered architecture allows the `auth` and `task` modules to be easily split into separate services if the system grows.

## 🏃 How to Run

### Backend
1. `cd server`
2. `npm install`
3. Configure `.env` with your `DATABASE_URL`.
4. `npx prisma generate`
5. `npm run dev`

### Frontend
1. `cd client`
2. `npm install`
3. `npm run dev`

## 📚 API Documentation
Once the server is running, visit: `http://localhost:5000/api-docs`
