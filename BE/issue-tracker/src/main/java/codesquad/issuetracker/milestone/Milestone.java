package codesquad.issuetracker.milestone;

import codesquad.issuetracker.base.State;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Table("MILESTONE")
public class Milestone {

    @Id
    private Long id;
    private String title;
    private String description;
    private LocalDateTime dueDate;
    private State state;
    private boolean isDeleted;
    private LocalDateTime updatedAt;


    @Builder
    @PersistenceCreator
    public Milestone(Long id, String title, String description, LocalDateTime dueDate,
        State state,
        boolean isDeleted, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.state = state;
        this.isDeleted = isDeleted;
        this.updatedAt = updatedAt;
    }
}
