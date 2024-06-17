package codesquad.issuetracker.issue;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.comment.Comment;
import codesquad.issuetracker.milestone.Milestone;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@ToString
@Table("ISSUE")
public class Issue {

    @Id
    private Long id;
    private String authorId;
    private String title;
    private String content;
    private LocalDateTime openAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;
    private AggregateReference<Milestone, Long> milestoneId;
    private State state;
    private boolean isDeleted;
    @MappedCollection(idColumn = "ISSUE_ID")
    private Set<IssueAttachedLabel> labelRefs = new HashSet<>();
    @MappedCollection(idColumn = "ISSUE_ID")
    private Set<Assignee> assigneeIds = new HashSet<>();
    @MappedCollection(idColumn = "ISSUE_ID", keyColumn = "CREATED_AT")
    private List<Comment> comments = new ArrayList<>();

    @Builder
    @PersistenceCreator
    public Issue(Long id, String authorId, String title, String content,
        LocalDateTime openAt,
        LocalDateTime updatedAt, LocalDateTime closedAt, AggregateReference<Milestone, Long> milestoneId, State state,
        boolean isDeleted, Set<IssueAttachedLabel> labelRefs, Set<Assignee> assigneeIds,
        List<Comment> comments) {
        this.id = id;
        this.authorId = authorId;
        this.title = title;
        this.content = content;
        this.openAt = openAt;
        this.updatedAt = updatedAt;
        this.closedAt = closedAt;
        this.milestoneId = milestoneId;
        this.state = state;
        this.isDeleted = isDeleted;
        this.labelRefs = labelRefs;
        this.assigneeIds = assigneeIds;
        this.comments = comments;
    }

    public static Issue of(String authorId, String title, String content,
        AggregateReference<Milestone, Long> milestoneId, Set<IssueAttachedLabel> labelRefs, Set<Assignee> assignees) {
        return Issue.builder()
            .authorId(authorId)
            .title(title)
            .content(content)
            .openAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .closedAt(LocalDateTime.now())
            .milestoneId(milestoneId)
            .state(State.OPEN)
            .isDeleted(false)
            .labelRefs(labelRefs)
            .assigneeIds(assignees)
            .comments(new ArrayList<>())
            .build();
    }

    public void addComment(Comment comment) {
        comments.add(comment);
    }

    public void updateTitle(String title) {
        this.title = title;
    }

    public void delete() {
        this.isDeleted = true;
        comments.forEach(Comment::delete);
    }
}
