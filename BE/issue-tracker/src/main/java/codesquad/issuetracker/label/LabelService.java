package codesquad.issuetracker.label;

import codesquad.issuetracker.count.service.CountService;
import codesquad.issuetracker.label.dto.LabelListResponse;
import codesquad.issuetracker.label.dto.LabelRequest;
import codesquad.issuetracker.label.dto.LabelResponse;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LabelService {

    private static final Logger log = LoggerFactory.getLogger(LabelService.class);
    private final LabelRepository labelRepository;
    private final CountService countService;

    public LabelListResponse fetchFilteredLabels(Pageable pageable) {
        List<Label> filteredLabels = labelRepository.findAll(pageable).getContent();

        return LabelListResponse.of(filteredLabels.stream()
            .map(LabelResponse::of).toList(), countService.fetchLabelMilestoneCount());

    }

    public Label findById(Long labelId) {
        Optional<Label> optionalLabel = labelRepository.findById(labelId);
        return optionalLabel.orElseThrow(NoSuchElementException::new);
    }

    public int countLabels() {
        return labelRepository.countLabels();
    }

    public Label createLabel(LabelRequest labelRequest) {
        return labelRepository.save(labelRequest.toEntity());
    }

    public void updateLabel(Long labelId, LabelRequest labelRequest) {
        labelRepository.update(labelId, labelRequest.toEntity());
    }


    public void deleteById(Long labelId) {
        Label label = findById(labelId);
        labelRepository.deleteById(labelId);
    }
}
