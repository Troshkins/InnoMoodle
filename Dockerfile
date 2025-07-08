# ---- ЭТАП 1: сборка Go ----
FROM golang:1.24.4-alpine AS build

WORKDIR /usr/src/app

# 1. Копируем только go.mod и go.sum из backend, чтобы закэшировать модули
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# 2. Копируем весь Go‑код из backend
COPY backend/. ./

# 3. Собираем статически слинкованный бинарь
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -o myapp .



# ---- ЭТАП 2: рантайм ----
FROM alpine:latest

WORKDIR /app

# 1. Забираем готовый бинарь
COPY --from=build /usr/src/app/myapp .

# 2. Копируем статику и фронтенд прямо из корня проекта
#    (они НЕ внутри build‑этапа!)
#COPY static ./static
COPY frontend ./frontend
COPY index.html ./index.html

# 3. Копируем .env (если вы используете godotenv)
COPY .env ./

# 4. Открываем порт
EXPOSE ${SERVER_PORT}

# 5. Запуск приложения
CMD ["./myapp"]
