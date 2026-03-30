package com.resume.analyzer.controller;

import com.resume.analyzer.model.Resume;
import com.resume.analyzer.model.User;
import com.resume.analyzer.repository.ResumeRepository;
import com.resume.analyzer.repository.UserRepository;
import com.resume.analyzer.service.PdfReaderService;
import com.resume.analyzer.service.SkillAnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import com.resume.analyzer.payload.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class ResumeController {

    @Autowired
    private PdfReaderService pdfReaderService;

    @Autowired
    private SkillAnalyzerService skillAnalyzerService;

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file, 
                                          @RequestParam("jobRole") String jobRole,
                                          HttpSession session) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Please select a file to upload."));
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.equals("application/pdf")) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Please upload a valid PDF resume."));
        }

        try {
            String extractedText = pdfReaderService.extractTextFromPdf(file);
            List<String> foundSkills = skillAnalyzerService.findFoundSkills(extractedText, jobRole);
            int score = skillAnalyzerService.calculateScorePercentage(foundSkills, jobRole);
            List<String> missingSkills = skillAnalyzerService.findMissingSkills(foundSkills, jobRole);
            String readinessLevel = skillAnalyzerService.determineReadinessLevel(score);
            List<String> suggestions = skillAnalyzerService.generateSuggestions(missingSkills);

            Resume resume = new Resume();
            resume.setFileName(file.getOriginalFilename());
            resume.setJobRole(jobRole);
            resume.setExtractedText(extractedText);
            resume.setScore(score);
            resume.setReadinessLevel(readinessLevel);
            resume.setFoundSkills(foundSkills);
            resume.setMissingSkills(missingSkills);
            resume.setSuggestions(suggestions);

            // Get the current user from session
            User user = (User) session.getAttribute("user");
            if (user != null) {
                // Re-fetch user from repo to ensure it's attached to the persistence context
                User managedUser = userRepository.findById(user.getId()).orElse(null);
                resume.setUser(managedUser);
            }

            Resume savedResume = resumeRepository.save(resume);
            return ResponseEntity.ok(savedResume);

        } catch (IOException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Error reading PDF: " + e.getMessage()));
        }
    }

    @GetMapping("/history")
    public ResponseEntity<?> getUserHistory(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            return ResponseEntity.ok(resumeRepository.findByUser(user));
        }
        return ResponseEntity.status(401).body(new ApiResponse(false, "User not authenticated"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getResumeResult(@PathVariable Long id) {
        return resumeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
