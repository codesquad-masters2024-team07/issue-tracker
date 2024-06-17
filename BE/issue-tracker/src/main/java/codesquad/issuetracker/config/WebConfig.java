package codesquad.issuetracker.config;

import codesquad.issuetracker.user.auth.AuthInterceptor;
import codesquad.issuetracker.user.auth.JwtTokenProvider;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final JwtTokenProvider jwtTokenProvider;

    public WebConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthInterceptor(jwtTokenProvider))
            .addPathPatterns("/**")
            .excludePathPatterns("/api/users/**", "/api/OAuth/**");
    }

}
