package codesquad.issuetracker.user.dto;

import codesquad.issuetracker.user.User.Role;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserCreateRequest {

    private final String id;
    private final String username;
    private final String password;
    private final Role role;

    @Builder
    public UserCreateRequest(String id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = Role.USER;
    }

}
