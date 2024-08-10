# Этап 1: сборка проекта
FROM node:20-alpine AS build

# Установка рабочего каталога
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка только продакшн-зависимостей
RUN npm ci --production

# Копирование исходного кода проекта
COPY . .

# Сборка проекта
RUN npm run build

# Удаление dev-зависимостей и кеша npm, если они есть
RUN npm prune --production && \
    npm cache clean --force

# Этап 2: создание финального легковесного образа
FROM nginx:alpine

# Удаление лишних файлов, чтобы уменьшить размер образа
RUN rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

# Копирование собранного приложения из этапа сборки
COPY --from=build /app/dist /usr/share/nginx/html

# Конфигурация Nginx для работы с вашим приложением
COPY nginx.conf /etc/nginx/nginx.conf

# Объявление порта, на котором будет работать приложение
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]
