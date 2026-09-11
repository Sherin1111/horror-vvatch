<p align="center">
  <img src="docs/images/horror-vvatch-logo.png" alt="Horror VVatch logo" width="500">
</p>

# Horror VVatch 👻

Horror VVatch is a full-stack web application designed for horror fans to discover, organise and review horror movies and TV shows.

Users can browse a catalogue of horror media, search for titles, filter content by horror category and content warnings, and build their own personal watchlist. Watchlist entries can be tracked using three viewing statuses: **Not Watched**, **In Progress** and **Watched**.

Users can give a title a Ghost Rating 👻 from 1–5 based on how frightening they found it. Users can also write and edit reviews and view reviews submitted by other users.

The application demonstrates full-stack development using a **React and TypeScript frontend**, a **Java Spring Boot REST API**, and a **MySQL database**. The complete application can also be run using **Docker Compose**.

## Features

- User registration and login
- Browse horror movies and TV shows
- Search media by title
- Filter media by horror category
- Exclude media using content warnings
- Add and remove titles from a personal watchlist
- Track viewing status:
  - Not Watched
  - In Progress
  - Watched
- Rate watched media using a 1–5 Ghost Rating 👻
- Write and edit reviews
- View reviews from other users
- Persistent data storage using MySQL
- REST API built with Spring Boot
- Responsive React frontend
- Docker Compose setup for the full application

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Chakra UI

### Backend

- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven

### Database

- MySQL

### Development & Deployment

- Docker
- Docker Compose
- Nginx
- Git & GitHub
- Postman

## Project Structure

```text
horror-vvatch/
├── .github/
├── backend/
├── database/
│   ├── data.sql
│   └── schema.sql
├── docs/
│   ├── images/
│   └── project-documentation.md
├── frontend/
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

The backend is organised by feature, with separate Controller, Service and Repository layers. The `frontend` contains the React and TypeScript application, while `database` contains SQL scripts used for database reference and seed data. Project documentation and wireframes are stored in `docs`.

## Prerequisites

To run the application locally, you will need:

- Java 21
- Maven
- Node.js
- npm
- MySQL
- Git

For the Docker setup, you will need:

- Docker
- Docker Compose

## Running Locally

### 1. Create the database

Make sure MySQL is running locally, then create an empty database:

```sql
CREATE DATABASE horror_vvatch;
```

You do not need to manually create any tables. Spring Boot/Hibernate creates the database tables from the JPA entity definitions when the backend starts.

### 2. Configure the backend

The backend uses a local configuration file for database credentials.

From the `backend` directory, create:

```
local.properties
```

Add your local MySQL credentials:

```
spring.datasource.url=jdbc:mysql://localhost:3306/horror_vvatch
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
```

`local.properties` contains local database credentials and is excluded from Git. Do not commit this file or add real credentials to `application.properties`.

### 3. Start the backend

From the `backend` directory:

```
./mvnw spring-boot:run
```

The Spring Boot API will run on:

```
http://localhost:8080
```

When the application starts, Hibernate creates the database tables and the seed data is loaded from `data.sql`.

### 4. Start the frontend

Open a second terminal and navigate to the `frontend` directory:

```
cd frontend
npm install
npm run dev
```

Vite will display the local frontend URL in the terminal.

Open the displayed URL in your browser to launch Horror VVatch.

## Database & Seed Data

Horror VVatch uses **MySQL** for persistent data storage.

The application database contains the following entities:

- Users
- Media
- Watchlist Entries
- Reviews
- Horror Categories
- Content Warnings

Many-to-many relationships between media and categories/content warnings are handled using junction tables.

### Database Setup

You only need to create an empty `horror_vvatch` database when running the application locally:

```sql
CREATE DATABASE horror_vvatch;
```

The database tables do not need to be created manually. When the Spring Boot backend starts, **Hibernate/JPA creates the tables from the application's entity definitions**.

### Seed Data

Seed data is provided in:

```
backend/src/main/resources/data.sql
```

The seed data provides example content so the application can be explored immediately, including:

Horror movies and TV shows
Sample users
Horror categories
Content warnings
Example reviews

The project also contains SQL files under the database directory:

```
database/
├── data.sql
└── schema.sql
```

These SQL files provide the database structure and seed data as reference files for the project. The runtime seed data loaded by Spring Boot is located at backend/src/main/resources/data.sql.

### Database Persistence

When running with Docker Compose, MySQL uses a named Docker volume to persist database data between container restarts.

To completely reset the Docker database and recreate it from scratch:

```
docker compose down -v
docker compose up --build
```

## Running with Docker Compose

Docker Compose is used to run the complete Horror VVatch application as a multi-container application.

The Docker Compose setup includes three services:

- **Frontend** — React application served using Nginx
- **Backend** — Java Spring Boot REST API
- **Database** — MySQL

The backend waits for the MySQL database to become healthy before starting, ensuring that the application can establish its database connection correctly.

### 1. Configure the environment

Copy the environment variable template to create your local `.env` file:

```
cp .env.example .env
```

Open `.env` and provide your database credentials and port configuration:

```
MYSQL_DATABASE=horror_vvatch
MYSQL_USER=horror_vvatch
MYSQL_PASSWORD=your_password
MYSQL_ROOT_PASSWORD=your_root_password
FRONTEND_PORT=8081
BACKEND_PORT=8080
```

`.env` is excluded from Git and should not be committed to the repository.

### 2. Build and start the application

From the project root, run:

```
docker compose up --build
```

Docker Compose will:

1. Start the MySQL database.
2. Wait for the database health check to pass.
3. Start the Spring Boot backend.
4. Create the database tables using Hibernate/JPA.
5. Load the seed data.
6. Start the frontend using Nginx.

### 3. Access the application

Once all services have started, open:

| Service     | Address                 |
| ----------- | ----------------------- |
| Frontend    | `http://localhost:8081` |
| Backend API | `http://localhost:8080` |

The Horror VVatch application should now be available through the frontend.

## Demo Account

A sample user is included in the seed data for testing authenticated features such as the watchlist, viewing status, Ghost Ratings and reviews.

**Username:** `cryptkeeper87`  
**Password:** `Horror123!`

This account is provided for local development and assessment testing only.

### Stopping the application

To stop the containers while keeping the database data:

```
docker compose down
```

To stop the containers and remove the stored database data:

```
docker compose down -v
```

The `-v` option removes the named MySQL volume and can be used when a completely fresh database is required.

## API Documentation & Testing

Horror VVatch uses a REST API built with Spring Boot to connect the React frontend with the MySQL database.

The API provides endpoints for:

- Users
- Media
- Horror Categories
- Content Warnings
- Watchlist Entries
- Reviews

The API was tested using **Postman**, including successful requests, validation, search functionality, relationship queries, filtering and error handling.

Detailed API documentation, including endpoints, request parameters, request bodies, response data, status codes and testing evidence, can be found in:

```
docs/project-documentation.md
```

The project documentation also includes screenshots of API requests and responses from Postman.

## Testing

Horror VVatch was tested throughout development to verify both individual API functionality and the behaviour of the complete application.

Testing included:

- **Frontend functionality testing** — verified registration, login/logout, media browsing, searching, filtering, watchlist management, viewing status, Ghost Ratings and reviews.
- **Postman API testing** — tested successful requests, validation, search functionality, relationships, filtering and error responses.
- **Database testing** — verified that application data was correctly stored and persisted in MySQL.
- **Docker integration testing** — tested the complete application using Docker Compose, including the MySQL health check, Spring Boot backend, seed data and frontend served through Nginx.
- **Clean environment testing** — removed the Docker database volume and rebuilt the application from scratch to verify that the database, tables, seed data and application functionality were correctly initialised.

Detailed API testing evidence and screenshots can be found in:

```text
docs/project-documentation.md
```

## Project Documentation

Detailed project documentation is available in:

```text
docs/project-documentation.md
```

The documentation covers the project's planning, user stories, wireframes, architecture, data flow, database design, API design, implemented features, API testing, Docker testing, challenges and solutions, scalability, performance, accessibility and future improvements.

## Project Board

Project planning and task tracking were managed using a GitHub Project board.

[View the Horror VVatch Project Board](https://github.com/users/Sherin1111/projects/1)

## Future Improvements

Potential future improvements include:

- Add an About/Introduction page explaining the purpose of Horror VVatch and the concept behind the application.
- Integrate the TMDB API to provide a larger and more up-to-date media catalogue.
- Add personalised horror recommendations.
- Add a discussion and community board.
- Add upcoming horror releases.
- Add streaming availability information.
- Expand media details to include directors, writers and actors.
- Add age ratings.
- Add social sharing functionality for reviews and horror media.
- Expand automated and integration testing.

## Author

**Sherin Adam**

Full-Stack Development Project  
Coding Black Females
