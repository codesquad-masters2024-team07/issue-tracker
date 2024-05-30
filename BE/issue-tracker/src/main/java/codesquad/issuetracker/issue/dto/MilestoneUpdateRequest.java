package codesquad.issuetracker.issue.dto;

import lombok.Getter;

@Getter
public class MilestoneUpdateRequest {

    private Long milestoneId;

    public MilestoneUpdateRequest() {
    }

    public MilestoneUpdateRequest(Long milestoneId) {
        this.milestoneId = milestoneId;
    }
}
