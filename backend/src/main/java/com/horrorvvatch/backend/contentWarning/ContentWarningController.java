package com.horrorvvatch.backend.contentWarning;

import java.util.List;
import java.util.Set;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.horrorvvatch.backend.media.Media;

import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/api/content-warnings")
public class ContentWarningController {

    private final ContentWarningService contentWarningService;

    public ContentWarningController(ContentWarningService contentWarningService) {
        this.contentWarningService = contentWarningService;
    }

    // Gets all content warnings
    @GetMapping
    public List<ContentWarning> getAllContentWarnings() {
        return contentWarningService.getAllContentWarnings();
    }

     // Gets content warning by ID
    @GetMapping("/{warningId}")
    public ContentWarning getContentWarningById(@PathVariable Integer warningId) {
       
            return contentWarningService.getContentWarningById(warningId);

    }
    
    // Gets content warning by name
    @GetMapping("/search")
    public List<ContentWarning> getContentWarningByName(@RequestParam String warningName) {
        return contentWarningService.getContentWarningByName(warningName);
    }
    
    // Gets media without a specific content warning
    @GetMapping("/{warningId}/exclude-media")
    public Set<Media> getMediaWithoutWarning(@PathVariable Integer warningId) {
     
            return contentWarningService.getMediaWithoutWarning(warningId);
    }
    
}
