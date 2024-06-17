package codesquad.issuetracker.milestone;

import codesquad.issuetracker.global.repository.CrudRepositoryCustom;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface MilestoneRepository extends CrudRepository<Milestone, Long>, MilestoneRepositoryCustom,
    CrudRepositoryCustom<Milestone, Long> {

    @Modifying
    @Query("UPDATE MILESTONE m SET m.state = :state WHERE m.id = :id")
    int updateMilestoneState(@Param("id") Long id, @Param("state") String state);

    @Query("SELECT COUNT(*) FROM MILESTONE WHERE IS_DELETED = FALSE AND STATE = 'OPEN'")
    int countOpenMilestones();

    @Modifying
    @Query("UPDATE MILESTONE SET IS_DELETED = TRUE WHERE ID = :milestoneId")
    void softDeleteById(Long milestoneId);

}
