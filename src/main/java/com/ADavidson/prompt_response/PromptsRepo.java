package com.ADavidson.prompt_response;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PromptsRepo extends JpaRepository<Prompt, Integer> {

}
