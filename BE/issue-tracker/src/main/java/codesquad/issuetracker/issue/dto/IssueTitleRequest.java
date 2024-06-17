package codesquad.issuetracker.issue.dto;

import codesquad.issuetracker.issue.Issue;
import lombok.NoArgsConstructor;
import lombok.Value;

@Value
@NoArgsConstructor(force = true)
public class IssueTitleRequest {

    String title;

    public Issue toEntity() {
        return Issue.builder()
            .title(title)
            .build();
    }

}
