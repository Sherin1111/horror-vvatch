package com.horrorvvatch.backend.horrorCategory;

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
@Table(name = "horror_category")
public class HorrorCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "category_name", nullable = false, unique = true)
    private String categoryName; 

    //Relationship to Media entity
    @ManyToMany(mappedBy ="horrorCategories")
    Set<Media> mediaTitles;

    // Parameterised constructor
    public HorrorCategory(String categoryName) {
        this.categoryName = categoryName;
    }

    // A default constructor with no parameters
    public HorrorCategory() {
    }

    //Getter to return horror category by id
    public Integer getCategoryId() {
        return categoryId; 
    }

    //Getter to return horror category by name
    public String getCategoryName() {
        return categoryName;
    }

    //Getter to filter media using horror category
    public Set<Media> getMediaTitles() {
        return mediaTitles;
    }
}
