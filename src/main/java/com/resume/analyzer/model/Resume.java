package com.resume.analyzer.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fileName;

    private String jobRole;

    @Lob
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
}
