package com.ADavidson.prompt_response;

import org.springframework.stereotype.Service;

@Service
public class PromptsService {

    PromptsRepo promptsRepo;

    public PromptsService(PromptsRepo promptsRepo) {
        this.promptsRepo = promptsRepo;
    }

    public PromptList getPrompts() {
        return new PromptList(promptsRepo.findAll());
    }
}
