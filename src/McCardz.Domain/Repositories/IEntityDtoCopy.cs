namespace McCardz.Domain.Repositories;

public interface IEntityDtoCopy<T> where T : IEntity
{
    void CopyTo(T entity);
}