# comp5130 WITH DOCKERIZE CONTAINERS
For internet and web systems class.
The purpose of the project is to build a website that utilizes modern techniques and technologies. The project touches upon basic and advanced levels of learning that are more commonly used in the industry today. Consider it an educational project that is meant to encompass the full stack of development from front-end, back-end, deployment, and upkeep of a software program.

# How to run:
1. ```docker compose up```
2. wait for containers to initialize and communicate with each other
3. navigate to localhost:5173

# Explanation of compose.yaml
The paths in compose.yaml are relative to the parent directory comp5130Docker.

While in the parent directory, comp5130Docker, execute ```docker compose up``` , which will load up the compose.yaml and start building the client image and server image, and pull the mysql:8 image. Then will start the database server first, using the mysql image and start initializing the database from the moviedb4.sql file that copied into the /docker-entrypoint-initdb.d entry point. [Read more](https://hub.docker.com/_/mysql) from the mysql docker repo under fresh init.

After checking that the database is up and ready to receive connections, the server and client containers will begin running. The database and server are connected under the same network, therefore are able to communicate between containers by directly specifying their service names in the compose.yaml. This is how the server established connection to the database. Without connection to the database, the server container will crash and stop. Once the server runs without any errors, it is ready to receive connections from clients.

The client interface is reachable from localhost:5173, which uses vite's default port to serve the react application. From then on the client is able to fetch data from the server, which will query the database for and return with information.

#  List of Supported Features
1. View database of supported movies.
2. Display basic details of the movie.
3. Create an account.
4. Login using an account.
5. Admin accounts can add, edit, or delete movie entries.
6. View most top-rated movies.
7. View of recently released movies.
8. Guests and users can search for movies in the database.
