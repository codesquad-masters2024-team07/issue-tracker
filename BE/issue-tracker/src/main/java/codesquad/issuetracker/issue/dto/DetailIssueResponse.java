package codesquad.issuetracker.issue.dto;

import codesquad.issuetracker.comment.CommentResponse;
import codesquad.issuetracker.issue.Issue;
import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.milestone.dto.SimpleMilestoneResponse;
import codesquad.issuetracker.user.dto.SimpleUserResponse;
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
    String content;
    LocalDateTime openAt;
    LocalDateTime updatedAt;
    SimpleMilestoneResponse milestone;
    Set<Label> labels;
    List<SimpleUserResponse> assignees;
    List<CommentResponse> comments;
    int commentCount;

    public static DetailIssueResponse of(Issue issue, Set<Label> labels, List<SimpleUserResponse> assignees,
        List<CommentResponse> comments, SimpleMilestoneResponse milestoneResponse) {
        return DetailIssueResponse.builder()
            .id(issue.getId())
            .authorId(issue.getAuthorId())
            .title(issue.getTitle())
            .content(issue.getContent())
            .openAt(issue.getOpenAt())
            .updatedAt(issue.getUpdatedAt())
            .milestone(milestoneResponse)
            .labels(labels)
            .assignees(assignees)
            .comments(comments)
            .commentCount(comments.size())
            .build();
    }

}
