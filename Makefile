build:
	docker build -t harmonica-image .
run:
	docker run -d -p 3333:3000 --name harmonica-web harmonica-image