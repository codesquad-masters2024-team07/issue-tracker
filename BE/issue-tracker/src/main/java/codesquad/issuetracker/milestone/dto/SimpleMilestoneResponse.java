package codesquad.issuetracker.milestone.dto;

import codesquad.issuetracker.count.dto.IssueCount;
import codesquad.issuetracker.milestone.Milestone;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class SimpleMilestoneResponse {

    Long id;
    String title;
    int openIssueCount;
    int closedIssueCount;

    public static SimpleMilestoneResponse of(Milestone milestone, IssueCount issueCount) {
        return SimpleMilestoneResponse.builder()
            .id(milestone.getId())
            .title(milestone.getTitle())
            .openIssueCount(issueCount.getOpenIssueCount())
            .closedIssueCount(issueCount.getClosedIssueCount())
            .build();
    }


}
