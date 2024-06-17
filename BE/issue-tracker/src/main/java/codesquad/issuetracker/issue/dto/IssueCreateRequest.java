package codesquad.issuetracker.issue.dto;

import codesquad.issuetracker.issue.Assignee;
import codesquad.issuetracker.issue.Issue;
import codesquad.issuetracker.issue.IssueAttachedLabel;
import codesquad.issuetracker.milestone.Milestone;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Value;
import org.springframework.data.jdbc.core.mapping.AggregateReference;

@Value
public class IssueCreateRequest {

    String userId;
    String title;
    String content;
    Set<String> assigneeIds;
    List<Long> labelIds;
    Long milestoneId;

    public Issue toEntity() {
        Set<IssueAttachedLabel> labelRefs = labelIds.stream()
            .map(IssueAttachedLabel::new)
            .collect(Collectors.toSet());

        Set<Assignee> assigneeIds = this.assigneeIds.stream()
            .map(Assignee::new)
            .collect(Collectors.toSet());

        AggregateReference<Milestone, Long> milestoneId =
            this.milestoneId == null ? null : AggregateReference.to(this.milestoneId);
        return Issue.of(userId, title, content, milestoneId, labelRefs, assigneeIds);
    }

}
