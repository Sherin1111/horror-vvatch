package com.horrorvvatch.backend.horrorCategory;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.horrorvvatch.backend.media.Media;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/categories")
public class HorrorCategoryController {

    private final HorrorCategoryService horrorCategoryService;

    public HorrorCategoryController(HorrorCategoryService horrorCategoryService) {
        this.horrorCategoryService = horrorCategoryService;
    }

    @GetMapping
    public List<HorrorCategory> getAllHorrorCategories() {
        return horrorCategoryService.getAllHorrorCategories();
    }

    @GetMapping("/{categoryId}")
    public HorrorCategory getCategoryById(@PathVariable Integer categoryId) {
        try {
            return horrorCategoryService.getCategoryById(categoryId);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Horror category not found", exception);
        }
    }

    @GetMapping("/search")
    public List<HorrorCategory> getHorrorByCategoryName(@RequestParam String categoryName) {
        return horrorCategoryService.getHorrorByCategoryName(categoryName);
    }

    @GetMapping("/{categoryId}/media")
    public Set<Media> getMediaByCategory(@PathVariable Integer categoryId) {
        try {
            return horrorCategoryService.getMediaByCategory(categoryId);
        } catch (NoSuchElementException exception) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Horror category not found", exception);
        }
    }
    
}
