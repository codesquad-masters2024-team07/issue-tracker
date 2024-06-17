package codesquad.issuetracker.milestone;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.count.service.CountService;
import codesquad.issuetracker.milestone.dto.MilestoneListResponse;
import codesquad.issuetracker.milestone.dto.MilestoneRequest;
import codesquad.issuetracker.milestone.dto.MilestoneResponse;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private final CountService countService;

    public Milestone createNewMilestone(MilestoneRequest milestoneRequest) {
        return milestoneRepository.save(milestoneRequest.toEntity());
    }

    public MilestoneListResponse fetchFilteredMilestones(Pageable pageable) {
        Page<Milestone> filteredMilestones = milestoneRepository.findAll(pageable);
        List<Milestone> milestones = filteredMilestones.getContent();
        return MilestoneListResponse.of(milestones.stream()
                .map(milestone -> MilestoneResponse.of(
                    milestone, countService.fetchIssueCountByMilestone(milestone.getId()))).toList(),
            countService.fetchLabelMilestoneCount());

    }

    public Milestone findById(Long id) {
        Optional<Milestone> optionalMilestone = milestoneRepository.findById(id);
        return optionalMilestone.orElseThrow(IllegalAccessError::new);

    }

    public void updateMilestone(Long milestoneId, MilestoneRequest milestoneRequest) {
        milestoneRepository.update(milestoneId, milestoneRequest.toEntity());
    }

    public Milestone closeMilestone(Long milestoneId) {
        milestoneRepository.updateMilestoneState(milestoneId, State.CLOSED.name());
        return findById(milestoneId);
    }

    public void softDeleteById(Long milestoneId) {
        milestoneRepository.softDeleteById(milestoneId);
    }

    public int countOpenMilestones() {
        return milestoneRepository.countOpenMilestones();
    }
}
