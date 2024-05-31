package codesquad.issuetracker.issue;

import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class DynamicQuery {

    NamedParameterJdbcTemplate jdbcTemplate;
    Map<String, String> foreignKeyColumns = new HashMap<>();
    Map<String, String> ManyToOneColumns = new HashMap<>();

    @Autowired
    DataSource dataSource;
    private static final String SQL = "SELECT ISSUE.id FROM ISSUE";
    private static final String MAIN_TABLE = "ISSUE";

    private Set<String> mainTableColumns = new HashSet<>();

    public DynamicQuery(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Issue> issueRowMapper = (rs, rowNum) -> Issue.builder()
        .id(rs.getLong("id"))
        .build();


    public List<Issue> executeQuery(List<String> joinTables, Map<String, Object> conditions) throws SQLException {
        mainTableColumns = getTableColumns(MAIN_TABLE);
        initializeForeignKeyColumns(joinTables);
        String joinClause = selectJoinClause(MAIN_TABLE, joinTables);
        String whereClause = selectWhereClause(conditions);
        initializeForeignKeyColumns(joinTables);
        StringBuilder sql = new StringBuilder(SQL).append(joinClause).append(whereClause);
        log.info("sql result: {}", sql);
        return jdbcTemplate.query(sql.toString(), issueRowMapper);

    }

    public String selectJoinClause(String mainTable, List<String> joinTables) throws SQLException {
        StringBuilder joinClause = new StringBuilder();
        try (var connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();

            for (String joinTable : joinTables) {

                try (ResultSet rs = metaData.getCrossReference(null, null, mainTable, null, null, joinTable)) {
                    while (rs.next()) {
                        String fkColumnName = rs.getString("FKCOLUMN_NAME");
                        String pkColumnName = rs.getString("PKCOLUMN_NAME");
                        joinClause.append(" LEFT JOIN ").append(joinTable)
                            .append(" ON ").append(mainTable).append(".").append(pkColumnName)
                            .append(" = ").append(joinTable).append(".").append(fkColumnName);
                    }
                }

                try (ResultSet rs = metaData.getExportedKeys(null, null, joinTable)) {
                    while (rs.next()) {
                        String fkColumnName = rs.getString("FKCOLUMN_NAME");
                        String pkColumnName = rs.getString("PKCOLUMN_NAME");
                        String fkTableName = rs.getString("FKTABLE_NAME");

                        if (mainTable.equalsIgnoreCase(fkTableName)) {
                            joinClause.append(" LEFT JOIN ").append(joinTable)
                                .append(" ON ").append(joinTable).append(".").append(pkColumnName)
                                .append(" = ").append(mainTable).append(".").append(fkColumnName);
                        }
                    }
                }
            }
        }
        return joinClause.toString();
    }

    private String selectWhereClause(Map<String, Object> conditions) {
        StringBuilder condition = new StringBuilder();
        log.info("foreign key columns: {}", foreignKeyColumns);
        log.info("Many to one columns: {}", ManyToOneColumns);

        if (conditions != null) {
            boolean flag = false;

            for (Map.Entry<String, Object> values : conditions.entrySet()) {
                if (values.getValue() != null) {
                    String tableName = mainTableColumns.contains(values.getKey().toLowerCase()) ? MAIN_TABLE : values.getKey();
                    if (values.getValue().getClass().toString().contains("String") || values.getValue().getClass().toString()
                        .contains("Date") || values.getValue().getClass().isEnum()) {
                        if (ManyToOneColumns.containsKey(tableName)) {
                            if (!flag) {
                                condition.append(" WHERE ").append(MAIN_TABLE + ".").append(ManyToOneColumns.get(tableName))
                                    .append(" = '").append(values.getValue()).append("'");
                                flag = true;
                            } else {
                                condition.append(" AND ").append(MAIN_TABLE + ".").append(ManyToOneColumns.get(tableName))
                                    .append(" = '").append(values.getValue()).append("'");
                            }
                            continue;
                        }

                        if (foreignKeyColumns.containsKey(tableName)) {
                            if (!flag) {
                                condition.append(" WHERE ").append(tableName + ".").append(foreignKeyColumns.get(tableName))
                                    .append(" = '").append(values.getValue()).append("'");
                                flag = true;
                            } else {
                                condition.append(" AND ").append(tableName + ".").append(foreignKeyColumns.get(tableName))
                                    .append(" = '").append(values.getValue()).append("'");
                            }
                            continue;
                        }

                        if (!flag) {
                            condition.append(" WHERE ").append(tableName + ".").append(values.getKey()).append(" = '")
                                .append(values.getValue())
                                .append("'");
                            flag = true;
                        } else {
                            condition.append(" AND ").append(tableName + ".").append(values.getKey()).append(" = '")
                                .append(values.getValue())
                                .append("'");
                        }
                    } else {
                        if (ManyToOneColumns.containsKey(tableName)) {
                            if (!flag) {
                                condition.append(" WHERE ").append(MAIN_TABLE + ".").append(ManyToOneColumns.get(tableName))
                                    .append(" = ").append(values.getValue());
                                flag = true;
                            } else {
                                condition.append(" AND ").append(MAIN_TABLE + ".").append(ManyToOneColumns.get(tableName))
                                    .append(" = ").append(values.getValue());
                            }
                            continue;
                        }

                        if (foreignKeyColumns.containsKey(tableName)) {
                            if (!flag) {
                                condition.append(" WHERE ").append(tableName + ".").append(foreignKeyColumns.get(tableName))
                                    .append(" = ").append(values.getValue());
                                flag = true;
                            } else {
                                condition.append(" AND ").append(tableName + ".").append(foreignKeyColumns.get(tableName))
                                    .append(" = ").append(values.getValue());
                            }
                            continue;

                        }
                        if (!flag) {
                            condition.append(" WHERE ").append(tableName + ".").append(values.getKey()).append(" = ")
                                .append(values.getValue());
                            flag = true;
                        } else {
                            condition.append(" AND ").append(tableName + ".").append(values.getKey()).append(" = ")
                                .append(values.getValue());
                        }
                    }
                }
            }
        }
        return condition.toString();
    }

    private Set<String> getTableColumns(String tableName) throws SQLException {
        Set<String> columns = new HashSet<>();
        try (var connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            try (ResultSet rs = metaData.getColumns(null, null, tableName, null)) {
                while (rs.next()) {
                    columns.add(rs.getString("COLUMN_NAME").toLowerCase());
                }
            }
        }
        return columns;
    }

    private void initializeForeignKeyColumns(List<String> joinTables) throws SQLException {
        try (var connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            for (String table : joinTables) {
                try (ResultSet rs = metaData.getImportedKeys(null, null, table)) {
                    while (rs.next()) {
                        String fkColumnName = rs.getString("FKCOLUMN_NAME");
                        if (!fkColumnName.contains(MAIN_TABLE)) {
                            foreignKeyColumns.put(table, fkColumnName);
                        }
                    }
                }
            }
        }

        try (var connection = dataSource.getConnection()) {
            DatabaseMetaData metaData = connection.getMetaData();
            for (String table : joinTables) {
                try (ResultSet rs = metaData.getExportedKeys(null, null, table)) {
                    while (rs.next()) {
                        String fkColumnName = rs.getString("FKCOLUMN_NAME");

                        if (!fkColumnName.contains(MAIN_TABLE)) {
                            ManyToOneColumns.put(table, fkColumnName);
                        }
                    }
                }
            }
        }
    }

}
