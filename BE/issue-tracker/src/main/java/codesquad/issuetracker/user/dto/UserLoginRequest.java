package codesquad.issuetracker.user.dto;

import lombok.Getter;

@Getter
public class UserLoginRequest {

    private final String id;
    private final String password;

    public UserLoginRequest(String id, String password) {
        this.id = id;
        this.password = password;
    }
}
