FROM node:20
RUN corepack enable
WORKDIR /app

COPY . .
RUN pnpm install

EXPOSE 5173

CMD ["pnpm", "dev"]
