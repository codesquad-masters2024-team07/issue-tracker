package codesquad.issuetracker.user;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import codesquad.issuetracker.exception.UserAlreadyExist;
import codesquad.issuetracker.user.dto.UserCreateRequest;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @InjectMocks
    UserService userService;

    @Test
    @DisplayName("중복된 ID를 입력받으면 예외를 발생시킨다.")
    void register_DuplicateId_ExceptionThrown() {
        User existingUser = User.builder()
            .id("existingUser")
            .build();

        when(userRepository.findById(any())).thenReturn(Optional.of(existingUser));

        UserCreateRequest duplicateUserRequest = UserCreateRequest.builder()
            .id("duplicateId")
            .build();

        Assertions.assertThatThrownBy(() -> userService.register(duplicateUserRequest))
            .isInstanceOf(UserAlreadyExist.class);


    }

}