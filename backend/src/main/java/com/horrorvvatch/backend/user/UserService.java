package com.horrorvvatch.backend.user;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Finds all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Find users by id
    public User getUserById(Integer userId) {
        return userRepository.findById(userId)
        .orElseThrow(() -> new NoSuchElementException("No user with id: " + userId));
    }

    // Find users by username
    public List<User> searchUserByUsername(String username) {
        return userRepository.findByUsernameContainingIgnoreCase(username);
    }

    // Find user by email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
        .orElseThrow(() -> new NoSuchElementException("No user with email: " + email));
    }

    //create user
    public User addUser(User newUser) {
        if (newUser.getPasswordHash() == null 
            || newUser.getPasswordHash().isBlank()) {
        throw new IllegalArgumentException("Password is required");
        } 
        return userRepository.save(newUser);
    }

    //update user
    public User updateUser(Integer userId, User updatedUser) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (updatedUser.getEmail() != null) {
                user.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getUsername() != null) {
                user.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getFirstName() != null) {
                user.setFirstName(updatedUser.getFirstName());
            }
            if (updatedUser.getLastName() != null) {
                user.setLastName(updatedUser.getLastName());
            }

            return userRepository.save(user);
        } else {
            throw new NoSuchElementException("No user with id: " + userId);
        }
    }

    //Delete user by id
    public void deleteUser(Integer userId) {
        getUserById(userId);
        userRepository.deleteById(userId);
    }

}
