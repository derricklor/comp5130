# syntax=docker/dockerfile:1
# server Dockerfile

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine

# Expose the port that the server listens on.
EXPOSE 4000
# define the context of the container
WORKDIR /usr/local/app

# copy files into container at destination WORKDIR+/
COPY package.json package-lock.json ./
# When a container is started for the first time, a new database with the specified name will be created and 
# initialized with the provided configuration variables. Furthermore, it will execute files with 
# extensions .sh, .sql and .sql.gz that are found in /docker-entrypoint-initdb.d
# Copy mysql file for initializing a fresh instance https://hub.docker.com/_/mysql
# SQL files will be imported by default to the database specified by the environment MYSQL_DATABASE variable in compose.yaml.
COPY /moviedb.msql /docker-entrypoint-initdb.d

# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# into this layer.
# RUN --mount=type=bind,source=package.json,target=package.json \
# --mount=type=bind,source=package-lock.json,target=package-lock.json \
# --mount=type=cache,target=/root/.npm \
# npm ci --omit=dev


# Clean install dependencies with npm
RUN npm install

# Run the application as a non-root user.
#USER node

# Copy the rest of the source files into the image.
COPY . ./

# Run the application.
# auto runs the script 'start' in package.json
CMD npm run start
