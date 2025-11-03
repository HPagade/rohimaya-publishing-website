# PhoenixForge AI - Docker Deployment

This directory contains Docker configurations for deploying the PhoenixForge AI platform.

## Quick Start

### Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Production

```bash
# Build and deploy
docker-compose -f docker-compose.prod.yml up -d

# Scale services
docker-compose -f docker-compose.prod.yml up -d --scale backend=3
```

## Services

### Website (Next.js)
- **Port:** 3000
- **Image:** `phoenixforge/website:latest`
- **Build:** `docker build -t phoenixforge/website ./website`

### Backend API
- **Port:** 3001
- **Image:** `phoenixforge/backend:latest`
- **Build:** `docker build -t phoenixforge/backend ./backend`

### PostgreSQL
- **Port:** 5432
- **Image:** `postgres:15-alpine`
- **Volume:** `postgres_data`

### Redis
- **Port:** 6379
- **Image:** `redis:7-alpine`
- **Volume:** `redis_data`

### n8n
- **Port:** 5678
- **Image:** `n8nio/n8n:latest`
- **Volume:** `n8n_data`

## Environment Variables

Create `.env` file in deployment/docker/:

```bash
# Database
POSTGRES_USER=phoenixforge
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=phoenixforge
DATABASE_URL=postgresql://phoenixforge:your_secure_password@postgres:5432/phoenixforge

# Redis
REDIS_URL=redis://redis:6379

# API Keys
OPENAI_API_KEY=sk-...
STRIPE_SECRET_KEY=sk_...
CLERK_SECRET_KEY=sk_...

# Application
NODE_ENV=production
API_URL=https://api.phoenixforge.ai
NEXT_PUBLIC_API_URL=https://api.phoenixforge.ai
```

## Dockerfile Examples

### Website Dockerfile
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

### Backend Dockerfile
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ../../backend
    environment:
      DATABASE_URL: ${DATABASE_URL}
      REDIS_URL: ${REDIS_URL}
      OPENAI_API_KEY: ${OPENAI_API_KEY}
      NODE_ENV: production
    ports:
      - "3001:3001"
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  website:
    build: ../../website
    environment:
      NEXT_PUBLIC_API_URL: ${API_URL}
    ports:
      - "3000:3000"
    depends_on:
      - backend
    restart: unless-stopped

  n8n:
    image: n8nio/n8n
    environment:
      N8N_BASIC_AUTH_ACTIVE: "true"
      N8N_BASIC_AUTH_USER: ${N8N_USER:-admin}
      N8N_BASIC_AUTH_PASSWORD: ${N8N_PASSWORD}
      WEBHOOK_URL: ${WEBHOOK_URL}
    volumes:
      - n8n_data:/home/node/.n8n
    ports:
      - "5678:5678"
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
  n8n_data:
```

## Commands

### Build Images
```bash
# Build all
docker-compose build

# Build specific service
docker-compose build website
docker-compose build backend
```

### Run Services
```bash
# Start all
docker-compose up -d

# Start specific service
docker-compose up -d postgres redis
docker-compose up -d backend
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f website
```

### Database Management
```bash
# Run migrations
docker-compose exec backend npm run db:migrate

# Backup database
docker-compose exec postgres pg_dump -U phoenixforge phoenixforge > backup.sql

# Restore database
docker-compose exec -T postgres psql -U phoenixforge phoenixforge < backup.sql
```

### Scaling
```bash
# Scale backend
docker-compose up -d --scale backend=3

# Scale with load balancer
docker-compose -f docker-compose.prod.yml up -d --scale backend=5
```

## Production Deployment

### AWS ECS
1. Build and push images to ECR
2. Create ECS cluster
3. Define task definitions
4. Create services
5. Configure load balancer

### Kubernetes
See [../kubernetes/README.md](../kubernetes/README.md)

### Digital Ocean
1. Create droplet
2. Install Docker
3. Clone repository
4. Run docker-compose

```bash
# On droplet
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
git clone https://github.com/yourusername/phoenixforge.git
cd phoenixforge/deployment/docker
docker-compose -f docker-compose.prod.yml up -d
```

## Monitoring

### Health Checks
```bash
# Check all services
docker-compose ps

# Check specific service health
curl http://localhost:3001/api/health
curl http://localhost:3000/api/health
```

### Resource Usage
```bash
# View stats
docker stats

# View logs
docker-compose logs --tail=100 -f
```

## Troubleshooting

### Service Won't Start
```bash
# Check logs
docker-compose logs service_name

# Restart service
docker-compose restart service_name

# Rebuild and restart
docker-compose up -d --build service_name
```

### Database Connection Issues
```bash
# Check postgres is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Test connection
docker-compose exec postgres psql -U phoenixforge -c "SELECT 1"
```

### Out of Memory
```bash
# Increase memory limit in docker-compose.yml
services:
  backend:
    mem_limit: 2g
    mem_reservation: 1g
```

## Security

### Best Practices
1. Use secrets management (Docker secrets, AWS Secrets Manager)
2. Run containers as non-root user
3. Scan images for vulnerabilities
4. Keep images updated
5. Use multi-stage builds
6. Minimize image size

### Secrets Management
```bash
# Create secret
echo "my_secret" | docker secret create db_password -

# Use in compose
services:
  backend:
    secrets:
      - db_password
secrets:
  db_password:
    external: true
```

## Backups

### Automated Backups
```bash
# Add to crontab
0 2 * * * cd /path/to/deployment/docker && ./backup.sh

# backup.sh
#!/bin/bash
docker-compose exec -T postgres pg_dump -U phoenixforge phoenixforge | \
  gzip > backup-$(date +%Y%m%d).sql.gz
aws s3 cp backup-$(date +%Y%m%d).sql.gz s3://phoenixforge-backups/
```

---

For more deployment options, see the parent [deployment README](../README.md).
