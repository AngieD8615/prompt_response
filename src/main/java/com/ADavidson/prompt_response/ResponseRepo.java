package com.ADavidson.prompt_response;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ResponseRepo extends JpaRepository <UserResponse, Integer> {
}
