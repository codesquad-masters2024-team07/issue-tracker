package codesquad.issuetracker.milestone.dto;

import codesquad.issuetracker.count.dto.LabelMilestoneCount;
import java.util.List;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class MilestoneListResponse {

    List<MilestoneResponse> milestones;
    int openMilestoneCount;
    int labelCount;

    public static MilestoneListResponse of(List<MilestoneResponse> milestones, LabelMilestoneCount labelMilestoneCount) {
        return MilestoneListResponse.builder()
            .milestones(milestones)
            .openMilestoneCount(labelMilestoneCount.getOpenMilestoneCount())
            .labelCount(labelMilestoneCount.getLabelCount())
            .build();
    }

}
