package codesquad.issuetracker.exception;

import static codesquad.issuetracker.exception.ErrorCode.NOT_FOUND;
import static codesquad.issuetracker.exception.ErrorCode.OAUTH_FAILED;
import static codesquad.issuetracker.exception.ErrorCode.PASSWORD_MISMATCH;
import static codesquad.issuetracker.exception.ErrorCode.TOKEN_EXPIRED;
import static codesquad.issuetracker.exception.ErrorCode.TOKEN_INVALID;
import static codesquad.issuetracker.exception.ErrorCode.USER_ALREADY_EXIST;

import java.security.SignatureException;
import java.util.NoSuchElementException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<?> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.internalServerError().body(e.getMessage());
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNoSuchElementException(NoSuchElementException e) {
        return ResponseEntity.status(NOT_FOUND.getStatus()).body(NOT_FOUND.getMessage());
    }

    @ExceptionHandler(UserAlreadyExist.class)
    public ResponseEntity<String> handleUserAlreadyExist() {
        return ResponseEntity.status(USER_ALREADY_EXIST.getStatus()).body(USER_ALREADY_EXIST.getMessage());
    }

    @ExceptionHandler(PasswordMismatch.class)
    public ResponseEntity<String> handlePasswordDoesNotMatch() {
        return ResponseEntity.status(PASSWORD_MISMATCH.getStatus()).body(PASSWORD_MISMATCH.getMessage());
    }

    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<String> handleSignatureException() {
        return ResponseEntity.status(TOKEN_INVALID.getStatus()).body(TOKEN_INVALID.getMessage());
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<String> handleTokenExpiredException() {
        return ResponseEntity.status(TOKEN_EXPIRED.getStatus()).body(TOKEN_EXPIRED.getMessage());
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<String> handleUnauthorizedException() {
        return ResponseEntity.status(OAUTH_FAILED.getStatus()).body(OAUTH_FAILED.getMessage());
    }

}

