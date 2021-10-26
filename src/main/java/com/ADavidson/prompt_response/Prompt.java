package com.ADavidson.prompt_response;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;

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

    @Override
    public String toString() {
        return "Prompt{" +
                "id=" + id +
                ", prompt='" + prompt + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Prompt prompt1 = (Prompt) o;
        return id == prompt1.id && Objects.equals(prompt, prompt1.prompt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, prompt);
    }
}
