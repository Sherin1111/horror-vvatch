package com.horrorvvatch.backend.watchlistEntry;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.ListCrudRepository;

import com.horrorvvatch.backend.media.Media;
import com.horrorvvatch.backend.user.User;

public interface WatchlistEntryRepository extends ListCrudRepository<WatchlistEntry, Integer> {

    // Finds all users
    List<WatchlistEntry> findAllByUserOrderByDateAddedDesc(User user);
  
    // Finds user and media
    Optional<WatchlistEntry> findByUserAndMedia(User user, Media media);

}
