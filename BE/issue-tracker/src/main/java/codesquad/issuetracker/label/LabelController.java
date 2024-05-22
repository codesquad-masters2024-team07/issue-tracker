package codesquad.issuetracker.label;

import codesquad.issuetracker.label.dto.LabelRequest;
import codesquad.issuetracker.label.dto.LabelResponse;
import codesquad.issuetracker.milestone.MilestoneService;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/labels")
@RequiredArgsConstructor
public class LabelController {

    private static final Logger log = LoggerFactory.getLogger(LabelController.class);
    private final LabelService labelService;
    private final MilestoneService milestoneService;

    @GetMapping
    public ResponseEntity<List<LabelResponse>> fetchFilteredLabels(Pageable pageable) {
        List<Label> labels = labelService.fetchFilteredLabels(pageable);
        List<LabelResponse> labelResponses = labels.stream()
            .map(label -> LabelResponse.of(label, labelService.countLabels(), milestoneService.countOpenMilestones()))
            .toList();
        return ResponseEntity.ok().body(labelResponses);
    }

    @PostMapping("/new")
    public ResponseEntity<Label> createLabel(@RequestBody LabelRequest labelRequest) {
        Label labelResponse = labelService.createLabel(labelRequest);
        return ResponseEntity.created(URI.create("/api/labels/" + labelResponse.getId())).build();
    }

    @PutMapping("/{labelId}")
    public ResponseEntity<LabelResponse> updateLabel(@PathVariable Long labelId, @RequestBody LabelRequest labelRequest) {
        labelService.updateLabel(labelId, labelRequest);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{labelId}")
    public ResponseEntity<String> deleteLabel(@PathVariable Long labelId) {
        labelService.deleteById(labelId);
        return ResponseEntity.noContent().build();
    }
}
