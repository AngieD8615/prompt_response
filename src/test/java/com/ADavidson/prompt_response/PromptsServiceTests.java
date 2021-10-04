package com.ADavidson.prompt_response;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

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
        List<Prompt> promptList = promptsService.getPrompts();
        assertThat(promptList).isNotNull();
    }
}
