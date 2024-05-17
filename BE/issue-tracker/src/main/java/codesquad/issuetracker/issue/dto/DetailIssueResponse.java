package codesquad.issuetracker.issue.dto;

import codesquad.issuetracker.comment.CommentResponse;
import codesquad.issuetracker.issue.Issue;
import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.user.dto.UserResponse;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import lombok.Builder;
import lombok.Value;
import org.springframework.data.annotation.Id;

@Value
@Builder
public class DetailIssueResponse {

    @Id
    Long id;
    String authorId;
    String title;
    String description;
    LocalDateTime openAt;
    LocalDateTime updatedAt;
    LocalDateTime closedAt;
    Long milestoneId;
    boolean isOpen;
    boolean isDeleted;
    Set<Label> labels;
    Set<UserResponse> assignees;
    List<CommentResponse> comments;

    public static DetailIssueResponse from(Issue issue, Set<Label> labels, Set<UserResponse> assignees, List<CommentResponse> comments) {
        return DetailIssueResponse.builder()
            .id(issue.getId())
            .authorId(issue.getAuthorId())
            .title(issue.getTitle())
            .description(issue.getDescription())
            .openAt(issue.getOpenAt())
            .updatedAt(issue.getUpdatedAt())
            .closedAt(issue.getClosedAt())
            .milestoneId(issue.getMilestoneId().getId())
            .isOpen(issue.isOpen())
            .isDeleted(issue.isDeleted())
            .labels(labels)
            .assignees(assignees)
            .comments(comments)
            .build();
    }

}