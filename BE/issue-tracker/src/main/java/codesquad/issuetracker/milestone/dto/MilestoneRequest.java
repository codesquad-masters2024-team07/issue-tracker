package codesquad.issuetracker.milestone.dto;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.milestone.Milestone;
import java.time.LocalDate;
import java.time.LocalDateTime;
import lombok.Value;

@Value
public class MilestoneRequest {

    String title;
    String description;
    LocalDate dueDate;

    public Milestone toEntity() {
        return Milestone.builder()
            .title(title)
            .description(description)
            .dueDate(dueDate.atStartOfDay())
            .updatedAt(LocalDateTime.now())
            .state(State.OPEN)
            .build();
    }

}
