package codesquad.issuetracker.user.dto;

import codesquad.issuetracker.user.User;
import codesquad.issuetracker.user.User.Role;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class UserResponse {

    private final String id;
    private final String username;
    private final LocalDateTime createdAt;
    private final String imgUrl;
    private final Role role;

    public UserResponse(String id, String username, LocalDateTime createdAt, String imgUrl, Role role) {
        this.id = id;
        this.username = username;
        this.createdAt = createdAt;
        this.imgUrl = imgUrl;
        this.role = role;
    }

    public static UserResponse of(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getCreatedAt(), user.getImgUrl(),user.getRole());
    }
}
