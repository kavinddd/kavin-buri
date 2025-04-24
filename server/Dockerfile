# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Copy project files
COPY . .

# Install deps and build the React app
RUN npm install --legacy-peer-deps
RUN node ace build --ignore-ts-errors

# ---- Production Stage (NGINX) ----
FROM node:22-alpine

WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/build /app/build
COPY --from=builder /app/.env.production /app/build
WORKDIR /app/build
RUN npm install --legacy-peer-deps --production
# RUN node ace migration:run --force
# RUN node ace db:seed
# CMD [ "sh" ]

CMD ["node", "./bin/server.js"]
