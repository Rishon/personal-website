FROM ubuntu:22.04

# Update the package list
RUN apt-get update && apt-get autoremove -y

# Environment variables
ENV DEBIAN_FRONTEND=noninteractive

ARG PORT
ENV PORT=$PORT

# Install some basic tools
RUN apt-get update && apt-get install -y nano wget curl git unzip zip

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_22.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

# Set the working directory
COPY . /app
WORKDIR /app

# Give the entrypoint.sh file the right permissions
RUN chmod +x /app/entrypoint.sh

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Expose the port
EXPOSE ${PORT}

# Install npm-packages & run the app
ENTRYPOINT ["/app/entrypoint.sh"]