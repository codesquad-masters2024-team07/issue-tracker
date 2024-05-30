package codesquad.issuetracker.user.dto;

import codesquad.issuetracker.user.User;
import lombok.Builder;

@Builder
public record SimpleUserResponse(String id, String imgUrl) {


    public static SimpleUserResponse from(User user) {
        return new SimpleUserResponse(user.getId(), user.getImgUrl());
    }


}
