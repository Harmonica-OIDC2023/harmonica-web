build:
	docker build -t harmonica-image .
run:
	docker run -v $(pwd):/app -d -p 8080:3000 --name harmonica-web harmonica-image