package codesquad.issuetracker.label;

import codesquad.issuetracker.global.repository.CrudRepositoryCustom;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LabelRepository extends CrudRepository<Label, Long>, LabelCustomRepository, CrudRepositoryCustom<Label, Long> {

    Page<Label> findAll(Pageable pageable);

    @Override
    @Query("SELECT * FROM LABEL WHERE ID = :id AND IS_DELETED = FALSE")
    Optional<Label> findById(Long id);

    @Query("SELECT COUNT(*) FROM LABEL WHERE IS_DELETED = FALSE")
    int countLabels();

    @Modifying
    @Query("UPDATE LABEL SET IS_DELETED = TRUE WHERE ID = :labelId")
    void deleteById(Long labelId);
}
