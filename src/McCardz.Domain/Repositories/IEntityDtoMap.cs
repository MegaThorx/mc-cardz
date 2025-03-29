namespace McCardz.Domain.Repositories;

public interface IEntityDtoMap<T> where T : IEntity
{
    void MapTo(T entity);
}
