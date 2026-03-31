package com.resume.analyzer.service;

import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class SkillAnalyzerService {

    private final Map<String, List<String>> jobSkillsMap = new HashMap<>();

    public SkillAnalyzerService() {
        jobSkillsMap.put("Software Developer", Arrays.asList("Java", "Spring Boot", "MySQL", "Git", "REST API", "Unit Testing", "Microservices"));
        jobSkillsMap.put("Data Scientist", Arrays.asList("Python", "R", "SQL", "Machine Learning", "Statistics", "Pandas", "Scikit-learn"));
        jobSkillsMap.put("Web Developer", Arrays.asList("HTML", "CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB"));
        jobSkillsMap.put("Java Developer", Arrays.asList("Java", "Spring Boot", "Hibernate", "Maven", "JPA", "JUnit", "SQL"));
        jobSkillsMap.put("Python Developer", Arrays.asList("Python", "Django", "Flask", "PostgreSQL", "API", "Pytest", "Git"));
        jobSkillsMap.put("Machine Learning Engineer", Arrays.asList("Python", "TensorFlow", "PyTorch", "MLOps", "Deep Learning", "NLP", "Computer Vision"));
        jobSkillsMap.put("Frontend Developer", Arrays.asList("HTML", "CSS", "JavaScript", "React", "TypeScript", "Redux", "Bootstrap"));
        jobSkillsMap.put("Backend Developer", Arrays.asList("Java", "Spring Boot", "Node.js", "SQL", "Redis", "Docker", "Microservices"));
        jobSkillsMap.put("DevOps Engineer", Arrays.asList("Linux", "Docker", "Kubernetes", "CI/CD", "AWS", "Terraform", "Jenkins"));
        jobSkillsMap.put("Cybersecurity Analyst", Arrays.asList("Networking", "Firewalls", "IDS/IPS", "Ethical Hacking", "SIEM", "Security Compliance", "Vulnerability Assessment"));
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
