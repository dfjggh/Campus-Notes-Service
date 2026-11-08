build:
	docker build -t campus-notes-service .

run:
	docker run -d --name campus-notes -p 3000:3000 campus-notes-service

stop:
	docker stop campus-notes && docker rm campus-notes

up:
	docker compose up -d --build

down:
	docker compose down

test:
	npm test
