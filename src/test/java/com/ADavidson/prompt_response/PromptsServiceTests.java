package com.ADavidson.prompt_response;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
class PromptsServiceTests {
    private PromptsService promptsService;

    @Mock
    PromptsRepo promptsRepo;

    @BeforeEach
    void setUp() {
        promptsService = new PromptsService(promptsRepo);
    }

    @Test
    void getPrompts () {
        PromptList promptList = promptsService.getPrompts();
        assertThat(promptList).isNotNull();
    }
}
