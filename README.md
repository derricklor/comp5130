# comp5130
For internet and web systems class.
The purpose of the project is to build a website that utilizes modern techniques and technologies. The project touches upon basic and advanced levels of learning that are more commonly used in the industry today. Consider it an educational project that is meant to encompass the full stack of development from front-end, back-end, deployment, and upkeep of a software program.

# For quick setup and easy deploy, switch to Docker version of the project
1. switch branches from main to docker.
2. Read the README for more detailed explaination.

# How to setup database:
1. Run XAMPP
2. Start Apache service and MySQL service.
3. Navigate to localhost in any web browser.
4. In phpMyAdmin, create new table and import using the provided moviedb4.sql file.

# How to setup server:
1. cd into server
2. run ```npm install``` to install dependencies
3. run ```npm run dev``` to start the server.
4. The server should automatically establish connection to the database.

# How to setup client:
1. cd into client
2. run ```npm install``` to install dependencies
3. run ```npm run dev``` to start the server.
4. Navigate to localhost:3000 in any web browser.

#  List of Supported Features
1. View database of supported movies.
2. Display basic details of the movie.
3. Create an account.
4. Login using an account.
5. Admin accounts can add, edit, or delete movie entries.
6. View most top-rated movies.
7. View of recently released movies.
8. Guests and users can search for movies in the database.
