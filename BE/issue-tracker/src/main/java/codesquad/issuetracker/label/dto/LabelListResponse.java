package codesquad.issuetracker.label.dto;

import codesquad.issuetracker.count.dto.LabelMilestoneCount;
import java.util.List;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LabelListResponse {

    List<LabelResponse> labelResponses;
    int openMilestoneCount;
    int labelCount;

    public static LabelListResponse of(List<LabelResponse> labelResponses, LabelMilestoneCount labelMilestoneCount) {
        return LabelListResponse.builder()
            .labelResponses(labelResponses)
            .openMilestoneCount(labelMilestoneCount.getOpenMilestoneCount())
            .labelCount(labelMilestoneCount.getLabelCount())
            .build();
    }

}
