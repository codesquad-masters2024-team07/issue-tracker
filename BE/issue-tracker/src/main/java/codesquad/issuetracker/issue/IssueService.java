package codesquad.issuetracker.issue;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.comment.Comment;
import codesquad.issuetracker.comment.CommentCreateRequest;
import codesquad.issuetracker.comment.CommentResponse;
import codesquad.issuetracker.count.service.CountService;
import codesquad.issuetracker.issue.dto.AssigneeUpdateRequest;
import codesquad.issuetracker.issue.dto.AttachedLabelUpdateRequest;
import codesquad.issuetracker.issue.dto.DetailIssueResponse;
import codesquad.issuetracker.issue.dto.IssueCreateRequest;
import codesquad.issuetracker.issue.dto.IssueListResponse;
import codesquad.issuetracker.issue.dto.IssueResponse;
import codesquad.issuetracker.issue.dto.IssueTitleRequest;
import codesquad.issuetracker.issue.dto.IssuesStateChangeRequest;
import codesquad.issuetracker.issue.dto.MilestoneUpdateRequest;
import codesquad.issuetracker.label.Label;
import codesquad.issuetracker.label.LabelService;
import codesquad.issuetracker.label.dto.SimpleLabelResponse;
import codesquad.issuetracker.milestone.Milestone;
import codesquad.issuetracker.milestone.MilestoneService;
import codesquad.issuetracker.milestone.dto.SimpleMilestoneResponse;
import codesquad.issuetracker.user.UserService;
import codesquad.issuetracker.user.dto.SimpleUserResponse;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
        List<IssueResponse> issueResponses = issues.stream()
            .map(this::convertToResponse).toList();
        return IssueListResponse.of(issueResponses, countService.fetchLabelMilestoneCount(),
            countService.fetchIssueCount());
    }

    private IssueResponse convertToResponse(Issue issue) {
        Long milestoneId = issue.getMilestoneId().orElse(null);
        Milestone milestone = (milestoneId == null) ? Milestone.builder().build() : milestoneService.findById(milestoneId);
        return IssueResponse.of(issue, findLabelByIssueId(issue.getId()), milestone);
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
        Optional<Long> milestoneId = issue.getMilestoneId();
        SimpleMilestoneResponse milestoneResponse = milestoneId.map(this::getSimpleMilestone)
            .orElse(null);

        return DetailIssueResponse.of(issue, labels, assigneeResponses, comments, milestoneResponse);
    }

    private Set<Label> getLabels(Set<IssueAttachedLabel> labelRefs) {
        return labelRefs.stream().map(labelRef -> labelService.findById(labelRef.getLabelId())).collect(Collectors.toSet());
    }

    private static List<CommentResponse> getCommentResponses(List<Comment> comments) {
        return comments.stream().map(CommentResponse::of).toList();
    }

    private SimpleMilestoneResponse getSimpleMilestone(Long id) {
        Milestone milestone = milestoneService.findById(id);
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
        Comment comment = commentCreateRequest.toEntity();
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


    public void updateLabels(Long issueId, AttachedLabelUpdateRequest request) {
        Issue issue = findById(issueId);
        issue.updateLabels(request.getLabelIds());
        issueRepository.save(issue);
    }

    public void updateAssignees(Long issueId, AssigneeUpdateRequest request) {
        Issue issue = findById(issueId);
        issue.updateAssignees(request.getAssigneeIds());
        issueRepository.save(issue);
    }

    public void updateMilestone(Long issueId, MilestoneUpdateRequest request) {
        Issue issue = findById(issueId);
        issue.updateMilestone(request.getMilestoneId());
        issueRepository.save(issue);
    }

    public void updateIssuesState(IssuesStateChangeRequest request) {
        log.info("request = {}", request);
        List<Issue> issues = request.issueIds().stream()
            .map(this::findById)
            .peek(issue -> issue.changeState(request.state()))
            .toList();

        log.info("issues = {}", issues);
        issueRepository.saveAll(issues);
    }
}
