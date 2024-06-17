package codesquad.issuetracker.user;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import codesquad.issuetracker.exception.UserAlreadyExist;
import codesquad.issuetracker.user.User.Role;
import codesquad.issuetracker.user.dto.UserCreateRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper objectMapper;
    @MockBean
    UserService userService;


    @Test
    @DisplayName("중복된 ID로 회원가입하면 409 Conflict를 반환")
    void register_DuplicateId_Conflict() throws Exception {
        when(userService.register(any())).thenThrow(UserAlreadyExist.class);

        UserCreateRequest userCreateRequest = UserCreateRequest.builder()
            .id("123")
            .password("1234")
            .username("user")
            .build();
        String json = objectMapper.writeValueAsString(userCreateRequest);

        mockMvc.perform(post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
            .andExpect(status().isConflict());
    }
}