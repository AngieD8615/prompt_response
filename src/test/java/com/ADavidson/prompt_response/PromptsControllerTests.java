package com.ADavidson.prompt_response;

import com.fasterxml.jackson.databind.ObjectMapper;
import liquibase.pro.packaged.U;
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
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

        mockMvc.perform(get("/api/prompts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)));
    }
    // TODO: getPrompts when the none exist
    // TODO: saveResponse with invalid request body
    // TODO: handle get responses with invalid promptId
    // TODO: handle up/down vote with invalid responseId

    @Test
    void saveResponse_givenValidRequestBody_returnResponse() throws Exception {
        UserResponse userResponse = new UserResponse(1, 3, "this is a response");

        mockMvc.perform(post("/api/responses")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(userResponse)))
                .andExpect(status().isOk());
        verify(promptsService).saveResponse(userResponse);
    }

    @Test
    void getListOfResponses_givenValidPromptID () throws Exception {
        List<UserResponse> userResponses = new ArrayList<>();
        userResponses.add(new UserResponse(1, 1, "response 1"));
        userResponses.add(new UserResponse(2, 1, "response 2"));
        userResponses.add(new UserResponse(3, 1, "response 3"));

        when(promptsService.getResponses(anyInt())).thenReturn(userResponses);
        mockMvc.perform(get("/api/prompts/1/responses"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)));
    }

    @Test
    void incrementUpVote () throws Exception {
        mockMvc.perform(patch("/api/prompts/1/responses/1/up"))
                .andExpect(status().isOk());
        verify(promptsService).incrementUpVote(1,1);
    }
    @Test
    void incrementDownVote () throws Exception {
        mockMvc.perform(patch("/api/prompts/1/responses/1/down"))
                .andExpect(status().isOk());
        verify(promptsService).incrementDownVote(1,1);
    }
}
