# Этап 1: сборка проекта
FROM node:20-alpine AS build

# Установка рабочего каталога
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода проекта
COPY . .

# Сборка проекта
RUN npm run build

# Этап 2: создание финального легковесного образа
FROM node:20-alpine

# Установка http-сервера для обслуживания собранного проекта
RUN npm install -g serve

# Копирование собранного приложения из этапа сборки
COPY --from=build /app/dist /app/dist

# Объявление порта, на котором будет работать приложение
EXPOSE 5000

# Запуск приложения
CMD ["serve", "-s", "/app/dist", "-l", "5000"]
