package codesquad.issuetracker.issue.dto;

import codesquad.issuetracker.base.State;
import java.util.List;

public record IssuesStateChangeRequest(List<Long> issueIds, State state) {

}
