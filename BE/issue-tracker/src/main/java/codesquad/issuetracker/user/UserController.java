package codesquad.issuetracker.user;

import codesquad.issuetracker.user.dto.LoginResponse;
import codesquad.issuetracker.user.dto.SimpleUserResponse;
import codesquad.issuetracker.user.dto.UserCreateRequest;
import codesquad.issuetracker.user.dto.UserLoginRequest;
import codesquad.issuetracker.user.dto.UserResponse;
import java.net.URI;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> register(@RequestBody UserCreateRequest request) {
        String userId = userService.register(request);
        return ResponseEntity.created(URI.create("/api/users/" + userId)).build();
    }

    @GetMapping("/checkUserId/{userId}")
    public ResponseEntity<?> checkUserIdDuplication(@PathVariable String userId) {
        userService.verifyDuplicateUserId(userId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody UserLoginRequest userLoginRequest) {
        String token = userService.login(userLoginRequest);
        User user = userService.findById(userLoginRequest.getId());

        SimpleUserResponse userResponse = new SimpleUserResponse(user.getId(), user.getImgUrl());
        LoginResponse loginResponse = new LoginResponse(token, userResponse);
        return ResponseEntity.ok().body(loginResponse);
    }

    @GetMapping
    public List<UserResponse> getUsers() {
        return userService.findAllUser();
    }
}
