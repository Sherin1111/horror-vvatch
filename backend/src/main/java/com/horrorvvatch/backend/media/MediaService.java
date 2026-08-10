package com.horrorvvatch.backend.media;

import java.util.List;
import java.util.NoSuchElementException;
import org.springframework.stereotype.Service;


//Service contains the business logic, the contoller asks it to do things and the service uses the repository to talk to the databse 
@Service
public class MediaService {
    
    private final MediaRepository mediaRepository;
    
    public MediaService(MediaRepository mediaRepository) {
            this.mediaRepository = mediaRepository;
    }

        // Get all media from the database
        public List<Media> getAllMedia() {
            return mediaRepository.findAll();
        }

        //Get media by id 
        public Media getMediaId(Integer mediaId) {
            return mediaRepository.findById(mediaId)
            .orElseThrow(() -> new NoSuchElementException("No Media with id: " + mediaId));
        }

        //Get Media by title
        public List<Media> getMediaTitle(String title) {
            return mediaRepository.findByTitleContainingIgnoreCase(title);
        }

    

}
