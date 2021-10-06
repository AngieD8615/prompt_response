package com.ADavidson.prompt_response;

import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class UserResponse {
    @Id
    int id;
    int prompt_id;
    String response;

    public UserResponse() {}

    public UserResponse(int id, int prompt_id, String response) {
        this.id = id;
        this.prompt_id = prompt_id;
        this.response = response;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPrompt_id() {
        return prompt_id;
    }

    public void setPrompt_id(int prompt_id) {
        this.prompt_id = prompt_id;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }
}
