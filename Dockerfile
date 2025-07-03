FROM denoland/deno:latest AS builder
WORKDIR /app

COPY . .
RUN deno install
RUN deno task build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
