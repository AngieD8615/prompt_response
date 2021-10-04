package com.ADavidson.prompt_response;

import org.junit.jupiter.api.Test;
import org.mockito.internal.hamcrest.HamcrestArgumentMatcher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.Mockito.when;

@WebMvcTest(PromptsController.class)
public class PromptsControllerTests {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    PromptsService promptsService;

// GET /api/prompts -> returns a list of the prompts
    @Test
    void getPrompts_returnsListOfPrompts() throws Exception {

        List<Prompt> promptList = new ArrayList<>();
        promptList.add(new Prompt(1, "hello world"));
        promptList.add(new Prompt(2, "hello world... again"));
        when(promptsService.getPrompts()).thenReturn(new PromptList(promptList));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/prompts"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.prompts", hasSize(2)));
    }
}
