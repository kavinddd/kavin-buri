# ---- Build Stage ----
FROM node:22-alpine AS builder


# Copy project files
WORKDIR /app
COPY /backoffice /app/backoffice
COPY /nginx.conf /app/nginx.conf

# Install deps and build the React app
WORKDIR /app/backoffice
RUN npm install && npm run build

# ---- Production Stage (NGINX) ----
FROM nginx:alpine

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files to nginx public dir
COPY --from=builder /app/backoffice/dist /usr/share/nginx/html

COPY --from=builder /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
