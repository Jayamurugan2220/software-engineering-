Kubernetes manifests for the local softer-engineering services

Notes
- Manifests use image names: `user-service:latest`, `sprint-service:latest`, `task-service:latest`.
- Build images locally and (if required) load them into your cluster (e.g., for `kind` or `minikube`).

Build locally (PowerShell):

```powershell
docker build -t user-service:latest -f Dockerfile.user-service .
docker build -t sprint-service:latest -f Dockerfile.sprint-service .
docker build -t task-service:latest -f Dockerfile.task-service .
```

If using `kind` (load images into cluster):

```powershell
kind load docker-image user-service:latest
kind load docker-image sprint-service:latest
kind load docker-image task-service:latest
```

Apply manifests:

```powershell
kubectl apply -f k8s/
```

Update images in the YAML files if you want to use a registry-hosted image.
