FROM node:22-slim

# Environment variables
ENV DEBIAN_FRONTEND=noninteractive

ARG PORT
ENV PORT=$PORT

# Set the working directory
RUN mkdir /app
COPY . /app
WORKDIR /app

# Install Bun
RUN npm i -g bun
RUN bun install && bun next telemetry disable && bun run build

# Run entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
