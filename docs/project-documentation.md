# Horror VVatch Documentation

## 1. Project Brief

A full-stack web application designed specifically for horror fans to discover,
organise, and review horror movies and TV shows. Users can build their own
personal watchlist by tracking titles through different viewing statuses:
**Not Watched**, **In Progress**, and **Watched**.

Once a title has been watched, users can rate how frightening they found it using
a unique **Ghost Rating (👻)** system, where one ghost represents a mildly scary
experience and five ghosts represent an extremely frightening one.

Users can also write their own reviews to express what they liked or disliked
about a title.

Future versions of the application will include a discussion board, personalised
horror recommendations based on users' viewing history and ratings, along with a
section highlighting upcoming horror movie and TV releases in cinemas and on
streaming platforms.

---

## 2. Project Goals

One goal for this project is to have a fun scare rating system so users can rate
how scary or not a movie or TV show is. It should be something like this:

- 👻 — Not scary
- 👻👻
- 👻👻👻
- 👻👻👻👻
- 👻👻👻👻👻 — Nightmare fuel

Another goal is to have a fun status system:

- 🕯️ **Summoning** → `NOT_WATCHED`
- 🩸 **Surviving** → `IN_PROGRESS`
- 💀 **Survived** → `WATCHED`

---

## 3. MVP

- User registration and profile
- Browse stored horror movies and TV shows
- Personal watchlist
- Three watch statuses
- 1–5 Ghost Rating
- Write, edit, and delete reviews
- View reviews for a media title

---

## 4. Stretch Goals

- TMDB search
- Movie vs TV show filtering
- Multiple themes
- Personalised recommendations
- Upcoming cinema and streaming releases
- Favourites list
- User account deletion
- Horror books and games

### Discussion and Community Features

I would like to add a discussion/community board for users to share their
opinions and join discussions with other users on each movie or TV show's page.

While reviews allow users to express what they liked or disliked about a title,
discussion threads will encourage conversations about theories, favourite scenes,
hidden details, and other spoiler-friendly topics within a respectful community.

---

## 5. User Stories

- As a user, I want to create an account so I can save and manage my personal
  watchlist.

- As a user, I want to browse horror movies and TV shows so I can discover
  something new to watch.

- As a user, I want to have a watchlist of horror movies and TV shows so I can
  track which ones I want to watch, am currently watching, or have already watched.

- As a user, I want to update the watch status of a title so I can keep my
  watchlist up to date.

- As a user, I want to rate how scary a movie or TV show is using the Ghost
  Rating system so I can remember how frightening I found it.

- As a user, I want to write a review after watching a title so I can share
  my thoughts with other horror fans.

- As a user, I want to read other users' reviews so I can decide whether a
  movie or TV show is worth watching.

- As a user, I want to filter media by horror category so I can quickly find
  the types of horror I enjoy.

- As a user, I want to filter out movies with certain content warnings so I
  can avoid themes I don't like.

### Future User Stories

- As a user, I want personalised horror recommendations so I can discover
  new titles based on my watch history.

- As a user, I want to join discussions about movies and TV shows so I can
  share theories and discuss endings with other horror fans.

---

## 6. Tech Stack

- **Frontend:** React, TypeScript
- **Backend:** Java, Spring Boot
- **Database:** MySQL
- **Containerisation:** Docker, Docker Compose
- **External API:** TMDB (planned)
- **API Documentation:** Swagger/OpenAPI (planned)
- **Version Control:** Git, GitHub

---

## 7. Architecture

Horror VVatch uses a full-stack client-server architecture.

The React and TypeScript frontend will communicate with a REST API built
using Java and Spring Boot. The backend uses Spring Data JPA to communicate
with a MySQL relational database.

The Spring Boot backend follows a feature-based package structure. Related
classes are grouped by application feature rather than by technical layer.

For example:

- `media`
- `user`
- `horrorCategory`
- `contentWarning`

Each feature contains the entity, repository, service, and controller classes
required by that feature.

This structure keeps related functionality together and helps reduce coupling
between different areas of the application.

---

## 8. Folder Structure

Current folder structure, to be updated as the project develops:

```text
horror-vvatch/
├── backend/
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/
│   │               └── horrorvvatch/
│   │                   └── backend/
│   │                       ├── contentWarning/
│   │                       ├── horrorCategory/
│   │                       ├── media/
│   │                       └── user/
│   ├── pom.xml
│   └── mvnw
│
├── frontend/
│
├── database/
│   ├── schema.sql
│   └── data.sql
│
├── docs/
│   ├── images/
│   └── project-documentation.md
│
├── README.md
└── docker-compose.yml
```

## 9. Data Flow

The backend follows a feature-based architecture. Each feature contains its
own entity, repository, service, and controller where required.

A typical API request follows this flow:

```text
Client (Postman / React)
        ↓
HTTP Request
        ↓
Controller
        ↓
Service
        ↓
Repository
        ↓
MySQL Database
        ↓
JSON Response
```

The controller handles incoming HTTP requests and responses. Business logic
is handled by the service layer, while repositories communicate with the
MySQL database using Spring Data JPA.

Relationships between entities allow related data to be retrieved. For
example, a horror category can return the media associated with that category,
while the content warning service can return media excluding titles associated
with a specified warning.

---

## 10. Database Planning

The project has four main tables:

- `users`
- `media`
- `watchlist_entry`
- `review`

These tables/entities will enable users to find and view media, add titles to
and manage their watchlist, update their watch status, rate the scariness of a
title, write reviews, and read reviews written by other users.

The project also includes the `horror_category` and `content_warning` tables.

The `media_horror_category` and `media_content_warning` junction tables create
many-to-many relationships between media titles and their associated horror
categories and content warnings.

These relationships allow media to be filtered by horror subcategories, such
as supernatural or slasher, and allow titles to be filtered based on content
warnings.

### Database Implementation

The MySQL schema has been created and tested successfully. It includes primary
keys, foreign keys, unique constraints, enum values, composite primary keys, and
a check constraint limiting scare ratings to values from 1 to 5.

Hibernate automatically maps the Java entities to the MySQL database tables through Spring Data JPA.

The schema was verified by successfully creating the tables in MySQL and
populating the database using the initial seed data. The seed data includes
movies, TV shows, horror categories, content warnings, and the junction-table
relationships connecting categories and warnings to media.

### Initial Seed Data

The initial seed data contains:

- 5 movies
- 5 TV shows
- 26 horror categories
- 30 content warnings
- Media-to-category relationships
- Media-to-content-warning relationships

User seed data will be added after password encoding is implemented.

### Database Relationships

The following entity relationship diagram (ERD) illustrates the relationships
between the database tables used in Horror VVatch.

![Database relationships](images/database-relationships.png)

---

## 11. API Design

The following endpoints define the current and planned REST API for Horror VVatch.

The User, Media, Horror Category, and Content Warning endpoints have been
implemented and tested using Postman. Watchlist and Review endpoints are
planned as the next core backend features.

### Users

| Method   | Endpoint                                | Description                       |
| -------- | --------------------------------------- | --------------------------------- |
| `POST`   | `/api/users`                            | Create/register a new user        |
| `GET`    | `/api/users/{userId}`                   | Retrieve a user's profile         |
| `PUT`    | `/api/users/{userId}`                   | Update an existing user's profile |
| `GET`    | `/api/users`                            | Retrieve all users                |
| `GET`    | `/api/users/search?username={username}` | Search users by username          |
| `GET`    | `/api/users/by-email?email={email}`     | Retrieve a user by email          |
| `DELETE` | `/api/users/{userId}`                   | Delete an existing user account   |

### Media

| Method | Endpoint                          | Description                                                |
| ------ | --------------------------------- | ---------------------------------------------------------- |
| `GET`  | `/api/media`                      | Retrieve all media stored in the Horror VVatch database    |
| `GET`  | `/api/media/{mediaId}`            | Retrieve one movie or TV show by its ID                    |
| `GET`  | `/api/media/search?title={title}` | Search for media by title (case-insensitive partial match) |

### Watchlist

| Method   | Endpoint                            | Description                                                                 |
| -------- | ----------------------------------- | --------------------------------------------------------------------------- |
| `POST`   | `/api/watchlist`                    | Add a movie or TV show to a user's watchlist                                |
| `GET`    | `/api/users/{userId}/watchlist`     | Retrieve all media in a user's watchlist                                    |
| `PUT`    | `/api/watchlist/{watchlistEntryId}` | Update an entry, such as changing the watch status or adding a scare rating |
| `DELETE` | `/api/watchlist/{watchlistEntryId}` | Remove a movie or TV show from the user's watchlist                         |

### Reviews

| Method   | Endpoint                       | Description                                                  |
| -------- | ------------------------------ | ------------------------------------------------------------ |
| `POST`   | `/api/reviews`                 | Create a review for a movie or TV show                       |
| `GET`    | `/api/media/{mediaId}/reviews` | Retrieve all reviews written for a specific movie or TV show |
| `PUT`    | `/api/reviews/{reviewId}`      | Edit an existing review                                      |
| `DELETE` | `/api/reviews/{reviewId}`      | Delete an existing review                                    |

#### Horror Categories

| Method | Endpoint                                     | Description                                   |
| ------ | -------------------------------------------- | --------------------------------------------- |
| `GET`  | `/api/categories`                            | Retrieve all horror categories                |
| `GET`  | `/api/categories/{categoryId}`               | Retrieve a horror category by ID              |
| `GET`  | `/api/categories/search?categoryName={name}` | Search horror categories by name              |
| `GET`  | `/api/categories/{categoryId}/media`         | Retrieve media belonging to a horror category |

#### Content Warnings

| Method | Endpoint                                          | Description                                                        |
| ------ | ------------------------------------------------- | ------------------------------------------------------------------ |
| `GET`  | `/api/content-warnings`                           | Retrieve all content warnings                                      |
| `GET`  | `/api/content-warnings/{warningId}`               | Retrieve a content warning by ID                                   |
| `GET`  | `/api/content-warnings/search?warningName={name}` | Search content warnings by name                                    |
| `GET`  | `/api/content-warnings/{warningId}/exclude-media` | Retrieve media that does not contain the specified content warning |

---

## 12. Implemented Features

### User Feature

The User feature has been implemented using the same feature-based package structure as the Media feature.

The feature currently includes:

- `User` entity
- `UserRepository`
- `UserService`
- `UserController`
- CRUD operations (Create, Read, Update and Delete)
- Search users by username
- Retrieve a user by email
- Password validation before creating a user
- Password hidden from API responses using `@JsonProperty(access = WRITE_ONLY)`

The User API currently supports:

- Creating a new user
- Retrieving all users
- Retrieving one user by ID
- Searching users by username
- Retrieving a user by email
- Updating a user's details
- Deleting a user

The request flow is:

```text
Client (Postman / React)
        ↓
HTTP Request
        ↓
UserController
        ↓
UserService
        ↓
UserRepository
        ↓
MySQL Database
        ↓
JSON Response
```

### Media Feature

The Media feature has been implemented using a feature-based Spring Boot package structure.

The feature currently includes:

- `Media` entity
- `MediaType` enum
- `MediaRepository`
- `MediaService`
- `MediaController`
- Initial media seed data

The Media API currently supports:

- Retrieving all media
- Retrieving one media title by ID
- Searching media by title using a case-insensitive partial match

The request flow is:

```text
Client (Postman / React)
        ↓
HTTP Request
        ↓
MediaController
        ↓
MediaService
        ↓
MediaRepository
        ↓
MySQL Database
        ↓
JSON Response
```

### Horror Categories Feature

Horror VVatch supports multiple horror categories for each movie or TV show.
Media and horror categories have a many-to-many relationship, allowing a title
to belong to multiple categories.

Examples include:

- Supernatural
- Psychological Horror
- Folk Horror
- Vampire
- Witches
- Liminal Horror
- Final Girl
- Good for Her

Horror category endpoints allow the API to:

- Retrieve all horror categories
- Retrieve a horror category by ID
- Search for categories by name
- Retrieve media belonging to a specific horror category

### Content Warnings Feature

Horror VVatch uses content warnings to help users identify potentially
sensitive content in movies and TV shows.

Media and content warnings have a many-to-many relationship, allowing each
title to have multiple warnings and each warning to apply to multiple titles.

Examples include:

- Violence
- Graphic Violence
- Blood
- Animal Harm
- Animal Death
- Child Harm
- Psychological Distress
- PTSD / Trauma
- Claustrophobia
- Flashing Lights

The API also supports excluding media containing a particular content warning.
This can be used by the frontend to allow users to filter out content they
would prefer to avoid.

---

## 13. API Testing

The User, Media, Horror Category, and Content Warning APIs were tested using
Postman. Testing included successful requests, search functionality,
relationship queries, filtering behaviour, validation, and error responses.

### User API

| Method   | Endpoint                                   | Expected result          | Result |
| -------- | ------------------------------------------ | ------------------------ | ------ |
| `POST`   | `/api/users`                               | Create a new user        | Pass   |
| `GET`    | `/api/users`                               | Retrieve all users       | Pass   |
| `GET`    | `/api/users/{userId}`                      | Retrieve a single user   | Pass   |
| `GET`    | `/api/users/search?username=mo`            | Search users by username | Pass   |
| `GET`    | `/api/users/by-email?email=onyx@email.com` | Retrieve a user by email | Pass   |
| `PUT`    | `/api/users/{userId}`                      | Update user details      | Pass   |
| `DELETE` | `/api/users/{userId}`                      | Delete a user            | Pass   |
| `GET`    | `/api/users/999`                           | Return `404 Not Found`   | Pass   |
| `POST`   | `/api/users` (without password)            | Return 400 Bad Request   | Pass   |

### Create User

![Postman response showing a successful user creation (201 Created)](images/post-user.png)
_Creating a new user returns `201 Created`. The password is accepted in the request but is excluded from the JSON response because the field is configured as write-only._

### Retrieve All Users

![Postman response showing all users stored in the database](images/get-all-users.png)
_Retrieving all users stored in the database returns `200 OK`._

### Retrieve User by ID

![Postman response showing a single user retrieved by ID](images/get-one-user.png)
_Retrieving an existing user by their ID returns `200 OK` with the user's details._

### Search Users by Username

![Postman response showing users returned using a case-insensitive partial username search](images/get-by-username.png)
_Searching with the partial username "mo" returns matching users using a case-insensitive search._

### Retrieve User by Email

![Postman response showing a user retrieved using their email address](images/get-by-email.png)
_Retrieving a user by their email address returns `200 OK` with the matching user's details._

### Update User

![Postman response showing a user's details being updated successfully](images/put-user-name.png)
_Updating a user's first name returns `200 OK`. Fields not included in the request remain unchanged._

### Delete User

![Postman response showing a successful deletion (204 No Content)](images/delete-user.png)
_Successfully deleting an existing user returns `204 No Content`._

### User Not Found

![Requesting a user that does not exist returns 404 Not Found](images/get-user-error.png)
_Requesting a user with an ID that does not exist returns `404 Not Found`._

### Validation Error

![Creating a user without providing a password returns 400 Bad Request](images/post-user-missing-password.png)
_Attempting to create a user without a password returns `400 Bad Request` because a password is required._

### Media API

| Method | Endpoint                        | Expected result                  | Result |
| ------ | ------------------------------- | -------------------------------- | ------ |
| `GET`  | `/api/media`                    | Return all stored media          | Pass   |
| `GET`  | `/api/media/1`                  | Return one media title           | Pass   |
| `GET`  | `/api/media/search?title=witch` | Return titles containing "witch" | Pass   |
| `GET`  | `/api/media/search?title=super` | Return titles containing "super" | Pass   |
| `GET`  | `/api/media/999`                | Return `404 Not Found`           | Pass   |

### Retrieve All Media

![Postman response showing all media](images/api-all-media.png)
_Retrieving all media stored in the database returns `200 OK`._

### Retrieve Media by ID

![Postman response showing one media title](images/api-one-media-title.png)
_Retrieving an existing media title by its ID returns `200 OK` with the media details._

### Search by Title ("witch")

![Postman response showing titles containing "witch"](images/api-title-search2.png)
_Searching for "witch" returns media titles containing the search term using a case-insensitive partial match._

### Search by Title ("super")

![Postman response showing titles containing "super"](images/api-title-search.png)
_Searching for "super" demonstrates that partial title searches return matching media records._

### Media Not Found

![Postman response showing `404 Not Found`](images/api-404-not-found.png)
_Requesting a media title with an ID that does not exist returns `404 Not Found`._

### Horror Category Endpoints

| Method | Endpoint                                     | Description                              |
| ------ | -------------------------------------------- | ---------------------------------------- |
| GET    | `/api/categories`                            | Get all horror categories                |
| GET    | `/api/categories/{categoryId}`               | Get a horror category by ID              |
| GET    | `/api/categories/search?categoryName={name}` | Search horror categories by name         |
| GET    | `/api/categories/{categoryId}/media`         | Get media belonging to a horror category |
| GET    | `/api/categories/999`                        | Return `404 Not Found`                   |
| GET    | `/api/categories/999/media`                  | Return `404 Not Found`                   |

### Retrieve all horror categories

![Postman response showing all horror categories](images/get-all-categories.png)

### Retrieve horror category by ID

![Postman response showing one horror category](images/get-category-by-id.png)

### Retrieve horror category by name

![Postman response showing horror category by name](images/get-category-by-name.png)

### Retrieve media belonging to a horror category

![Postman response showing media belonging to a horror category](images/filter-media-by-category.png)

### Horror category not found

![Postman response showing horror category not found](images/category-error.png)

### Media belonging to a horror category not found

![Postman response showing 404 when filtering media with a non-existent horror category](images/category-error-2.png)

### Content Warning Endpoints

| Method | Endpoint                                          | Description                                           |
| ------ | ------------------------------------------------- | ----------------------------------------------------- |
| GET    | `/api/content-warnings`                           | Get all content warnings                              |
| GET    | `/api/content-warnings/{warningId}`               | Get a content warning by ID                           |
| GET    | `/api/content-warnings/search?warningName={name}` | Search content warnings by name                       |
| GET    | `/api/content-warnings/{warningId}/exclude-media` | Get media that does not contain the specified warning |
| GET    | `/api/content-warnings/999`                       | Return `404 Not Found`                                |
| GET    | `/api/content-warnings/999/exclude-media`         | Return `404 Not Found`                                |

### Retrieve all content warnings

![Postman response showing all content warnings](images/get-all-conent-warning.png)

### Retrieve content warning by ID

![Postman response showing one content warning](images/get-animal-death-warning.png)

### Retrieve content warning by name

![Postman response showing content warning by name](images/get-warning-by-name.png)

### Exclude Media with Animal Death Warning

![Postman response showing media not belonging to a content warning](images/exclude-media-with-animal-death.png)

### Exclude Media with Blood Warning

![Postman response showing media not belonging to a content warning](images/exclude-media-with-blood.png)

### Content Warning Not Found

![Postman response showing content warning not found](images/content-warning-error.png)

### Exclude Media with Non-existent Content Warning

![Postman response showing a 404 response when excluding a non-existent content warning](images/exclude-content-warning-error.png)

_Requesting excluded media using a content warning ID that does not exist
returns `404 Not Found`._

## 14. Challenges and Solutions

### Media Controller Not Found (404)

During development, the Media API returned a `404 Not Found` response even though
the application started successfully.

After investigation, the issue was traced to the controller file being saved as
`MediaController.Java` rather than `MediaController.java`. Since Maven only
compiles `.java` files, the controller was never compiled or registered by
Spring Boot.

The issue was resolved by renaming the file, recompiling the project, and
verifying that the `MediaController.class` file had been generated successfully.

---

## 15. Future Improvements

The following features are planned after the MVP is complete:

- Integrate the TMDB API to automatically retrieve movie and TV show data.
- Display official poster images rather than placeholder values.
- Add frontend controls for filtering media by horror category.
- Add frontend controls for excluding media by content warning.
- Add personalised horror recommendations.
- Add a discussion/community board for each media title.
- Display upcoming horror movie and TV releases.
- Support multiple application themes.
- Add a favourites list.
- Expand the application to include horror books and games.
