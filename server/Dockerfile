# server Dockerfile

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=24.8.0

FROM node:${NODE_VERSION}-slim

# Expose the port that the server listens on.
EXPOSE 4000
# define the context of the container
WORKDIR /app

# copy files into container at destination WORKDIR+/
COPY package.json package-lock.json ./
# When a container is started for the first time, a new database with the specified name will be created and 
# initialized with the provided configuration variables. Furthermore, it will execute files with 
# extensions .sh, .sql and .sql.gz that are found in /docker-entrypoint-initdb.d
# Copy mysql file for initializing a fresh instance https://hub.docker.com/_/mysql
# SQL files will be imported by default to the database specified by the environment MYSQL_DATABASE variable in compose.yaml.
#COPY /moviedb4.sql /docker-entrypoint-initdb.d

# Clean install dependencies with npm
RUN npm install

# Run the application as a non-root user.
#USER node

# Copy the rest of the source files into the image.
COPY . ./

# Run the application.
# auto runs the script 'dev' in package.json
CMD npm run dev
