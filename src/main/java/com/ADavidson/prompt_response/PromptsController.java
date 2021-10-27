package com.ADavidson.prompt_response;

import org.apache.catalina.connector.Response;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PromptsController {
    PromptsService promptsService;
    public PromptsController(PromptsService promptsService) {
        this.promptsService = promptsService;
    }

    @GetMapping("/api/prompts")
    public List<Prompt> getPrompts() {
        return promptsService.getPrompts();
    }

    @PostMapping("/api/responses")
    public void saveResponse(@RequestBody UserResponse response) throws InterruptedException {
        promptsService.saveResponse(response);
    }

    @GetMapping("/api/prompts/{id}/responses")
    public  List<UserResponse> getResponsesForPrompt(@PathVariable("id") int prompt_id) {
        return promptsService.getResponses(prompt_id);
    }

    @PatchMapping("/api/prompts/{promptId}/responses/{respId}/up")
    public void incrementUpVote (@PathVariable("promptId") int prompt_id,
                                 @PathVariable("respId") int resp_id) {
        promptsService.incrementUpVote(prompt_id, resp_id);
    }
    @PatchMapping("/api/prompts/{promptId}/responses/{respId}/down")
    public void incrementDownVote (@PathVariable("promptId") int prompt_id,
                                 @PathVariable("respId") int resp_id) {
        promptsService.incrementDownVote(prompt_id, resp_id);
    }
}
