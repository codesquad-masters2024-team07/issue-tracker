package codesquad.issuetracker.OAuth;

import codesquad.issuetracker.exception.UnauthorizedException;
import codesquad.issuetracker.user.auth.JwtTokenProvider;
import codesquad.issuetracker.user.dto.LoginResponse;
import codesquad.issuetracker.user.dto.SimpleUserResponse;
import com.github.scribejava.core.model.OAuth2AccessToken;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/OAuth")
@Slf4j
public class OAuthController {

    private final GoogleOAuthService oAuthService;
    private final JwtTokenProvider jwtTokenProvider;

    public OAuthController(GoogleOAuthService oAuthService, JwtTokenProvider jwtTokenProvider) {
        this.oAuthService = oAuthService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/login")
    public void login(HttpServletResponse response) throws IOException {
        response.sendRedirect(oAuthService.getAuthorizationUrl());
    }

    @GetMapping("/callback")
    public ResponseEntity<LoginResponse> callback(@RequestParam("code") String code) {
        try {
            OAuth2AccessToken accessToken = oAuthService.getAccessToken(code);
            SimpleUserResponse userResponse = oAuthService.getUserProfile(accessToken);
            String token = jwtTokenProvider.createAccessToken(userResponse.id());
            return ResponseEntity.ok().body(new LoginResponse(token, userResponse));
        } catch (IOException | ExecutionException | InterruptedException e) {
            e.printStackTrace();
            throw new UnauthorizedException();
        }
    }

}
