package com.ADavidson.prompt_response;

public class Prompt {
    private int ID;
    private String prompt;

    public Prompt(int id, String prompt) {
        this.ID = id;
        this.prompt = prompt;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }
}
