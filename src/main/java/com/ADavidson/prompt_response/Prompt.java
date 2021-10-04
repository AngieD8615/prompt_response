package com.ADavidson.prompt_response;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "prompts")
public class Prompt {

    @Id
    private int id;
    private String prompt;

    public Prompt(int id, String prompt) {
        this.id = id;
        this.prompt = prompt;
    }

    public Prompt() {}

    public int getId() {
        return id;
    }

    public void setId(int ID) {
        this.id = ID;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}
