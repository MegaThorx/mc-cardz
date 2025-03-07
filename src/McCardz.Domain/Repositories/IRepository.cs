namespace McCardz.Domain.Repositories;

public interface IRepository<T> where T : IEntity
{
    Task<IReadOnlyCollection<T>> FindAllAsync();

    Task<T> AddAsync(T entity);

    Task<T?> FindByIdAsync(int id);

    Task<T> UpdateAsync(T entity);

    Task DeleteAsync(T entity);
}
