package codesquad.issuetracker.OAuth;

import codesquad.issuetracker.user.dto.SimpleUserResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class ProfileMapper {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public SimpleUserResponse convertToUserResponse(String profile) {
        try {
            Map<String, String> map = objectMapper.readValue(profile, Map.class);
            return new SimpleUserResponse(map.get("email"), map.get("picture"));
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

}
