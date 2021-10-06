package com.ADavidson.prompt_response;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PromptsService {

    PromptsRepo promptsRepo;
    ResponseRepo responseRepo;

    public PromptsService(PromptsRepo promptsRepo, ResponseRepo responseRepo) {
        this.responseRepo = responseRepo;
        this.promptsRepo = promptsRepo;
    }

    public List<Prompt> getPrompts() {
        return promptsRepo.findAll();
    }

    public void saveResponse(UserResponse response) {
        responseRepo.save(response);
    }
}
