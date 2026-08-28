package com.horrorvvatch.backend.review;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.ListCrudRepository;

import com.horrorvvatch.backend.media.Media;
import com.horrorvvatch.backend.user.User;

public interface ReviewRepository  extends ListCrudRepository<Review, Integer>{

    // Finds all reviews by media
    List<Review> findAllByMediaOrderByCreatedAtDesc(Media media);

    // Finds review by user and media 
    Optional<Review> findByUserAndMedia(User user, Media media);
}
