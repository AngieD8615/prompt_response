package com.ADavidson.prompt_response;

import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "responses")
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

    @Override
    public String toString() {
        return "UserResponse{" +
                "id=" + id +
                ", prompt_id=" + prompt_id +
                ", response='" + response + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserResponse that = (UserResponse) o;
        return id == that.id && prompt_id == that.prompt_id && Objects.equals(response, that.response);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, prompt_id, response);
    }
}
