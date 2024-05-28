package codesquad.issuetracker.issue.dto;


import codesquad.issuetracker.issue.Assignee;
import codesquad.issuetracker.issue.Issue;
import codesquad.issuetracker.milestone.Milestone;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class IssueResponse {

    Long id;
    String authorId;
    String title;
    LocalDateTime openAt;
    List<String> labelNames;
    String milestoneTitle;
    List<String> assignees;

    public static IssueResponse of(Issue issue, List<String> labelNames, Milestone milestone) {
        return IssueResponse.builder()
            .id(issue.getId())
            .authorId(issue.getAuthorId())
            .title(issue.getTitle())
            .openAt(issue.getOpenAt())
            .labelNames(labelNames)
            .milestoneTitle(milestone.getTitle())
            .assignees(issue.getAssigneeIds().stream().map(Assignee::getAssigneeId).toList())
            .build();
    }

}
