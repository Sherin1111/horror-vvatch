package com.horrorvvatch.backend.contentWarning;

import java.util.List;

import org.springframework.data.repository.ListCrudRepository;

public interface ContentWarningRepository extends ListCrudRepository<ContentWarning, Integer> {

    // Finds content warnings by name
        public List<ContentWarning> findByWarningNameContainingIgnoreCase(String warningName);

}
