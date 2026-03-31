package com.resume.analyzer.controller;

import com.resume.analyzer.service.PdfReaderService;
import com.resume.analyzer.service.SkillAnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.resume.analyzer.model.Resume;
import com.resume.analyzer.repository.ResumeRepository;

@RestController
public class AnalyzeController {

    @Autowired
    private PdfReaderService pdfReaderService;

    @Autowired
    private SkillAnalyzerService skillAnalyzerService;

    @Autowired
    private ResumeRepository resumeRepository;

    @GetMapping({"/api/process-resume", "/api/analyze"})
    public ResponseEntity<String> testAnalyzeGet() {
        return ResponseEntity.ok("Resume processing endpoint is live! Use POST method to analyze. (Current path: /api/process-resume)");
    }

    @PostMapping({"/api/process-resume", "/api/analyze"})
    public ResponseEntity<?> analyzeResume(@RequestParam(value = "file", required = false) MultipartFile file, 
                                          @RequestParam(value = "jobRole", required = false) String jobRole) {
        
        System.out.println("--- Analysis Request Start ---");
        System.out.println("Method: POST");
        System.out.println("File received: " + (file != null ? file.getOriginalFilename() : "null"));
        System.out.println("Job role received: " + jobRole);

        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body("No file provided. Please select a resume to upload.");
        }
        
        if (jobRole == null || jobRole.isEmpty()) {
            return ResponseEntity.badRequest().body("No job role selected. Please select a target role.");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.equals("application/pdf")) {
            return ResponseEntity.badRequest().body("Unsupported file type: " + (contentType != null ? contentType : "unknown") + ". Please upload a PDF.");
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

            // Optional: Save to database
            try {
                Resume resume = new Resume();
                resume.setFileName(file.getOriginalFilename());
                resume.setJobRole(jobRole);
                resume.setExtractedText(extractedText);
                resume.setScore(score);
                resume.setReadinessLevel(readiness);
                resume.setFoundSkills(matchedSkills);
                resume.setMissingSkills(missingSkills);
                resume.setSuggestions(suggestions);

                resumeRepository.save(resume);
            } catch (Exception e) {
                System.out.println("Warning: Failed to save resume to database: " + e.getMessage());
            }

            return ResponseEntity.ok(response);

        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Error reading PDF: " + e.getMessage());
        }
    }
}
