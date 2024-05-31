package codesquad.issuetracker.issue;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.global.repository.CrudRepositoryCustom;
import java.util.Optional;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssueRepository extends CrudRepository<Issue, Long>, CrudRepositoryCustom<Issue, Long>, IssueRepositoryCustom {

    @Override
    @Query("SELECT * FROM ISSUE WHERE ISSUE.ID = :id AND ISSUE.IS_DELETED = FALSE")
    Optional<Issue> findById(Long id);

    @Query("SELECT COUNT(*) FROM ISSUE  WHERE MILESTONE_ID = :milestoneId AND IS_DELETED = FALSE AND STATE = :state")
    int countIssueByMilestoneId(Long milestoneId, State state);

    @Query("SELECT COUNT(*) FROM ISSUE WHERE IS_DELETED = FALSE AND STATE = :state")
    int countIssueByState(State state);

}
