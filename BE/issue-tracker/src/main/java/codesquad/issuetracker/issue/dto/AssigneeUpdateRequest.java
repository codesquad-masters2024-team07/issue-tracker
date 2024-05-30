package codesquad.issuetracker.issue.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class AssigneeUpdateRequest {

    private List<String> assigneeIds;

    public AssigneeUpdateRequest() {
    }

    public AssigneeUpdateRequest(List<String> assigneeIds) {
        this.assigneeIds = assigneeIds;
    }
}
