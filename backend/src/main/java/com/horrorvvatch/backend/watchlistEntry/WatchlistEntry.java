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
@Table(name = "watchlist_entry")
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

    //User chooses between NOT-WATCHED, IN-PROGRESS and WATCHED
    @Enumerated(EnumType.STRING)
    @Column(name = "watch_status", nullable = false)
    private WatchStatus watchStatus;

    // Scare rating between 1-5
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

    // Gets user
    public User getUser() {
        return user;
    }

    // Gets media
     public Media getMedia() {
        return media;
    }

    // Gets watch status
     public WatchStatus getWatchStatus() {
        return watchStatus;
    }

    // Sets watch status
    public void setWatchStatus(WatchStatus watchStatus) {
        this.watchStatus = watchStatus;
    }

    //Gets scare rating
    public Integer getScareRating() {
        return scareRating;
    }

    // Sets scare rating
    public void setScareRating(Integer scareRating) {
        this.scareRating = scareRating;
    }

    // Gets time and date
    public LocalDateTime getDateAdded() {
        return dateAdded;
    }

    // Sets time and date
    @PrePersist
    public void setDateAdded() {
        this.dateAdded = LocalDateTime.now();
    }

    // Gets completed date and time
    public LocalDateTime getDateCompleted() {
        return dateCompleted;
    }

    // Sets completed date and time
    public void setDateCompleted(LocalDateTime dateCompleted) {
        this.dateCompleted = dateCompleted;
    }
}
