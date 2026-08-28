package com.horrorvvatch.backend.contentWarning;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.horrorvvatch.backend.media.Media;
import com.horrorvvatch.backend.media.MediaRepository;

@Service
public class ContentWarningService {
    
    private final ContentWarningRepository contentWarningRepository;
    private final MediaRepository mediaRepository;

    public ContentWarningService(ContentWarningRepository contentWarningRepository, MediaRepository mediaRepository) {
        this.contentWarningRepository = contentWarningRepository;
        this.mediaRepository = mediaRepository;
    }

    // Gets all content warnings
    public List<ContentWarning> getAllContentWarnings() {
        return contentWarningRepository.findAll();
    }

    // Gets content warning by ID
    public ContentWarning getContentWarningById(Integer warningId) {
        return contentWarningRepository.findById(warningId)
        .orElseThrow(() -> new NoSuchElementException("No content warning with id: " + warningId));
    }

    // Gets content warning by name
    public List<ContentWarning> getContentWarningByName(String warningName) {
        return contentWarningRepository.findByWarningNameContainingIgnoreCase(warningName);
    }

    // Gets media without a specific content warning
    public Set<Media> getMediaWithoutWarning(Integer warningId) {
        ContentWarning warning = getContentWarningById(warningId);
        Set<Media> mediaWithWarning = warning.getMedia();
        
        return mediaRepository.findAll().stream()
            .filter(m -> !mediaWithWarning.contains(m))
            .collect(Collectors.toSet());
    }

}
