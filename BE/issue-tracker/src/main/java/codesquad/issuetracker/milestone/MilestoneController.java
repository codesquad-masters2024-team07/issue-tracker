package codesquad.issuetracker.milestone;

import codesquad.issuetracker.milestone.dto.MilestoneListResponse;
import codesquad.issuetracker.milestone.dto.MilestoneRequest;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/milestones")
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService milestoneService;

    @PostMapping("/new")
    public ResponseEntity<Milestone> createNewMilestone(
        @RequestBody MilestoneRequest milestoneRequest) {
        Milestone newMilestone = milestoneService.createNewMilestone(milestoneRequest);
        return ResponseEntity.created(URI.create("/api/milestones/" + newMilestone.getId()))
            .build();
    }

    @GetMapping
    public ResponseEntity<MilestoneListResponse> fetchFilteredMilestones(Pageable pageable) {
        MilestoneListResponse milestones = milestoneService.fetchFilteredMilestones(
            pageable);
        return ResponseEntity.ok().body(milestones);

    }

    @PutMapping("/{milestoneId}")
    public ResponseEntity<Milestone> updateMilestone(@PathVariable Long milestoneId,
        @RequestBody MilestoneRequest milestoneRequest) {
        milestoneService.updateMilestone(milestoneId, milestoneRequest);
        return ResponseEntity.created(URI.create("api/milestones/" + milestoneId)).build();
    }

    @DeleteMapping("/{milestoneId}")
    public ResponseEntity<String> deleteMilestone(@PathVariable Long milestoneId) {
        milestoneService.softDeleteById(milestoneId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{milestoneId}/close")
    public ResponseEntity<Milestone> closeMilestone(@PathVariable Long milestoneId) {
        Milestone milestone = milestoneService.closeMilestone(milestoneId);
        return ResponseEntity.ok(milestone);
    }
}
