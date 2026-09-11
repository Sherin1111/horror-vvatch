package com.horrorvvatch.backend.horrorCategory;

import java.util.List;
import java.util.Set;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.horrorvvatch.backend.media.Media;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/categories")
public class HorrorCategoryController {

    private final HorrorCategoryService horrorCategoryService;

    public HorrorCategoryController(HorrorCategoryService horrorCategoryService) {
        this.horrorCategoryService = horrorCategoryService;
    }

    // Gets all horror categories 
    @GetMapping
    public List<HorrorCategory> getAllHorrorCategories() {
        return horrorCategoryService.getAllHorrorCategories();
    }

    // Gets horror category by ID
    @GetMapping("/{categoryId}")
    public HorrorCategory getCategoryById(@PathVariable Integer categoryId) {
     
            return horrorCategoryService.getCategoryById(categoryId);
    }

    // Gets horror category by name
    @GetMapping("/search")
    public List<HorrorCategory> getHorrorCategoryByName(@RequestParam String categoryName) {

        return horrorCategoryService.getHorrorCategoryByName(categoryName);
    }

    // Gets media by category 
    @GetMapping("/{categoryId}/media")
    public Set<Media> getMediaByCategory(@PathVariable Integer categoryId) {
        
            return horrorCategoryService.getMediaByCategory(categoryId);
    }
    
}
