package com.resume.analyzer.controller;

import com.resume.analyzer.service.PdfReaderService;
import com.resume.analyzer.service.SkillAnalyzerService;
import com.resume.analyzer.payload.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AnalyzeController {

    @Autowired
    private PdfReaderService pdfReaderService;

    @Autowired
    private SkillAnalyzerService skillAnalyzerService;

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeResume(@RequestParam(value = "file", required = false) MultipartFile file, 
                                          @RequestParam(value = "jobRole", required = false) String jobRole) {
        
        System.out.println("File received: " + (file != null ? file.getOriginalFilename() : "null"));
        System.out.println("Job role received: " + jobRole);

        if (file == null || file.isEmpty() || jobRole == null || jobRole.isEmpty()) {
            return ResponseEntity.badRequest().body("File or jobRole missing");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.equals("application/pdf")) {
            return ResponseEntity.badRequest().body("Please upload a valid PDF resume.");
        }

        try {
            String extractedText = pdfReaderService.extractTextFromPdf(file);
            List<String> matchedSkills = skillAnalyzerService.findFoundSkills(extractedText, jobRole);
            int score = skillAnalyzerService.calculateScorePercentage(matchedSkills, jobRole);
            List<String> missingSkills = skillAnalyzerService.findMissingSkills(matchedSkills, jobRole);
            String readiness = score + "%";
            List<String> suggestions = skillAnalyzerService.generateSuggestions(missingSkills);

            Map<String, Object> response = new HashMap<>();
            response.put("score", score);
            response.put("matchedSkills", matchedSkills);
            response.put("missingSkills", missingSkills);
            response.put("suggestions", suggestions);
            response.put("readiness", readiness);

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Error reading PDF: " + e.getMessage()));
        }
    }
}
