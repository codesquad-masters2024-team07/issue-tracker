package codesquad.issuetracker.user;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.test.context.jdbc.Sql;

@Slf4j
@DataJdbcTest
class UserRepositoryTest {

    @Autowired
    UserRepository userRepository;

    @Test
    @DisplayName("사용자 정보를 저장할 수 있다.")
    void saveUser() {
        User user = User.builder()
            .id("cori1234")
            .build();
        User savedUser = userRepository.save(user);

        assertThat(savedUser.getId()).isEqualTo(user.getId());
    }

    @Test
    @DisplayName("사용자 아이디로 조회할 수 있다.")
    @Sql("/sql/user-data.sql")
    void findUserById() {
        String userId = "cori1234";
        Optional<User> optionalUser = userRepository.findById(userId);
        assertThat(optionalUser.get().getId()).isEqualTo(userId);
    }

}