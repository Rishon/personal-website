FROM oven/bun:1

ENV DEBIAN_FRONTEND=noninteractive

ARG PORT
ENV PORT=$PORT

WORKDIR /app

COPY . .

RUN bun install \
    && bun next telemetry disable \
    && bun run build

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]