# Базовый образ Node.js
FROM node:20

# Установка рабочего каталога в контейнере
WORKDIR /app

# Копирование package.json и package-lock.json (если есть)
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование исходного кода проекта
COPY . .

# Сборка проекта
RUN npm run build

# Установка http-сервера для обслуживания собранного проекта
RUN npm install -g serve

# Объявление порта, на котором будет работать приложение
EXPOSE 5000

# Запуск приложения
CMD ["serve", "-s", "dist", "-l", "5000"]