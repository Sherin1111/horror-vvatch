package com.horrorvvatch.backend.media;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;


@Service
public class MediaService {
    
    private final MediaRepository mediaRepository;
    
    public MediaService(MediaRepository mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    // Gets all media (movies and TV shows)
    public List<Media> getAllMedia() {
        return mediaRepository.findAll();
    }

    //Gets media by ID 
    public Media getMediaId(Integer mediaId) {
        return mediaRepository.findById(mediaId)
        .orElseThrow(() -> new NoSuchElementException("No Media with id: " + mediaId));
    }

    //Gets media by title
    public List<Media> getMediaTitle(String title) {
        return mediaRepository.findByTitleContainingIgnoreCase(title);
    }

}
