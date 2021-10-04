package com.ADavidson.prompt_response;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PromptsService {

    PromptsRepo promptsRepo;

    public PromptsService(PromptsRepo promptsRepo) {
        this.promptsRepo = promptsRepo;
    }

    public List<Prompt> getPrompts() {
        return promptsRepo.findAll();
    }
}
