# Task Service

Port: `3003`

Endpoints:
- `POST /api/tasks` - create task
- `GET /api/tasks` - list tasks
- `PATCH /api/tasks/:id/status` - update task status
- `DELETE /api/tasks/:id` - delete task

Run:
```
cd "d:/softer engineering/task-service"
npm install
npm run dev
```

Sample create request:
```json
{
  "title": "Implement auth",
  "description": "Add JWT login",
  "assignee": "<userId>",
  "sprintId": "<sprintId>"
}
```

Swagger: `http://localhost:3003/api-docs`
