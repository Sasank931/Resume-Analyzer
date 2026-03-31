package com.resume.analyzer.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String fileName;
    private String jobRole;
    
    @Column(columnDefinition = "TEXT")
    private String extractedText;
    
    private int score;
    private String readinessLevel;

    @ElementCollection
    private List<String> foundSkills;

    @ElementCollection
    private List<String> missingSkills;

    @ElementCollection
    private List<String> suggestions;

    public Resume() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }
    public String getJobRole() { return jobRole; }
    public void setJobRole(String jobRole) { this.jobRole = jobRole; }
    public String getExtractedText() { return extractedText; }
    public void setExtractedText(String extractedText) { this.extractedText = extractedText; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public String getReadinessLevel() { return readinessLevel; }
    public void setReadinessLevel(String readinessLevel) { this.readinessLevel = readinessLevel; }
    public List<String> getFoundSkills() { return foundSkills; }
    public void setFoundSkills(List<String> foundSkills) { this.foundSkills = foundSkills; }
    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }
    public List<String> getSuggestions() { return suggestions; }
    public void setSuggestions(List<String> suggestions) { this.suggestions = suggestions; }
}
