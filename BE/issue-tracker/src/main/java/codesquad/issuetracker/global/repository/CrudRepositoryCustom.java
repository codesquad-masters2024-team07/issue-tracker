package codesquad.issuetracker.global.repository;

public interface CrudRepositoryCustom<T, ID> {

    <S extends T> void update(ID id, S entity);


}
