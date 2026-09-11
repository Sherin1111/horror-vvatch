package com.horrorvvatch.backend.user;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/users")
public class UserController {
    
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Gets all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // Gets users by id
    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Integer userId) {
       
            return userService.getUserById(userId);
    }

     // Gets user by username
    @GetMapping("/search")
    public List<User> searchUserByUsername(@RequestParam String username) {
        return userService.searchUserByUsername(username);
    }

    // Gets user by email
    @GetMapping("/by-email")
    public User getUserByEmail(@RequestParam String email) {

            return userService.getUserByEmail(email);
    }
    
    // Creates new user
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
     
            User addedUser = userService.addUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedUser);
    }

    // Login: checks user exists
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginRequest loginRequest) {
        try {
            boolean passwordMatches = userService.checkPassword(
            loginRequest.getEmail(), 
            loginRequest.getPassword()
        );
        if (passwordMatches) {
            User user = userService.getUserByEmail(loginRequest.getEmail());
            return ResponseEntity.ok(user);
        }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    // Updates user
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Integer userId, @RequestBody User user) {
       
            return ResponseEntity.ok(userService.updateUser(userId, user));
    }

    //Deletes user by id
    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userId) {
       
            userService.deleteUser(userId);
            return ResponseEntity.noContent().build();
    }

}
