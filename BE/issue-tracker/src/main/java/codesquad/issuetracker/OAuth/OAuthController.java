package codesquad.issuetracker.OAuth;

import codesquad.issuetracker.exception.UnauthorizedException;
import codesquad.issuetracker.user.User;
import codesquad.issuetracker.user.auth.JwtTokenProvider;
import codesquad.issuetracker.user.dto.SimpleUserResponse;
import com.github.scribejava.core.model.OAuth2AccessToken;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import lombok.extern.slf4j.Slf4j;
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
    public void callback(@RequestParam("code") String code, HttpServletResponse response) {
        try {
            OAuth2AccessToken accessToken = oAuthService.getAccessToken(code);
            SimpleUserResponse userResponse = oAuthService.getUserProfile(accessToken);
            User user = User.builder()
                .id(userResponse.id())
                .imgUrl(userResponse.imgUrl())
                .build();
            String token = jwtTokenProvider.createAccessToken(user);
            response.sendRedirect("http://www.smokingsection.store/?token=" + token);
        } catch (IOException | ExecutionException | InterruptedException e) {
            e.printStackTrace();
            throw new UnauthorizedException();
        }
    }

    @GetMapping("/users")
    public SimpleUserResponse getUser(String token) {
        Claims claims = jwtTokenProvider.extractAllClaims(token);
        String userId = (String) claims.get("userId");
        String imgUrl = (String) claims.get("userImg");
        return SimpleUserResponse.builder()
            .id(userId)
            .imgUrl(imgUrl)
            .build();
    }

}
