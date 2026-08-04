CREATE DATABASE IF NOT EXISTS horror_vvatch;

USE horror_vvatch;

CREATE TABLE users (
user_id INT PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(50) UNIQUE NOT NULL,
first_name VARCHAR(50) NULL,
last_name VARCHAR(50) NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE media (
media_id INT PRIMARY KEY AUTO_INCREMENT,
tmdb_id INT NOT NULL,
media_type ENUM('MOVIE', 'TV_SHOW') NOT NULL,
title VARCHAR(255) NOT NULL,
summary TEXT NULL,
release_date DATE NULL,
poster_path VARCHAR(255) NULL,
runtime_minutes INT NULL,
number_of_seasons INT NULL,
number_of_episodes INT NULL,
UNIQUE(tmdb_id, media_type)
);

CREATE TABLE watchlist_entry (
watchlist_entry_id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
media_id INT NOT NULL,
watch_status ENUM('NOT_WATCHED', 'IN_PROGRESS', 'WATCHED') NOT NULL,
scare_rating TINYINT NULL CHECK(scare_rating BETWEEN 1 AND 5),
date_added DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
date_completed DATETIME NULL,
FOREIGN KEY (user_id)
        REFERENCES users (user_id),
FOREIGN KEY (media_id)
        REFERENCES media (media_id),
UNIQUE(user_id, media_id)
);

CREATE TABLE review (
review_id INT PRIMARY KEY AUTO_INCREMENT,
user_id INT NOT NULL,
media_id INT NOT NULL,
review_text TEXT NOT NULL ,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
updated_at DATETIME NULL,
FOREIGN KEY (user_id)
        REFERENCES users (user_id),
FOREIGN KEY (media_id)
        REFERENCES media (media_id),
UNIQUE(user_id, media_id)
); 

CREATE TABLE horror_category (
category_id INT PRIMARY KEY AUTO_INCREMENT,
category_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE media_horror_category (
media_id INT,
category_id INT,
PRIMARY KEY(media_id, category_id), 
FOREIGN KEY (media_id)
        REFERENCES media (media_id),
FOREIGN KEY (category_id)
        REFERENCES horror_category (category_id)
);

CREATE TABLE content_warning (
warning_id INT PRIMARY KEY AUTO_INCREMENT,
warning_name VARCHAR(100) UNIQUE NOT NULL
); 

CREATE TABLE media_content_warning (
media_id INT,
warning_id INT,
PRIMARY KEY(media_id, warning_id),
FOREIGN KEY (media_id)
        REFERENCES media (media_id),
FOREIGN KEY (warning_id)
        REFERENCES content_warning (warning_id)
);

