package com.horrorvvatch.backend.watchlistEntry;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.horrorvvatch.backend.media.Media;
import com.horrorvvatch.backend.media.MediaService;
import com.horrorvvatch.backend.user.User;
import com.horrorvvatch.backend.user.UserService;

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



@RestController
@RequestMapping("/api/watchlist")
public class WatchlistEntryController {

    private final WatchlistEntryService watchlistEntryService;
    private final MediaService mediaService;
    private final UserService  userService;

    public WatchlistEntryController(WatchlistEntryService watchlistEntryService, MediaService mediaService, UserService  userService) {
        this.watchlistEntryService = watchlistEntryService;
        this.mediaService = mediaService;
        this.userService = userService;
    }
    

    //Get watchlist entry by id
    @GetMapping("/{watchlistEntryId}")
    public WatchlistEntry getWatchlistEntryById(@PathVariable Integer watchlistEntryId) {
        try {
            return watchlistEntryService.getWatchlistEntryById(watchlistEntryId);  
        } catch (NoSuchElementException exception) {
           throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Watchlist entry not found", exception);
        }
    }

    //get all watchlist entries
    @GetMapping("/users/{userId}")
    public List<WatchlistEntry> getWatchlistEntries(@PathVariable Integer userId) { 
        User user = userService.getUserById(userId);
        return watchlistEntryService.getWatchlistEntries(user);
    }

    //Add media to watchlist 
    @PostMapping("/users/{userId}/media/{mediaId}")
    public ResponseEntity<WatchlistEntry> addMediaToWatchlistEntry(@PathVariable Integer userId, @PathVariable Integer mediaId) {
        try {
            User user = userService.getUserById(userId);
            Media media = mediaService.getMediaId(mediaId);
            
            WatchlistEntry entry = watchlistEntryService.addMediaToWatchlistEntry(user, media);
            return ResponseEntity.status(HttpStatus.CREATED).body(entry);  
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage(), exception);
        }
    }
    
    // Update scare rating 
    @PutMapping("/{watchlistEntryId}/scare-rating")
    public ResponseEntity<WatchlistEntry> updateScareRating(@PathVariable Integer watchlistEntryId, @RequestBody Integer newScareRating) {
        try {
            return ResponseEntity.ok(watchlistEntryService.updateScareRating(watchlistEntryId, newScareRating));
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage(), exception);
        }  
    }
    
    // Update watch status
    @PutMapping("/{watchlistEntryId}/status")
    public ResponseEntity<WatchlistEntry> updateWatchStatus(@PathVariable Integer watchlistEntryId, @RequestBody WatchStatus newStatus)  {
        try {
            return ResponseEntity.ok(watchlistEntryService.updateWatchStatus(watchlistEntryId, newStatus));
        } catch (IllegalArgumentException exception) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, exception.getMessage(), exception);
        }
    }

    // Delete entry
    @DeleteMapping("/{watchlistEntryId}")
    public ResponseEntity<Void> deleteWatchlistEntryById(@PathVariable Integer watchlistEntryId) {
        try {
            watchlistEntryService.deleteWatchlistEntryById(watchlistEntryId);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found");
        }
    }
}
