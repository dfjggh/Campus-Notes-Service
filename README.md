# Campus Notes Service

A small notes service for students. It provides a REST API and a simple web UI to create, list and delete course notes. Fully containerized with Docker.

## Tech Stack
- Node.js 20 + Express
- Docker (multi-stage build) + Docker Compose
- GitHub Actions (CI: tests + Docker build)

## Features
- Add / list / delete notes by course
- Web UI at `/`
- REST API at `/api/notes`
- Health endpoint at `/health`
- Notes persisted to a JSON file (Docker volume with Compose)

## Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop/)
- Git

## Run with Docker (recommended)
```bash
git clone https://github.com/<your-username>/Campus-Notes-Service.git
cd Campus-Notes-Service
docker build -t campus-notes-service .
docker run -d --name campus-notes -p 3000:3000 campus-notes-service
```
Open http://localhost:3000

## Run with Docker Compose
```bash
docker compose up -d --build
```
Data is stored in the `notes-data` volume and survives restarts.

## Stop and clean up
```bash
docker stop campus-notes
docker rm campus-notes
docker rmi campus-notes-service     # optional: remove the image
# Compose:
docker compose down                 # add -v to also delete the data volume
```

## Configuration
| Variable    | Default                | Description                   |
|-------------|------------------------|-------------------------------|
| `PORT`      | `3000`                 | Port the server listens on    |
| `DATA_FILE` | `/app/data/notes.json` | Where notes are stored        |

Port mapping: `-p <host>:3000`, e.g. `-p 8080:3000` to use http://localhost:8080.

## How to test
```bash
curl http://localhost:3000/health
curl -X POST http://localhost:3000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Docker basics","content":"Images vs containers","course":"OS Lab"}'
curl http://localhost:3000/api/notes
```
Or open the UI in the browser and add a note. Run unit tests locally with `npm ci && npm test`.

## API
| Method | Path             | Description     |
|--------|------------------|-----------------|
| GET    | `/health`        | Health check    |
| GET    | `/api/notes`     | List notes      |
| POST   | `/api/notes`     | Create a note   |
| DELETE | `/api/notes/:id` | Delete a note   |

## Project Structure
```
Campus-Notes-Service/
├── src/            # server code
├── public/         # web UI
├── test/           # unit tests
├── docs/           # screenshots + technical notes
├── Dockerfile
├── docker-compose.yml
├── Makefile
└── .github/workflows/ci.yml
```

## Attribution
This is an original project created for the OS Lab Assignment #2. No third-party project code was used.

## License
MIT
