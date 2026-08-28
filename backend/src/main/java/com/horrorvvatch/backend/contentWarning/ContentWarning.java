package com.horrorvvatch.backend.contentWarning;

import java.util.Set;

import com.horrorvvatch.backend.media.Media;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "content_warning")
public class ContentWarning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warning_id")
    private Integer warningId;

    @Column(name ="warning_name", nullable = false, unique = true)
    private String warningName;

    //Relationship to media enitiy
    @ManyToMany(mappedBy = "contentWarnings") 
    Set<Media> media;

    // Parameterised constructor
    public ContentWarning(String warningName) {
        this.warningName = warningName;
    }

    // A default constructor with no parameters
    public ContentWarning() {
    }

    // Gets content warning by ID
    public Integer getWarningId() {
        return warningId;
    }

    // Gets content warning by name
    public String getWarningName() {
        return warningName;
    }

    /// Gets media objects
     public Set<Media> getMedia() {
        return media;
    }
}
