package com.horrorvvatch.backend.watchlistEntry;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.horrorvvatch.backend.media.Media;
import com.horrorvvatch.backend.media.MediaService;
import com.horrorvvatch.backend.user.User;
import com.horrorvvatch.backend.user.UserService;

import java.util.List;

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
    

    // Gets watchlist entry by ID
    @GetMapping("/{watchlistEntryId}")
    public WatchlistEntry getWatchlistEntryById(@PathVariable Integer watchlistEntryId) {
      
            return watchlistEntryService.getWatchlistEntryById(watchlistEntryId);  
    }

    // Gets all media in a user's watchlist
    @GetMapping("/users/{userId}")
    public List<WatchlistEntry> getWatchlistEntries(@PathVariable Integer userId) { 
        User user = userService.getUserById(userId);
        return watchlistEntryService.getWatchlistEntries(user);
    }

    // Adds media to the user's watchlist 
    @PostMapping("/users/{userId}/media/{mediaId}")
    public ResponseEntity<WatchlistEntry> addMediaToWatchlistEntry(@PathVariable Integer userId, @PathVariable Integer mediaId) {
     
            User user = userService.getUserById(userId);
            Media media = mediaService.getMediaId(mediaId);
            
            WatchlistEntry entry = watchlistEntryService.addMediaToWatchlistEntry(user, media);
            return ResponseEntity.status(HttpStatus.CREATED).body(entry);  
    }
    
    // Updates scare rating
    @PutMapping("/{watchlistEntryId}/scare-rating")
    public ResponseEntity<WatchlistEntry> updateScareRating(@PathVariable Integer watchlistEntryId, @RequestBody Integer newScareRating) {
    
            return ResponseEntity.ok(watchlistEntryService.updateScareRating(watchlistEntryId, newScareRating)); 
    }
    
    // Updates watch status
    @PutMapping("/{watchlistEntryId}/status")
    public ResponseEntity<WatchlistEntry> updateWatchStatus(@PathVariable Integer watchlistEntryId, @RequestBody WatchStatus newStatus)  {
    
            return ResponseEntity.ok(watchlistEntryService.updateWatchStatus(watchlistEntryId, newStatus));
    }

    // Deletes entry from user's watchlist
    @DeleteMapping("/{watchlistEntryId}")
    public ResponseEntity<Void> deleteWatchlistEntryById(@PathVariable Integer watchlistEntryId) {
  
            watchlistEntryService.deleteWatchlistEntryById(watchlistEntryId);
            return ResponseEntity.noContent().build();
    }
}
