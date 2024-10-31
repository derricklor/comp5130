# syntax=docker/dockerfile:1
# client Dockerfile
ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine

ENV PORT=3000

# Expose the port that the clien listens on.
EXPOSE 3000

# define the context of the container
WORKDIR /usr/local/app

# copy files into container at destination WORKDIR+/
COPY package.json /code/server/package.json
COPY package-lock.json /code/server/package-lock.json
# Clean install dependencies with npm
RUN npm install

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . /code/client

# Run the application.
# auto runs the script 'start' in package.json
CMD npm run start