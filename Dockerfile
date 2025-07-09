
FROM golang:1.24.4-alpine AS build

WORKDIR /usr/src/app

COPY backend/go.mod backend/go.sum ./
RUN go mod download

COPY backend/. ./

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -o myapp .



FROM alpine:latest

WORKDIR /app

COPY --from=build /usr/src/app/myapp .


COPY frontend ./frontend

COPY .env ./

EXPOSE ${SERVER_PORT}

CMD ["./myapp"]
