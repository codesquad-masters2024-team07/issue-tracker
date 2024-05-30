package codesquad.issuetracker.comment;

import java.time.LocalDateTime;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

public record CommentCreateRequest(String authorId, String contents) {

    public Comment toEntity() {
        return Comment.builder()
            .contents(contents)
            .authorId(AggregateReference.to(authorId))
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .isDeleted(false)
            .build();
    }

}
