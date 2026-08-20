package com.horrorvvatch.backend.user;



import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.ListCrudRepository;

public interface UserRepository extends ListCrudRepository<User, Integer> {
    
    // Finds user by username
    public List<User> findByUsernameContainingIgnoreCase(String username);

    // Finds user by email
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);
}
