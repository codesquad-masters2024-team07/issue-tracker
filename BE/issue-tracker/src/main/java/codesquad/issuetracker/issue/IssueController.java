package codesquad.issuetracker.issue;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.comment.Comment;
import codesquad.issuetracker.comment.CommentCreateRequest;
import codesquad.issuetracker.issue.dto.DetailIssueResponse;
import codesquad.issuetracker.issue.dto.IssueCreateRequest;
import codesquad.issuetracker.issue.dto.IssueListResponse;
import codesquad.issuetracker.issue.dto.IssueTitleRequest;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/issues")
public class IssueController {

    private final IssueService issueService;


    @GetMapping
    public IssueListResponse getIssues(@RequestParam State state) {
        return issueService.findIssuesByState(state);
    }

    @GetMapping("/{issueId}")
    public DetailIssueResponse getDetailIssue(@PathVariable Long issueId) {
        return issueService.findDetailIssueById(issueId);
    }

    @PostMapping
    public ResponseEntity<Issue> createIssue(@RequestBody IssueCreateRequest issueCreateRequest) {
        Issue savedIssue = issueService.create(issueCreateRequest);
        return ResponseEntity.created(URI.create("/api/issues/" + savedIssue.getId())).build();
    }

    @PostMapping("/{issueId}/comments")
    public Comment addComment(@PathVariable Long issueId, @RequestBody
    CommentCreateRequest commentCreateRequest) {
        return issueService.addComment(issueId, commentCreateRequest);
    }

    @PutMapping("/{issueId}")
    public ResponseEntity<IssueTitleRequest> updateIssueTitle(@PathVariable Long issueId,
        @RequestBody IssueTitleRequest issueTitleRequest) {
        issueService.updateTitle(issueId, issueTitleRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{issueId}")
    public ResponseEntity<?> deleteIssue(@PathVariable Long issueId) {
        issueService.delete(issueId);
        return ResponseEntity.noContent().build();
    }
}
