FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

RUN npm prune --production && \
    npm cache clean --force

FROM nginx:alpine

RUN rm -rf /var/cache/apk/* /tmp/* /var/tmp/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
