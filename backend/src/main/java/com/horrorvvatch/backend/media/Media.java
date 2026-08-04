package com.horrorvvatch.backend.media;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;


//Creating the entity which represents the media table in the database
@Entity
@Table(name = "media")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long mediaId;

    @Column(name = "tmdb_id", nullable = false)
    private Long tmdbId;

    // Stores whether this media is a movie or TV show
    @Enumerated(EnumType.STRING)
    @Column(name = "media_type", nullable = false)
    private MediaType mediaType;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "summary")
    private String summary;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "poster_path")
    private String posterPath;

    @Column(name = "runtime_minutes")
    private Integer runtimeMinutes;

    @Column(name = "number_of_seasons")
    private Integer numberOfSeasons;

    @Column(name = "number_of_episodes")
    private Integer numberOfEpisodes;

    // Parameterised constructor
    public Media(Long tmdbId, MediaType mediaType, String title, String summary, LocalDate releaseDate, String posterPath, Integer runtimeMinutes, Integer numberOfSeasons, Integer numberOfEpisodes) {
        this.tmdbId = tmdbId;
        this.mediaType = mediaType;
        this.title = title;
        this.summary = summary;
        this.releaseDate = releaseDate;
        this.posterPath = posterPath;
        this.runtimeMinutes = runtimeMinutes;
        this.numberOfSeasons = numberOfSeasons;
        this.numberOfEpisodes = numberOfEpisodes;
    }

    // A default constructor with no parameters
    public Media() {
    }

    // Getters
    public Long getMediaId() {
        return mediaId;
    }

    public Long getTmdbId() {
        return tmdbId;
    }
    
    public MediaType getMediaType() {
        return mediaType;
    }

    public String getTitle() {
        return title;
    }

    public String getSummary() {
        return summary;
    }

    public LocalDate getReleaseDate() {
        return releaseDate;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public Integer getRuntimeMinutes() {
        return runtimeMinutes;
    }
    public Integer getNumberOfSeasons() {
        return numberOfSeasons;
    }

    public Integer getNumberOfEpisodes() {
        return numberOfEpisodes;
    }

}
