package com.resume.analyzer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HealthController {

    @GetMapping("/")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new LinkedHashMap<>();
        response.put("status", "ok");
        response.put("message", "Resume Analyzer API is running");
        return ResponseEntity.ok(response);
    }
}
