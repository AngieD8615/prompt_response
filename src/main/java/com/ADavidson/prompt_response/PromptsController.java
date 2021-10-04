package com.ADavidson.prompt_response;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
