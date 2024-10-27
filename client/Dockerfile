# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.12.2

FROM node:${NODE_VERSION}-alpine


ENV NODE_ENV production
ENV PORT=3000

# Expose the port that the application listens on.
EXPOSE 3000

WORKDIR /code/client

# install dependencies
COPY package.json /code/server/package.json
COPY package-lock.json /code/server/package-lock.json
# Clean install with npm
RUN npm install

# Run the application as a non-root user.
USER node

# Copy the rest of the source files into the image.
COPY . /code/client

# Run the application.
# auto runs the script 'start' in package.json
CMD npm run start