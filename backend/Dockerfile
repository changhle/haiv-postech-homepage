FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json tsconfig.json prisma.config.ts ./
RUN npm ci

COPY prisma ./prisma
COPY src ./src
RUN npx prisma generate

ENV PORT=8080
EXPOSE 8080

# Apply migrations, seed once (idempotent), then start the API server.
CMD ["sh", "-c", "npx prisma migrate deploy && npm run seed && npm start"]
