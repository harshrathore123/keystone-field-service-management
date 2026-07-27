package com.keystone.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.keystone.response.ApiResponse;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    // Resource Not Found Exception
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleResourceNotFound(
            ResourceNotFoundException ex,
            HttpServletRequest request) {

        ApiResponse<?> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                false,
                ex.getMessage(),
                null);

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Validation Exception (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });

        ApiResponse<Map<String, String>> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                false,
                "Validation Failed",
                errors);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Invalid JSON Exception
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<?>> handleInvalidJson(
            HttpMessageNotReadableException ex,
            HttpServletRequest request) {

        ApiResponse<?> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                false,
                "Invalid request body.",
                null);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Database Constraint Exception
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiResponse<?>> handleDatabaseException(
            DataIntegrityViolationException ex,
            HttpServletRequest request) {

        ApiResponse<?> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.CONFLICT.value(),
                false,
                "Database constraint violation.",
                null);

        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    // Access Denied Exception (403)
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponse<?>> handleAccessDenied(
            AccessDeniedException ex,
            HttpServletRequest request) {

        ApiResponse<?> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.FORBIDDEN.value(),
                false,
                "Access Denied",
                null);

        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

 // Illegal Argument Exception (400)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<?>> handleIllegalArgumentException(
            IllegalArgumentException ex,
            HttpServletRequest request) {

        ApiResponse<?> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.BAD_REQUEST.value(),
                false,
                ex.getMessage(),
                null);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    // Generic Exception
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleException(
            Exception ex,
            HttpServletRequest request) {

        ApiResponse<?> response = new ApiResponse<>(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                false,
                ex.getMessage(),
                null);

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}