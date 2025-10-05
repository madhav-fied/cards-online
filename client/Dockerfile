FROM node:20 AS build
RUN corepack enable
WORKDIR /app
COPY . .
RUN pnpm install
RUN pnpm build

FROM nginx:stable-alpine
COPY serve/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

