package com.horrorvvatch.backend.media;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    // Gets all media (movies and TV shows)
    @GetMapping
    public List<Media> getAllMedia() {
        return mediaService.getAllMedia();
    }

    //Gets media by ID 
    @GetMapping("/{mediaId}")
    public Media getMediaId(@PathVariable Integer mediaId) {
        try {
            return mediaService.getMediaId(mediaId);
        } catch (NoSuchElementException exception) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Media not found", exception);
            }
    }

    //Gets media by title
    @GetMapping("/search")
    public List<Media> getMediaTitle(@RequestParam String title) {
        return mediaService.getMediaTitle(title);
    }    

}