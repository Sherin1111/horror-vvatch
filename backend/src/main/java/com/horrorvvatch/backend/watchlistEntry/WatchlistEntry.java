package com.horrorvvatch.backend.watchlistEntry;

import java.time.LocalDateTime;

import com.horrorvvatch.backend.media.Media;
import com.horrorvvatch.backend.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table
public class WatchlistEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "watchlist_entry_id")
    private Integer watchlistEntryId;

    // Foreign key to User table
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Foreign key to Media table
    @ManyToOne
    @JoinColumn(name = "media_id", nullable = false)
    private Media media;

    //User chooses between not watched, in progress and watched
    @Enumerated(EnumType.STRING)
    @Column(name = "watch_status", nullable = false)
    private WatchStatus watchStatus;

    @Column(name = "scare_rating", columnDefinition = "TINYINT")
    private Integer scareRating;

    @Column(name = "date_added", nullable = false, updatable = false)
    private LocalDateTime dateAdded;

    @Column(name = "date_completed")
    private LocalDateTime dateCompleted;

    // Parameterised constructor
    public WatchlistEntry(User user, Media media, WatchStatus watchStatus, Integer scareRating) {
        this.user = user;
        this.media = media;
        this.watchStatus = watchStatus;
        this.scareRating = scareRating;
    }

     // A default constructor with no parameters
    public WatchlistEntry() {

    }

    // Getters and Setters
    public Integer getWatchlistEntryId() {
        return watchlistEntryId;
    }

    public User getUser() {
        return user;
    }

     public Media getMedia() {
        return media;
    }

     public WatchStatus getWatchStatus() {
        return watchStatus;
    }

    public void setWatchStatus(WatchStatus watchStatus) {
        this.watchStatus = watchStatus;
    }

    public Integer getScareRating() {
        return scareRating;
    }

    public void setScareRating(Integer scareRating) {
        this.scareRating = scareRating;
    }

    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    @PrePersist
    public void setDateAdded() {
        this.dateAdded = LocalDateTime.now();
    }

    public LocalDateTime getDateCompleted() {
        return dateCompleted;
    }

    public void setDateCompleted(LocalDateTime dateCompleted) {
        this.dateCompleted = dateCompleted;
    }



}
