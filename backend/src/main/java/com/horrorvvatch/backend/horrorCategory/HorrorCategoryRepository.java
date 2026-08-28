package com.horrorvvatch.backend.horrorCategory;

import java.util.List;

import org.springframework.data.repository.ListCrudRepository;

public interface HorrorCategoryRepository extends ListCrudRepository<HorrorCategory, Integer> {

    // Finds category by name
    public List<HorrorCategory> findByCategoryNameContainingIgnoreCase(String categoryName);
    
}
