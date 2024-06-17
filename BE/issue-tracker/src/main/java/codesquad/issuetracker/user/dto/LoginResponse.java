package codesquad.issuetracker.user.dto;

public record LoginResponse (String token, SimpleUserResponse userResponse) {

}
