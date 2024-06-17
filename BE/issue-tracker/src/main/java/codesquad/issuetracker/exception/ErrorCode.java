package codesquad.issuetracker.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    NOT_FOUND(HttpStatus.NOT_FOUND, "해당 데이터가 존재하지 않습니다."),
    USER_ALREADY_EXIST(HttpStatus.CONFLICT , "이미 존재하는 ID 입니다."),
    PASSWORD_MISMATCH(HttpStatus.UNAUTHORIZED , "비밀번호가 일치하지 않습니다."),
    TOKEN_INVALID(HttpStatus.UNAUTHORIZED , "토큰이 유효하지 않습니다."),
    TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),
    OAUTH_FAILED(HttpStatus.UNAUTHORIZED, "OAuth 인증에 실패했습니다.");

    private final HttpStatus status;
    private final String message;

}
