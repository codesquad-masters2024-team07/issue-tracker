package codesquad.issuetracker.label;

import java.util.List;
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

}
