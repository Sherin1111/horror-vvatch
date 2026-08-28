package com.horrorvvatch.backend.watchlistEntry;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;

import com.horrorvvatch.backend.media.Media;
import com.horrorvvatch.backend.user.User;

@Service
public class WatchlistEntryService {
    
    private final WatchlistEntryRepository watchlistEntryRepository;

    public WatchlistEntryService( WatchlistEntryRepository watchlistEntryRepository) {
        this.watchlistEntryRepository = watchlistEntryRepository;
    }

    // Gets watchlist entry by ID
    public WatchlistEntry getWatchlistEntryById(Integer watchlistEntryId) {
        return watchlistEntryRepository.findById(watchlistEntryId)
        .orElseThrow(() -> new NoSuchElementException("Watchlist entry not found"));

    }

    // Gets all media in a user's watchlist
    public List<WatchlistEntry> getWatchlistEntries(User user) {
        return watchlistEntryRepository.findAllByUserOrderByDateAddedDesc(user);
    }

    // Adds media to the user's watchlist
    public WatchlistEntry addMediaToWatchlistEntry(User user, Media newMedia) {
        if (watchlistEntryRepository.findByUserAndMedia(user, newMedia).isPresent()) {
            throw new IllegalArgumentException("The movie or TV show is already in this user's watchlist");
        }

        WatchlistEntry entry = new WatchlistEntry(user, newMedia, WatchStatus.NOT_WATCHED, null);
        return watchlistEntryRepository.save(entry);
    }

    // Updates scare rating
    public WatchlistEntry updateScareRating(Integer watchlistEntryId, Integer newScareRating) {
        if (newScareRating < 1 || newScareRating > 5){
            throw new IllegalArgumentException("Scare rating must be between 1 and 5");
        }

        WatchlistEntry entry = getWatchlistEntryById(watchlistEntryId);
        entry.setScareRating(newScareRating);

        return watchlistEntryRepository.save(entry);
    }

    // Updates watch status
    public WatchlistEntry updateWatchStatus(Integer watchlistEntryId, WatchStatus newStatus) {
        WatchlistEntry entry = getWatchlistEntryById(watchlistEntryId);
         entry.setWatchStatus(newStatus);

        if (newStatus == WatchStatus.WATCHED) {
            entry.setDateCompleted(LocalDateTime.now());
        } else {
             entry.setDateCompleted(null);
        }

        return watchlistEntryRepository.save(entry);
    }

    // Deletes entry from user's watchlist
    public void deleteWatchlistEntryById(Integer watchlistEntryId) {
        getWatchlistEntryById(watchlistEntryId);
        watchlistEntryRepository.deleteById(watchlistEntryId);
    }
}
