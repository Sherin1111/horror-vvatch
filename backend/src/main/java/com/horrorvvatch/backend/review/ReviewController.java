package com.horrorvvatch.backend.review;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.horrorvvatch.backend.media.Media;
import com.horrorvvatch.backend.media.MediaService;
import com.horrorvvatch.backend.user.User;
import com.horrorvvatch.backend.user.UserService;

@RestController
@RequestMapping("/api/review")
public class ReviewController {
    
    private final ReviewService reviewService;
    private final MediaService mediaService;
    private final UserService userService;

    public ReviewController(ReviewService reviewService, MediaService mediaService, UserService userService) {
        this.reviewService = reviewService;
        this.mediaService = mediaService;
        this.userService = userService;
    }

    // Get review by id
    @GetMapping("/{reviewId}")
    public Review getReviewById(@PathVariable Integer reviewId) {
        try {
            return reviewService.getReviewById(reviewId);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found");
        }
    }

    // Get all reviews 
    @GetMapping("/media/{mediaId}")
    public List<Review> getAllReviews(@PathVariable Integer mediaId) {
        Media media = mediaService.getMediaId(mediaId);
        return reviewService.getAllReviews(media);

    }

    // Add a review for a specific media
    @PostMapping("/users/{userId}/media/{mediaId}")
    public ResponseEntity<Review> addReviewToMedia(@PathVariable Integer userId, @PathVariable Integer mediaId, @RequestBody String reviewText) {
        try {
            User user = userService.getUserById(userId);
            Media media = mediaService.getMediaId(mediaId);
            
            Review review = reviewService.addReviewToMedia(user, media, reviewText);
            return ResponseEntity.status(HttpStatus.CREATED).body(review);
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage(), exception);
            
        }
    }

    // update review
    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Integer reviewId, @RequestBody String updatedReviewText) {
        try {
            return ResponseEntity.ok(reviewService.updateReview(reviewId, updatedReviewText));
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found", exception);
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage(), exception);
        }
    }

    // Delete a review
    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Integer reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Review not found");
        }
    }
}
