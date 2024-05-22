package codesquad.issuetracker.label;

import codesquad.issuetracker.utils.FieldnameConverter;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
public class LabelCustomRepositoryImpl<T> implements LabelCustomRepository<T> {

    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final MapSqlParameterSource parameters = new MapSqlParameterSource();

    @Autowired
    public LabelCustomRepositoryImpl(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Label> labelRowMapper = ((rs, rowNum) -> Label.builder()
        .id(rs.getLong("id"))
        .name(rs.getString("name"))
        .description(rs.getString("description"))
        .textColor(TextColor.valueOf(rs.getString("text_color")))
        .backgroundColor(rs.getString("background_color"))
        .isDeleted(rs.getBoolean("is_deleted"))
        .build());

    @Override
    public Page<Label> findAll(Pageable pageable) {
        String query = "SELECT * FROM LABEL WHERE IS_DELETED = FALSE LIMIT :limit OFFSET :offset";
        parameters.addValue("limit", pageable.getPageSize());
        parameters.addValue("offset", pageable.getOffset());
        List<Label> labels = jdbcTemplate.query(query, parameters, labelRowMapper);

        String countQuery = "SELECT COUNT(*) FROM LABEL WHERE IS_DELETED = FALSE";
        Long total = jdbcTemplate.queryForObject(countQuery, parameters, Long.class);
        return new PageImpl<>(labels, pageable, total);
    }

    @Override
    public void update(Long id, Object model) {
        try {
            Map<String, Object> fieldsToUpdate = new HashMap<>();
            Field[] fields = model.getClass().getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);
                Object value = field.get(model);
                if (field.getType().isEnum()) {
                    value = value.toString();
                }
                if (value != null) {
                    fieldsToUpdate.put(FieldnameConverter.convertToSnakeCase(field.getName()), value);
                }
            }

            if (fieldsToUpdate.isEmpty()) {
                return;
            }

            StringJoiner setClause = new StringJoiner(", ");
            fieldsToUpdate.forEach((field, value) -> setClause.add(field + " = :" + field));

            String tableName = model.getClass().getSimpleName().toUpperCase();
            String sql = "UPDATE " + tableName + " SET " + setClause + " WHERE id = :id";
            fieldsToUpdate.put("id", id);

            MapSqlParameterSource parameters = new MapSqlParameterSource(fieldsToUpdate);

            log.info("sql: {}", sql);
            jdbcTemplate.update(sql, parameters);
        } catch (IllegalAccessException e) {
            throw new RuntimeException("업데이트 과정에서 필드 접근에 실패했습니다.", e);
        }
    }

}
