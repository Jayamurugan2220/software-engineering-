# Sprint Service

Port: `3002`

Endpoints:
- `POST /api/sprints` - create sprint
- `GET /api/sprints` - list sprints
- `PUT /api/sprints/:id` - update sprint
- `DELETE /api/sprints/:id` - delete sprint

Run:
```
cd "d:/softer engineering/sprint-service"
npm install
npm run dev
```

Sample create request:
```json
{
  "name": "Sprint 1",
  "goal": "Deliver login",
  "startDate": "2026-05-01",
  "endDate": "2026-05-14"
}
```

Swagger: `http://localhost:3002/api-docs`
