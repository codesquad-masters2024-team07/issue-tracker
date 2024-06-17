package codesquad.issuetracker.label.dto;


import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.TextColor;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class SimpleLabelResponse {


    String name;
    TextColor textColor;
    String backgroundColor;

    public static SimpleLabelResponse from(Label label) {
        return SimpleLabelResponse.builder()
            .name(label.getName())
            .textColor(label.getTextColor())
            .backgroundColor(label.getBackgroundColor())
            .build();
    }


}
