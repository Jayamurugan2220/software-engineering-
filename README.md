# Scrum Agile DevOps Platform - Microservices

Three independent services:
- User Service (port 3001) — register, login, get users (JWT)
- Sprint Service (port 3002) — create/get/update/delete sprints
- Task Service (port 3003) — create/get/update status/delete tasks

Setup (requires Node.js and MongoDB):

1. Start MongoDB (local) so services can connect (default URIs used).
2. For each service folder run:

```
cd "d:/softer engineering/<service-folder>"
npm install
npm run dev
```

Service folders: `user-service`, `sprint-service`, `task-service`.

Environment variables (optional):
- `MONGO_URI` override MongoDB connection string
- `JWT_SECRET` for User Service token signing
- `PORT` to change default ports

API docs (Swagger):
- User: http://localhost:3001/api-docs
- Sprint: http://localhost:3002/api-docs
- Task: http://localhost:3003/api-docs

Postman quick test:

- Register user:
  POST http://localhost:3001/api/auth/register
  Body JSON: { "name":"Alice","email":"a@a.com","password":"pass" }
- Login:
  POST http://localhost:3001/api/auth/login
  Body JSON: { "email":"a@a.com","password":"pass" }
  Copy `token` from response
- Call protected endpoint:
  GET http://localhost:3001/api/users
  Header: `Authorization: Bearer <token>`

Use Sprint and Task APIs similarly via Swagger or Postman.
