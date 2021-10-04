package com.ADavidson.prompt_response;

import java.util.ArrayList;
import java.util.List;

public class PromptList {
     public List<Prompt> getPrompts() {
          return prompts;
     }

     public void setPrompts(List<Prompt> prompts) {
          this.prompts = prompts;
     }

     private List<Prompt> prompts;

     public PromptList() {
          this.prompts = new ArrayList<>();
     }
     public PromptList(List<Prompt> prompts) {
          this.prompts = prompts;
     }

}
