package codesquad.issuetracker.label.dto;

import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.TextColor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LabelResponse {

    Long id;
    String name;
    String description;
    TextColor textColor;
    String backgroundColor;

    public static LabelResponse of(Label label) {
        return LabelResponse.builder()
            .id(label.getId())
            .name(label.getName())
            .description(label.getDescription())
            .backgroundColor(label.getBackgroundColor())
            .textColor(label.getTextColor())
            .build();
    }
}
