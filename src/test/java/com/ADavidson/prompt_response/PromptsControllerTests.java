package com.ADavidson.prompt_response;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@WebMvcTest(PromptsController.class)
public class PromptsControllerTests {
    @Autowired
    MockMvc mockMvc;

    @MockBean
    PromptsService promptsService;

    ObjectMapper mapper = new ObjectMapper();

    @Test
    void getPrompts_returnsListOfPrompts() throws Exception {

        List<Prompt> promptList = new ArrayList<>();
        promptList.add(new Prompt(1, "hello world"));
        promptList.add(new Prompt(2, "hello world... again"));
        when(promptsService.getPrompts()).thenReturn(promptList);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/prompts"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$", hasSize(2)));
    }
    // TODO: getPrompts when the none exist

    @Test
    void saveResponse_givenValidRequestBody_returnResponse() throws Exception {
        UserResponse userResponse = new UserResponse(1, 3, "this is a response");

        mockMvc.perform(MockMvcRequestBuilders.post("/api/responses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(userResponse)))
                .andExpect(MockMvcResultMatchers.status().isOk());
        verify(promptsService).saveResponse(userResponse);
    }
}
