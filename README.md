**** GETTING STARTED **** 
To run the application, you need to have Deno and Docker installed on your system. Follow these steps:
1. Clone this repository to your local machine.
2. Go to docker-compose.yml and open up the local terminal 
3. Run "docker-compose up" in the terminal

VERY IMPORTANT NOTE: If you are using a machine with Apple M1 chip (like me), in container log, you will see this error message: "Function not implemented (os error 38)". I use Aalto's virtual desktop to workaround this situation. You can do the same. 

SECOND NOTE: If you don't have Docker, go to "https://docs.docker.com/engine/install/" and install the suitable one for your computer. Otherwise, you won't be able to build the app. 

THIRD NOTE: I used some variable names in Turkish, my mothertongue, for my own convenience. If you realise that you don't know what that variable means, and you are curious, you can check out the comments. That's why I added extensive amount of comments. Alternatively, you can use translate or dictionary :D

**** INFO ABOUT THE FILES ****
The project is structured as follows:

starter/
├─ flyway/sql/
│  ├─ v1_initial_schema.sql
├─ e2e-playwright/
│  ├─ dockerfile
│  ├─ pacakge.json
│  ├─ playwright.config.js
│  ├─ tests/
│  │  ├─ hello-world.spec.js
├─ shopping-lists/
│  ├─ controllers/
│  │  ├─ kontrolListesi.js
│  ├─ database/
│  │  ├─ database.js
│  ├─ services/
│  │  ├─ servisListesi.js
│  ├─ views/
│  │  ├─ layouts/
│  │  │  ├─ layout.eta
│  │  ├─ index.eta
│  │  ├─ items.eta
│  │  ├─ lists.eta
│  ├─ app.js
│  ├─ deps.js
│  ├─ dockerfile
├─ README.md
├─ project.env
├─ docker-compose.yml


**** IMPORTANT FILES ****
1. app.js: The main entry point of the application that handles HTTP requests and routes them to the appropriate controllers.
2. kontrolListesi.js: The controller module responsible for handling HTTP requests and defining the application's behavior.
3. database.js: Manages the database connection pool and provides a function for executing database queries.
4. servisListesi.js: Contains functions that interact with the database to retrieve, add, and manipulate shopping lists and items.
5. hello-world.spec.js: End-to-end tests for the application using Playwright.

**** FEATURES ****
1. Create Shopping Lists: Easily create new shopping lists with unique names to organize your shopping tasks.
2. Add Items: Add items to your shopping lists, specifying their names and details for a comprehensive shopping plan.
3. Mark Items as Collected: Keep track of your progress by marking items as collected when you pick them up during your shopping trip.
4. Deactivate Lists: When you've completed all the items on a list, you can deactivate it to declutter your view while preserving the data.
5. View Shopping Lists: Effortlessly view your shopping lists and the items within them, allowing you to review, edit, and manage your shopping tasks.
6. Statistics: Gain insights into your shopping habits with statistics that show the total number of lists and items you've managed over time.

RUNNING TESTS
1. To ensure the reliability and functionality of the application (as well as to satisfy the requirements :D), I have included end-to-end tests using Playwright. You can run these tests to verify that the application works as expected.