package codesquad.issuetracker.user;

import codesquad.issuetracker.exception.PasswordMismatch;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Table;

@Table("USERS")
@Getter
@ToString
public class User implements Persistable<String> {

    @Id
    private String id;
    private String username;
    private String password;
    private String imgUrl;
    private Role role;
    private LocalDateTime createdAt;
    private boolean isDeleted;
    @Transient
    private boolean isNew;

    @PersistenceCreator
    User(String id, String username, String password, String imgUrl, Role role, LocalDateTime createdAt,
        boolean isDeleted) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.imgUrl = imgUrl;
        this.role = role;
        this.createdAt = createdAt;
        this.isDeleted = isDeleted;
        this.isNew = false;
    }

    @Builder
    public User(String id, String username, String password, String imgUrl, Role role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.imgUrl = imgUrl;
        this.role = role;
        this.createdAt = LocalDateTime.now();
        this.isDeleted = false;
        this.isNew = true;
    }

    @Override
    public boolean isNew() {
        return isNew;
    }

    public void verifyPassword(String password) {
        if (!password.equals(this.password)) {
            throw new PasswordMismatch();
        }
    }

    public enum Role {
        USER, ADMIN,
    }

}
