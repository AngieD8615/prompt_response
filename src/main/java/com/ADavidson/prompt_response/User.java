package com.ADavidson.prompt_response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User {
    @Id
    private int user_id;
    private String username;
    private @JsonIgnore String password;
    private Role role;
    // enabled has the value of true = 1 or false = 0
    private int enabled;

//    private ArrayList<UserResponse> userResponses = new ArrayList<UserResponse>();

    public User() {}

    public User(int user_id, String username, String password, Role role, int enabled) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
        this.role = role;
        this.enabled = enabled;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }

//    public ArrayList getUserResponses() {
//        return userResponses;
//    }
//
//    public void setUserResponses(ArrayList userResponses) {
//        this.userResponses = userResponses;
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return user_id == user.user_id && enabled == user.enabled && username.equals(user.username) && password.equals(user.password) && role == user.role;
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id, username, password, role, enabled);
    }

    @Override
    public String toString() {
        return "User{" +
                "user_id=" + user_id +
                ", username='" + username + '\'' +
                ", role=" + role +
                ", enabled=" + enabled +
                '}';
    }
}

