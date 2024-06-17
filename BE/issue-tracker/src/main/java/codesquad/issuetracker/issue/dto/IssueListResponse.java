package codesquad.issuetracker.issue.dto;


import codesquad.issuetracker.count.dto.IssueCount;
import codesquad.issuetracker.count.dto.LabelMilestoneCount;
import java.util.List;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class IssueListResponse {

    List<IssueResponse> issues;
    int openMilestoneCount;
    int labelCount;
    int openIssueCount;
    int closedIssueCount;

    public static IssueListResponse of(List<IssueResponse> issues, LabelMilestoneCount labelMilestoneCount,
        IssueCount issueCount) {
        return IssueListResponse.builder()
            .issues(issues)
            .openMilestoneCount(labelMilestoneCount.getOpenMilestoneCount())
            .labelCount(labelMilestoneCount.getLabelCount())
            .openIssueCount(issueCount.getOpenIssueCount())
            .closedIssueCount(issueCount.getClosedIssueCount())
            .build();
    }
}
