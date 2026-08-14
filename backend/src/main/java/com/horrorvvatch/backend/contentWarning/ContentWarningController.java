package com.horrorvvatch.backend.contentWarning;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.horrorvvatch.backend.media.Media;

import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/content-warnings")
public class ContentWarningController {

    private final ContentWarningService contentWarningService;

    public ContentWarningController(ContentWarningService contentWarningService) {
        this.contentWarningService = contentWarningService;
    }

    @GetMapping
    public List<ContentWarning> getAllContentWarnings() {
        return contentWarningService.getAllContentWarnings();
    }

    @GetMapping("/{warningId}")
    public ContentWarning getContentWarningById(@PathVariable Integer warningId) {
        try {
            return contentWarningService.getContentWarningById(warningId);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content warning not found", exception);
        }
    }
    
    @GetMapping("/search")
    public List<ContentWarning> getContentWarningByName(@RequestParam String warningName) {
        return contentWarningService.getContentWarningByName(warningName);
    }
    
    @GetMapping("/{warningId}/exclude-media")
    public Set<Media> getMediaWithoutWarning(@PathVariable Integer warningId) {
        try {
            return contentWarningService.getMediaWithoutWarning(warningId);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Content warning not found", exception);
        }
    }
    
    
}
