package com.horrorvvatch.backend.watchlistEntry;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.ListCrudRepository;

import com.horrorvvatch.backend.media.Media;
import com.horrorvvatch.backend.user.User;

public interface WatchlistEntryRepository extends ListCrudRepository<WatchlistEntry, Integer> {

    
    List<WatchlistEntry> findAllByUserOrderByDateAddedDesc(User user);

  
    Optional<WatchlistEntry> findByUserAndMedia(User user, Media media);


}
