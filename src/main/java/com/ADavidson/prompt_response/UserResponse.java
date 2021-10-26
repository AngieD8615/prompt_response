package com.ADavidson.prompt_response;

import javax.annotation.processing.Generated;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Table(name = "responses")
public class UserResponse {
    @Id
    int id;
    int promptId;
    String response;
    int upVotes = 0;
    int downVotes = 0;

    public UserResponse() {
    }

    public UserResponse(int id, int promptId, String response) {
        this.id = id;
        this.promptId = promptId;
        this.response = response;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPromptId() {
        return promptId;
    }

    public void setPromptId(int promptId) {
        this.promptId = promptId;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public int getUpVotes() { return upVotes; }

    public void setUpVotes(int upVotes) { this.upVotes = upVotes; }

    public int getDownVotes() { return downVotes; }

    public void setDownVotes(int downVotes) { this.downVotes = downVotes; }

    @Override
    public String toString() {
        return "UserResponse{" +
                "id=" + id +
                ", promptId=" + promptId +
                ", response='" + response + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserResponse that = (UserResponse) o;
        return id == that.id && promptId == that.promptId && Objects.equals(response, that.response);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, promptId, response);
    }
}
