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


//Controller is the API/web layer. It receives HTTP request, and calls service to perform actions and returns the respones
@RestController
@RequestMapping("/api/media")
public class MediaController {

    private final MediaService mediaService;

    public MediaController(MediaService mediaService) {
        this.mediaService = mediaService;
    }

    @GetMapping
    public List<Media> getAllMedia() {
        return mediaService.getAllMedia();
    }

    @GetMapping("/{mediaId}")
    public Media getMediaId(@PathVariable Integer mediaId) {
        try {
            return mediaService.getMediaId(mediaId);
        } catch (NoSuchElementException exception) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Media not found", exception);
            }
    }

    @GetMapping("/search")
    public List<Media> getMediaTitle(@RequestParam String title) {
        return mediaService.getMediaTitle(title);
    }

        

}