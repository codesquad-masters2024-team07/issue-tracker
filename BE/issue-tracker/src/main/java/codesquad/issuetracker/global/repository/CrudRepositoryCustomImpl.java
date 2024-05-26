package codesquad.issuetracker.global.repository;

import codesquad.issuetracker.utils.FieldnameConverter;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;

@Slf4j
public class CrudRepositoryCustomImpl<T, ID> implements CrudRepositoryCustom<T, ID> {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    public CrudRepositoryCustomImpl(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    public void update(Object id, Object entity) {
        try {
            Map<String, Object> fieldsToUpdate = new HashMap<>();
            Field[] fields = entity.getClass().getDeclaredFields();
            entity.getClass().getSuperclass().getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);
                Object value = field.get(entity);
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

            String tableName = entity.getClass().getSimpleName().toUpperCase();
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