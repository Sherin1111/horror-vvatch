package com.horrorvvatch.backend.horrorCategory;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.horrorvvatch.backend.media.Media;

@Service
public class HorrorCategoryService {

    private final HorrorCategoryRepository horrorCategoryRepository;

    public HorrorCategoryService(HorrorCategoryRepository horrorCategoryRepository) {
        this.horrorCategoryRepository = horrorCategoryRepository;
    }

    //Get all horror categories 
    public List<HorrorCategory> getAllHorrorCategories() {
        return horrorCategoryRepository.findAll();
    }

    //Get horror category by id
    public HorrorCategory getCategoryById(Integer categoryId) {
        return horrorCategoryRepository.findById(categoryId)
        .orElseThrow(() -> new NoSuchElementException("No horror category with id: " + categoryId));    
    }
    
    //Get Horror category by category name
    public List<HorrorCategory> getHorrorByCategoryName(String categoryName) {
        return horrorCategoryRepository.findByCategoryNameContainingIgnoreCase(categoryName);
    }

    //Get media by category 
    public Set<Media> getMediaByCategory(Integer categoryId) {
        HorrorCategory category = getCategoryById(categoryId);
        return category.getMediaTitles();
    }


}
