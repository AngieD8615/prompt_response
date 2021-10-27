package com.ADavidson.prompt_response;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResponseRepo extends JpaRepository <UserResponse, Integer> {

    List<UserResponse> findAllByPromptId(int prompt_id);

    UserResponse findByPromptIdAndId(int prompt_id, int resp_id);
}
