package codesquad.issuetracker.issue.dto;

import codesquad.issuetracker.utils.FilterParser;
import java.util.List;
import java.util.Map;
import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class IssueFilter {

    List<String> joinTables;
    Map<String, Object> conditions;

    public static IssueFilter from(String filter) {
        Map<String, Object> parsedFilters = FilterParser.parseConditions(filter);

        List<String> joinTables = FilterParser.parseJoinTables(parsedFilters);

        return IssueFilter.builder()
            .joinTables(joinTables)
            .conditions(parsedFilters)
            .build();
    }

    public List<String> getJoinTables() {
        return joinTables;
    }

    public Map<String, Object> getConditions() {
        return conditions;
    }
}
