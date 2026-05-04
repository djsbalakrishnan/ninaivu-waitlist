# Running Ninaivu Locally

## Option A — Docker (recommended)

**Prerequisite:** [Docker Desktop](https://www.docker.com/products/docker-desktop/)

From the repo root:

```bash
docker-compose up --build
```

Docker starts five services automatically:


| Service         | URL                                                          | Notes                                       |
| --------------- | ------------------------------------------------------------ | ------------------------------------------- |
| Frontend (Vite) | [http://localhost:5173](http://localhost:5173)               | Hot-reloads on file save                    |
| API (Django)    | [http://localhost:8000](http://localhost:8000)               | Runs migrations on start                    |
| Admin           | [http://localhost:8000/admin/](http://localhost:8000/admin/) |                                             |
| PostgreSQL      | localhost:5432                                               | `ninaivu` db / user / password              |
| Redis           | localhost:6379                                               | Celery broker                               |
| Celery worker   | —                                                            | Prints emails to terminal (console backend) |


### Common commands

```bash
# Run in the background
docker-compose up --build -d

# Tail logs for a specific service
docker-compose logs -f api
docker-compose logs -f worker

# Create a Django superuser
docker-compose exec api python manage.py createsuperuser

# Run a migration after changing a model
docker-compose exec api python manage.py makemigrations
docker-compose exec api python manage.py migrate

# Open a Django shell
docker-compose exec api python manage.py shell

# Stop all services
docker-compose down

# Stop and wipe the database volume
docker-compose down -v
```

> Confirmation emails are printed to the Celery worker terminal (`docker-compose logs -f worker`) — no SMTP setup needed for local dev.

---

## Option B — Without Docker

**Prerequisites:** Python 3.11+, Node.js 18+, Redis (`brew install redis` on macOS)

### Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Minimum required values in `.env`:


| Key            | How to get it                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------ |
| `SECRET_KEY`   | `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"` |
| `DATABASE_URL` | Neon connection string, or omit to fall back to SQLite                                                       |
| `REDIS_URL`    | Leave blank to use `redis://localhost:6379/0`                                                                |


```bash
python manage.py migrate
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_API_URL already points to localhost:8000
npm run dev
```

### Celery worker (optional)

```bash
redis-server
celery -A config worker --loglevel=info
```

### All three terminals at a glance


| Terminal     | Command                                                                              |
| ------------ | ------------------------------------------------------------------------------------ |
| 1            | `cd backend && source .venv/bin/activate && python manage.py runserver`              |
| 2            | `cd frontend && npm run dev`                                                         |
| 3 (optional) | `cd backend && source .venv/bin/activate && celery -A config worker --loglevel=info` |


