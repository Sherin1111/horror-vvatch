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
import org.springframework.web.server.ResponseStatusException;
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

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Integer userId) {
        try {
            return userService.getUserById(userId);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found", exception);
        }
    }

    @GetMapping("/search")
    public List<User> searchUserByUsername(@RequestParam String username) {
        return userService.searchUserByUsername(username);
    }

    @GetMapping("/by-email")
    public User getUserByEmail(@RequestParam String email) {
        try {
            return userService.getUserByEmail(email);
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not Found", e);
        }
    }
    
    
    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        try {
            User addedUser = userService.addUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedUser);
        } catch (IllegalArgumentException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage(), e); 
        } 
     
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody LoginRequest loginRequest) {
        try {
            boolean passwordMatches = userService.checkPassword(
            loginRequest.getEmail(), 
            loginRequest.getPassword()
        );
        if (passwordMatches) {
            return ResponseEntity.ok().build();
        }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Integer userId, @RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.updateUser(userId, user));
        } catch (NoSuchElementException e) {
          throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not updated", e);
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found", e);
        }
    }

}
