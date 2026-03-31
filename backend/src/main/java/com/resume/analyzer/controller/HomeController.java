package com.resume.analyzer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public Map<String, Object> getStatus() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "online");
        status.put("message", "Resume Analyzer Backend is Running Successfully");
        status.put("version", "1.0.2");
        status.put("active_endpoints", Arrays.asList(
            "/ (GET) - Status",
            "/api/process-resume (POST) - Analyze Resume",
            "/api/analyze (POST) - Analyze Resume (Legacy)"
        ));
        return status;
    }
}
