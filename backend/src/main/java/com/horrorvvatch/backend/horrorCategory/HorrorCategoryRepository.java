package com.horrorvvatch.backend.horrorCategory;

import java.util.List;

import org.springframework.data.repository.ListCrudRepository;

public interface HorrorCategoryRepository extends ListCrudRepository<HorrorCategory, Integer> {
    public List<HorrorCategory> findByCategoryNameContainingIgnoreCase(String categoryName);
    
}
