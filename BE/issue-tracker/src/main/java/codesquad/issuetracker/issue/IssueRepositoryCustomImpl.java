package codesquad.issuetracker.issue;

import codesquad.issuetracker.issue.dto.IssueFilter;
import java.sql.SQLException;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Repository
@Slf4j
public class IssueRepositoryCustomImpl implements IssueRepositoryCustom {

    DynamicQuery dynamicQuery;

    public IssueRepositoryCustomImpl(DynamicQuery dynamicQuery) {
        this.dynamicQuery = dynamicQuery;
    }


    @Override
    public List<Issue> findAll(IssueFilter issueFilter) throws SQLException {
        log.info("joinTables: {}", issueFilter.getJoinTables());
        log.info("conditions: {}", issueFilter.getConditions());
        return dynamicQuery.executeQuery(issueFilter.getJoinTables(), issueFilter.getConditions());

    }
}
