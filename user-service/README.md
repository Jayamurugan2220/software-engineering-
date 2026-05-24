# User Service

Port: `3001`

Endpoints:
- `POST /api/auth/register` - register
- `POST /api/auth/login` - login
- `GET /api/users` - get users (JWT required)

Run:
```
cd "d:/softer engineering/user-service"
npm install
npm run dev
```

Sample register request:
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "password123"
}
```

Sample login response:
```json
{ "token": "<jwt>" }
```

Swagger: `http://localhost:3001/api-docs`
