package com.horrorvvatch.backend.user;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

//Creating the entity which represents the users table in the database
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "created_at", nullable = false, insertable = false, updatable = false)
    private LocalDateTime createdAt;
    

    // Parameterised constructor
    public User(String username, String firstName, String lastName, String email, String passwordHash) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.passwordHash = passwordHash;
    }

     // A default constructor with no parameters
     public User() {

     }

     // Getters and setters

     // Gets userId
     public Integer getUserId() {
        return userId;
     }

     // Gets username
     public String getUsername() {
        return username;
    }

    // Sets username
    public void setUsername( String username) {
        this.username = username;
    }

    // Gets firstName
    public String getFirstName() {
        return firstName;
    }

    // Sets firstName
    public void setFirstName( String firstName) {
        this.firstName = firstName;
    }

     // Gets lastName
    public String getLastName() {
        return lastName;
    }

    // Sets lastName
    public void setLastName( String lastName) {
        this.lastName = lastName;
    }

     // Gets email
    public String getEmail() {
        return email;
    }

    // Sets email
    public void setEmail( String email) {
        this.email = email;
    }

     // Gets password hash
    public String getPasswordHash() {
        return passwordHash;
    }

    // Sets password hash
    public void setPasswordHash( String passwordHash) {
        this.passwordHash = passwordHash;
    }

    // Gets time and date
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    

}
