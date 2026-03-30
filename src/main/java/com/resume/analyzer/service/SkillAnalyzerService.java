package com.resume.analyzer.service;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class SkillAnalyzerService {

    private final Map<String, List<String>> jobSkillsMap = new HashMap<>();

    public SkillAnalyzerService() {
        jobSkillsMap.put("Software Developer", Arrays.asList("Java", "Spring Boot", "MySQL", "Git", "REST API"));
        jobSkillsMap.put("Frontend Developer", Arrays.asList("HTML", "CSS", "JavaScript", "React", "Bootstrap"));
        jobSkillsMap.put("Backend Developer", Arrays.asList("Java", "Spring Boot", "Database", "API", "Security"));
        jobSkillsMap.put("Data Analyst", Arrays.asList("Python", "SQL", "Excel", "Power BI", "Statistics"));
        jobSkillsMap.put("DevOps Engineer", Arrays.asList("Linux", "Docker", "CI/CD", "AWS", "Git"));
    }

    public List<String> getRequiredSkills(String jobRole) {
        return jobSkillsMap.getOrDefault(jobRole, new ArrayList<>());
    }

    public List<String> findFoundSkills(String text, String jobRole) {
        List<String> requiredSkills = getRequiredSkills(jobRole);
        List<String> foundSkills = new ArrayList<>();
        String lowerCaseText = text.toLowerCase();
        
        for (String skill : requiredSkills) {
            String regex = "\\b" + Pattern.quote(skill.toLowerCase()) + "\\b";
            if (Pattern.compile(regex).matcher(lowerCaseText).find() || lowerCaseText.contains(skill.toLowerCase())) {
                foundSkills.add(skill);
            }
        }
        return foundSkills;
    }

    public List<String> findMissingSkills(List<String> foundSkills, String jobRole) {
        List<String> requiredSkills = getRequiredSkills(jobRole);
        List<String> missingSkills = new ArrayList<>();
        for (String skill : requiredSkills) {
            if (!foundSkills.contains(skill)) {
                missingSkills.add(skill);
            }
        }
        return missingSkills;
    }

    public int calculateScorePercentage(List<String> foundSkills, String jobRole) {
        List<String> requiredSkills = getRequiredSkills(jobRole);
        if (requiredSkills.isEmpty()) return 0;
        return (int) ((double) foundSkills.size() / requiredSkills.size() * 100);
    }

    public String determineReadinessLevel(int score) {
        if (score < 40) return "Beginner";
        if (score <= 70) return "Intermediate";
        return "Job Ready";
    }

    public List<String> generateSuggestions(List<String> missingSkills) {
        List<String> suggestions = new ArrayList<>();
        if (!missingSkills.isEmpty()) {
            suggestions.addAll(missingSkills);
        }
        return suggestions;
    }
}
