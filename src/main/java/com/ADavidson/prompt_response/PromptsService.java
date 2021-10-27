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

    public List<UserResponse> getResponses(int prompt_id) {
        return responseRepo.findAllByPromptId(prompt_id);
    }

    public void incrementUpVote(int prompt_id, int resp_id) {
        UserResponse response = responseRepo.findByPromptIdAndId(prompt_id, resp_id);
        response.incrementUpVote();
        responseRepo.save(response);
    }

    public void incrementDownVote(int prompt_id, int resp_id) {
        UserResponse response = responseRepo.findByPromptIdAndId(prompt_id, resp_id);
        response.incrementDownVote();
        responseRepo.save(response);
    }
}
