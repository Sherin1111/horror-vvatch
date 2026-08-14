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
    Set<Media> mediaTitles;

    // Parameterised constructor
    public ContentWarning(String warningName) {
        this.warningName = warningName;
    }

    // A default constructor with no parameters
    public ContentWarning() {
    }

    //Getter to return content warning by id
    public Integer getWarningId() {
        return warningId;
    }

    //Getter to return content warning by name
    public String getWarningName() {
        return warningName;
    }

    //Getter return media titles from Media
     public Set<Media> getMediaTitles() {
        return mediaTitles;
    }
}
