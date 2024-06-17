package codesquad.issuetracker.label;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LabelCustomRepository<T> {

    Page<Label> findAll(Pageable pageable);

}
