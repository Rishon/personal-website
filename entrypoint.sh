#!/bin/sh

exec bun start -- -H 0.0.0.0 -p ${PORT}
