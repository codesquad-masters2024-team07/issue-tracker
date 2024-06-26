package codesquad.issuetracker.comment;


import codesquad.issuetracker.user.User;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Table("COMMENT")
@ToString
@EqualsAndHashCode
public class Comment {

    @Id
    private Long id;
    private AggregateReference<User, String> authorId;
    private String contents;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private boolean isDeleted;

    @Builder
    public Comment(Long id,
        AggregateReference<User, String> authorId, String contents, LocalDateTime createdAt,
        LocalDateTime updatedAt, boolean isDeleted) {
        this.id = id;
        this.authorId = authorId;
        this.contents = contents;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isDeleted = isDeleted;
    }

    public static Comment of(CommentCreateRequest commentCreateRequest) {
        return Comment.builder()
            .contents(commentCreateRequest.contents())
            .authorId(AggregateReference.to(commentCreateRequest.authorId()))
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .isDeleted(false)
            .build();
    }

    public void delete() {
        this.isDeleted = true;
    }
}
