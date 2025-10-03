FROM node:20
RUN corepack enable
WORKDIR /app

COPY . .
RUN pnpm install
RUN pnpm build

EXPOSE 56789

CMD ["pnpm", "start"]
