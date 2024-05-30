package codesquad.issuetracker.issue.dto;

import java.util.List;
import lombok.Getter;

@Getter
public class AttachedLabelUpdateRequest {

    private List<Long> labelIds;

    public AttachedLabelUpdateRequest() {
    }

    public AttachedLabelUpdateRequest(List<Long> labelIds) {
        this.labelIds = labelIds;
    }
}
