#!/bin/sh

exec bun run start -- -H 0.0.0.0 -p "${PORT:-3000}"
