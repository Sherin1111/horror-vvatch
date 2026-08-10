package com.horrorvvatch.backend.media;

import java.util.List;
import org.springframework.data.repository.ListCrudRepository;


// Repository is the database access layer an it allows ready-made methods like findAll() etc.. 
// Spring Data creates the actual implementation
public interface MediaRepository extends ListCrudRepository<Media, Integer>{
    
    //Finds media by title
    public List<Media> findByTitleContainingIgnoreCase(String title);
}
