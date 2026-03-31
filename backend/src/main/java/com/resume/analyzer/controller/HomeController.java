package com.resume.analyzer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, String> getStatus() {
        Map<String, String> status = new HashMap<>();
        status.put("status", "success");
        status.put("message", "Resume Analyzer Backend is Running Successfully");
        status.put("version", "1.0.0");
        return status;
    }
}
