package codesquad.issuetracker.issue;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.comment.Comment;
import codesquad.issuetracker.comment.CommentCreateRequest;
import codesquad.issuetracker.comment.CommentResponse;
import codesquad.issuetracker.count.service.CountService;
import codesquad.issuetracker.issue.dto.DetailIssueResponse;
import codesquad.issuetracker.issue.dto.IssueCreateRequest;
import codesquad.issuetracker.issue.dto.IssueListResponse;
import codesquad.issuetracker.issue.dto.IssueResponse;
import codesquad.issuetracker.issue.dto.IssueTitleRequest;
import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.LabelService;
import codesquad.issuetracker.label.dto.SimpleLabelResponse;
import codesquad.issuetracker.milestone.Milestone;
import codesquad.issuetracker.milestone.MilestoneService;
import codesquad.issuetracker.milestone.dto.SimpleMilestoneResponse;
import codesquad.issuetracker.user.UserService;
import codesquad.issuetracker.user.dto.SimpleUserResponse;
import codesquad.issuetracker.user.dto.UserResponse;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final LabelService labelService;
    private final UserService userService;
    private final MilestoneService milestoneService;
    private final CountService countService;


    public IssueListResponse findIssuesByState(State state) {
        List<Issue> issues = issueRepository.findAllByState(state);
        return IssueListResponse.of(issues.stream().map(issue -> IssueResponse.of(issue, findLabelByIssueId(issue.getId()),
                milestoneService.findById(issue.getMilestoneId().getId()))).toList(), countService.fetchLabelMilestoneCount(),
            countService.fetchIssueCount());
    }

    public Issue create(IssueCreateRequest issueCreateRequest) {
        Issue issue = issueCreateRequest.toEntity();
        return issueRepository.save(issue);
    }

    public DetailIssueResponse findDetailIssueById(Long issueId) {
        Issue issue = findById(issueId);
        Set<Label> labels = getLabels(issue.getLabelRefs());
        List<String> assignees = issue.getAssigneeIds().stream().map(Assignee::getAssigneeId).toList();
        List<SimpleUserResponse> assigneeResponses = userService.getSimpleUsersByAssignee(assignees);
        List<CommentResponse> comments = getCommentResponses(issue.getComments());
        SimpleMilestoneResponse milestoneResponse = getSimpleMilestone(issue.getMilestoneId());

        return DetailIssueResponse.of(issue, labels, assigneeResponses, comments, milestoneResponse);
    }

    private Set<Label> getLabels(Set<IssueAttachedLabel> labelRefs) {
        return labelRefs.stream().map(labelRef -> labelService.findById(labelRef.getLabelId())).collect(Collectors.toSet());
    }

    private Set<UserResponse> getUserResponses(Set<Assignee> assignees) {
        return assignees.stream().map(assignee -> userService.findById(assignee.getAssigneeId())).map(UserResponse::of)
            .collect(Collectors.toSet());
    }

    private static List<CommentResponse> getCommentResponses(List<Comment> comments) {
        return comments.stream().map(CommentResponse::of).toList();
    }

    private SimpleMilestoneResponse getSimpleMilestone(AggregateReference<Milestone, Long> milestoneId) {
        Milestone milestone = milestoneService.findById(milestoneId.getId());
        return SimpleMilestoneResponse.of(milestone, countService.fetchIssueCount());
    }

    public Issue findById(Long issueId) {
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        return optionalIssue.orElseThrow(NoSuchElementException::new);
    }

    public void updateTitle(Long issueId, IssueTitleRequest issueTitleRequest) {
        issueRepository.update(issueId, issueTitleRequest.toEntity());
    }

    public void delete(Long issueId) {
        Issue issue = findById(issueId);
        issue.delete();
        issueRepository.save(issue);
    }


    public Comment addComment(Long issueId, CommentCreateRequest commentCreateRequest) {
        Comment comment = Comment.of(commentCreateRequest);
        Optional<Issue> optionalIssue = issueRepository.findById(issueId);
        Issue issue = optionalIssue.orElseThrow(NoSuchElementException::new);
        issue.addComment(comment);
        issueRepository.save(issue);
        return comment;
    }

    public List<SimpleLabelResponse> findLabelByIssueId(Long issueId) {
        Issue issue = findById(issueId);
        return issue.getLabelRefs().stream().map(IssueAttachedLabel::getLabelId).map(labelService::findById)
            .map(SimpleLabelResponse::from).toList();
    }
}
