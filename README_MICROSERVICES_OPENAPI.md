# Microservices architecture & API-first design with OpenAPI

This repository is a small Scrum/Agile DevOps platform implemented as three independent Node.js microservices with API-first design using OpenAPI (Swagger):

- **User Service** — authentication, user management (default port: 3001)
  - Swagger: `user-service/swagger.json` and UI at `/api-docs`
- **Sprint Service** — sprint CRUD (default port: 3002)
  - Swagger: `sprint-service/swagger.json` and UI at `/api-docs`
- **Task Service** — task CRUD and status management (default port: 3003)
  - Swagger: `task-service/swagger.json` and UI at `/api-docs`

Repository layout
- `user-service/` — Express app, models, routes, `swagger.json`, static `public/`
- `sprint-service/` — Express app and `swagger.json`
- `task-service/` — Express app and `swagger.json`
- `k8s/` — Kubernetes manifests (namespace, deployments, services, mongo)
- `Dockerfile.user-service`, `Dockerfile.sprint-service`, `Dockerfile.task-service` — per-service Dockerfiles

Why API-first + OpenAPI
- API-first ensures API contracts are designed and documented before or alongside implementation.
- Each service provides an OpenAPI (Swagger) spec (`swagger.json`) that drives interactive docs at `/api-docs`, enabling fast integration and testing.

Quick start (local development)
1. Install Node.js (v18+ recommended) and Docker (optional for local image builds).
2. Start a MongoDB instance and set `MONGO_URI` environment variables for each service, or let services use an in-memory fallback for local dev (note: mongodb-memory-server may attempt to download binaries and fail in some environments).

Run services individually (PowerShell examples):

```powershell
cd "d:/softer engineering/user-service"
npm install
npm run dev

cd "d:/softer engineering/sprint-service"
npm install
npm run dev

cd "d:/softer engineering/task-service"
npm install
npm run dev
```

Open interactive API docs (after a service is running):
- User: http://localhost:3001/api-docs
- Sprint: http://localhost:3002/api-docs
- Task: http://localhost:3003/api-docs

Docker (build images)

```powershell
docker build -t user-service:latest -f Dockerfile.user-service .
docker build -t sprint-service:latest -f Dockerfile.sprint-service .
docker build -t task-service:latest -f Dockerfile.task-service .
```

Kubernetes (local kind cluster)
This repo includes a `k8s/` folder with manifests and a `README.md` describing how to deploy locally using `kind`.

Summary of steps I used to deploy locally with kind:

1. Install `kind` (or use Docker Desktop / minikube).
2. Create a cluster:

```powershell
kind create cluster --name softer-eng
```

3. Build images and load them into kind:

```powershell
docker build -t user-service:latest -f Dockerfile.user-service .
docker build -t sprint-service:latest -f Dockerfile.sprint-service .
docker build -t task-service:latest -f Dockerfile.task-service .
kind load docker-image user-service:latest --name softer-eng
kind load docker-image sprint-service:latest --name softer-eng
kind load docker-image task-service:latest --name softer-eng
```

4. Apply manifests:

```powershell
kubectl apply -f k8s/
kubectl get pods -n softer-eng -o wide
```

Notes and troubleshooting
- The services use `mongodb-memory-server` by default when `MONGO_URI` is not provided. In containerized or CI environments this downloader can fail due to platform binary availability; prefer a running MongoDB in Kubernetes (a `mongo` Deployment/service is included at `k8s/mongo.yaml`).
- If pods report `ImagePullBackOff` when using local images, set `imagePullPolicy: IfNotPresent` in the deployment spec and load the images into the cluster (see `k8s/*` manifests).

OpenAPI / Swagger files
- Each service includes an OpenAPI (Swagger) spec at:
  - [user-service/swagger.json](user-service/swagger.json)
  - [sprint-service/swagger.json](sprint-service/swagger.json)
  - [task-service/swagger.json](task-service/swagger.json)

Use these specs to generate clients, run contract tests, or import into API management tools.

CI / Deploy notes
- For remote clusters or CI, push the built images to a registry and update the `image:` fields in `k8s/*.yaml` to reference the registry.
- Consider adding a CI pipeline to build images, run tests, publish images, and apply Helm or kubectl manifests.

Files added/updated in this workspace (summary)
- `k8s/` — namespace, deployments, services, `mongo.yaml`, `README.md`
- `README_MICROSERVICES_OPENAPI.md` — this file (project overview and run instructions)

If you want, I can:
- Commit this new README and push it to `origin/main` (I can include a commit message you prefer),
- Convert the OpenAPI specs to Markdown or a single combined API portal page,
- Add a simple `Makefile` or PowerShell script to automate build/load/apply steps.

Which action should I take next? (commit & push / convert OpenAPI / add scripts / other)