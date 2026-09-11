package com.horrorvvatch.backend.config;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice 
public class GlobalExceptionHandler {
    
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String>handleNotFound(NoSuchElementException exception) {

        return new ResponseEntity<>("Resource not found", HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public  ResponseEntity<String> handleBadRequest(IllegalArgumentException exception) {


        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    } 
}
