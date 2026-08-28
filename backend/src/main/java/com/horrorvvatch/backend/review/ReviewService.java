package com.horrorvvatch.backend.review;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.horrorvvatch.backend.media.Media;
import com.horrorvvatch.backend.user.User;

@Service
public class ReviewService {
    
    private final ReviewRepository reviewRepository;

    public ReviewService( ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    } 

    // Gets review by ID
    public Review getReviewById(Integer reviewId) {
        return reviewRepository.findById(reviewId)
        .orElseThrow(() -> new NoSuchElementException("Review not found"));
    }

    // Gets all reviews for a specific media
    public List<Review> getAllReviews(Media media) {
        return reviewRepository.findAllByMediaOrderByCreatedAtDesc(media);
    }

    // Adds a review for a specific media
    public Review addReviewToMedia(User user, Media media, String reviewText) {
        if(reviewText == null || reviewText.isBlank()) {
            throw new IllegalArgumentException("Review cannot be empty"); 
        }

        if (reviewRepository.findByUserAndMedia(user, media).isPresent()) {
            throw new IllegalArgumentException("This movie or TV show has a review from this user");
        }
        Review review = new Review(user, media, reviewText);
        return reviewRepository.save(review); 
    }

    // Updates existing review
    public Review updateReview(Integer reviewId, String updatedReviewText) {
       Review review = reviewRepository.findById(reviewId)
       .orElseThrow(() -> new NoSuchElementException("No review with id: " + reviewId));

       if (updatedReviewText == null || updatedReviewText.isBlank()) {
            throw new IllegalArgumentException("Review cannot be empty") ;
        }
        review.setReviewText(updatedReviewText);
        review.setUpdatedAt(LocalDateTime.now());

        return reviewRepository.save(review);
       
    }

    // Deletes a review
    public void deleteReview(Integer reviewId) {
        getReviewById(reviewId);
        reviewRepository.deleteById(reviewId);
    }

}
