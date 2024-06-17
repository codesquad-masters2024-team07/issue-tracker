package codesquad.issuetracker.user.auth;

import codesquad.issuetracker.exception.TokenExpiredException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final Long accessExpiration;

    public JwtTokenProvider(@Value("${jwt.secret-key}") String secretString) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64URL.decode(secretString));
        accessExpiration = 3600000L;
    }

    public String createAccessToken(String userId) {
        Date date = new Date();

        return Jwts.builder()
            .subject(userId)
            .signWith(secretKey)
            .issuedAt(date)
            .expiration(new Date(date.getTime() + accessExpiration))
            .compact();
    }

    public void validateToken(String jws) {
        Claims claims = extractAllClaims(jws);
        if (claims.getExpiration() != null) {
            validateTokenExpiration(claims.getExpiration());
        }
    }

    public Claims extractAllClaims(String jws) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(jws).getPayload();
    }

    public String extractUsername(String jws) {
        return extractAllClaims(jws).getSubject();
    }

    public void validateTokenExpiration(Date tokenExpiration) {
        if (tokenExpiration.before(new Date())) {
            throw new TokenExpiredException();
        }
    }

}
