package codesquad.issuetracker.count.dto;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class IssueCount {

    int openIssueCount;
    int closedIssueCount;

}
