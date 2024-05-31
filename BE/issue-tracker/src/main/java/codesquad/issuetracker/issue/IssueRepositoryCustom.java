package codesquad.issuetracker.issue;

import codesquad.issuetracker.issue.dto.IssueFilter;
import java.sql.SQLException;
import java.util.List;

public interface IssueRepositoryCustom {

    List<Issue> findAll(IssueFilter issueFilter) throws SQLException;

}
