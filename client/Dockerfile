# client Dockerfile
ARG NODE_VERSION=24.8.0

FROM node:${NODE_VERSION}-slim

# Expose the port that the client listens on. Vite uses 5173 by default.
EXPOSE 5173

# define the context of the container
WORKDIR /app

# copy files into container at destination WORKDIR
COPY package.json package-lock.json ./

# Clean install dependencies with npm
RUN npm install

# Run the application as a non-root user.
# USER node

# Copy the rest of the source files into the container WORKDIR.
COPY . ./

# Run the application.
# auto runs the script 'dev' in package.json
CMD ["npm", "run", "dev"]