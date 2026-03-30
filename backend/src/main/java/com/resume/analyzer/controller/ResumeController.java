package com.resume.analyzer.controller;

import com.resume.analyzer.model.Resume;
import com.resume.analyzer.repository.ResumeRepository;
import com.resume.analyzer.service.PdfReaderService;
import com.resume.analyzer.service.SkillAnalyzerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/resume")
public class ResumeController {

    @Autowired
    private PdfReaderService pdfReaderService;

    @Autowired
    private SkillAnalyzerService skillAnalyzerService;

    @Autowired
    private ResumeRepository resumeRepository;

    @GetMapping
    public String resumeRoot() {
        return "redirect:/";
    }

    @PostMapping("/upload")
    public String uploadResume(@RequestParam("file") MultipartFile file, 
                             @RequestParam("jobRole") String jobRole,
                             RedirectAttributes redirectAttributes) {
        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Please select a file to upload.");
            return "redirect:/";
        }

        // Check if the file is a PDF
        String contentType = file.getContentType();
        if (contentType == null || !contentType.equals("application/pdf")) {
            redirectAttributes.addFlashAttribute("error", "Please upload a valid PDF resume.");
            return "redirect:/";
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

            Resume savedResume = resumeRepository.save(resume);
            
            redirectAttributes.addFlashAttribute("success", "Resume analyzed successfully.");
            return "redirect:/resume/result/" + savedResume.getId();

        } catch (IOException e) {
            redirectAttributes.addFlashAttribute("error", "Error reading PDF: " + e.getMessage());
            return "redirect:/";
        }
    }

    @GetMapping("/result/{id}")
    public String showResult(@PathVariable Long id, Model model) {
        Resume resume = resumeRepository.findById(id).orElseThrow(() -> new RuntimeException("Resume not found"));
        model.addAttribute("resume", resume);
        return "result";
    }
}
