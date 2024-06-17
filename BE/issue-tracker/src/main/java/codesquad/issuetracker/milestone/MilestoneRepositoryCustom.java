package codesquad.issuetracker.milestone;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MilestoneRepositoryCustom {

    Page<Milestone> findAll(Pageable pageable);
}
