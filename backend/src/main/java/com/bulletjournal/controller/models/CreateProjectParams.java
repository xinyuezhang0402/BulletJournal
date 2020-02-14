package com.bulletjournal.controller.models;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CreateProjectParams {

    @NotBlank
    @Size(min = 1, max = 100)
    private String name;

    @NotNull
    private ProjectType projectType;

    private String description;

    public CreateProjectParams() {
    }

    public CreateProjectParams(
            @NotBlank @Size(min = 1, max = 100) String name,
            @NotNull ProjectType projectType,
            String description) {
        this.name = name;
        this.projectType = projectType;
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public ProjectType getProjectType() {
        return projectType;
    }

    public void setProjectType(ProjectType projectType) {
        this.projectType = projectType;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
