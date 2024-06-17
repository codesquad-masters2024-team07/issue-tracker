package codesquad.issuetracker.OAuth;

import codesquad.issuetracker.user.dto.SimpleUserResponse;
import com.github.scribejava.apis.GoogleApi20;
import com.github.scribejava.core.builder.ServiceBuilder;
import com.github.scribejava.core.model.OAuth2AccessToken;
import com.github.scribejava.core.model.OAuthRequest;
import com.github.scribejava.core.model.Response;
import com.github.scribejava.core.model.Verb;
import com.github.scribejava.core.oauth.OAuth20Service;
import java.io.IOException;
import java.util.concurrent.ExecutionException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class GoogleOAuthService {

    private final OAuth20Service service;
    private final ProfileMapper profileMapper;

    public GoogleOAuthService(ProfileMapper profileMapper,
        @Value("${google.client.id}") String clientId,
        @Value("${google.client.secret}") String clientSecret,
        @Value("${google.redirect.uri}") String redirectUri,
        @Value("${google.scope}") String scope) {

        this.profileMapper = profileMapper;
        this.service = new ServiceBuilder(clientId)
            .apiSecret(clientSecret)
            .callback(redirectUri)
            .defaultScope(scope)
            .build(GoogleApi20.instance());
    }

    public String getAuthorizationUrl() {
        return service.getAuthorizationUrl();
    }

    public OAuth2AccessToken getAccessToken(String code)
        throws IOException, ExecutionException, InterruptedException {
        return service.getAccessToken(code);
    }

    public SimpleUserResponse getUserProfile(OAuth2AccessToken accessToken)
        throws IOException, ExecutionException, InterruptedException {
        OAuthRequest request = new OAuthRequest(Verb.GET,
            "https://www.googleapis.com/oauth2/v2/userinfo");
        service.signRequest(accessToken, request);
        Response response = service.execute(request);
        return profileMapper.convertToUserResponse(response.getBody());
    }

}
