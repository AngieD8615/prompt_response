package com.ADavidson.prompt_response;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PromptsServiceTests {

    private PromptsService promptsService;

    @Mock
    PromptsRepo promptsRepo;

    @Mock
    ResponseRepo responseRepo;

    @BeforeEach
    void setUp() {
        promptsService = new PromptsService(promptsRepo, responseRepo);
    }

    @Test
    void getPrompts () {
        // Question: Is this test robust enough?
        // It feels lacking. What else can I assert?
        List<Prompt> returnedPromptList = new ArrayList<>();
        returnedPromptList.add(new Prompt(1,"this is a prompts"));
        returnedPromptList.add(new Prompt(2,"this is another prompts"));

        when(promptsRepo.findAll()).thenReturn(returnedPromptList);

        List<Prompt> promptList = promptsService.getPrompts();
        assertThat(promptList).isEqualTo(returnedPromptList);
    }

    @Test
    void saveResponse () {
        UserResponse response =
                new UserResponse(1, 2, "here's a response");
        when(responseRepo.save(any(UserResponse.class))).thenReturn(response);

        promptsService.saveResponse(response);

        verify(responseRepo).save(response);
    }
}
