namespace McCardz.Domain.Repositories;

public interface IRepository<TEntity, TEntityCreateDto, TEntityUpdateDto> 
    where TEntity : class, IEntity, new() 
    where TEntityCreateDto : IEntityDtoMap<TEntity> 
    where TEntityUpdateDto : IEntityDtoMap<TEntity>
{
    Task<IReadOnlyCollection<TEntity>> FindAllAsync();

    Task<TEntity> AddAsync(TEntityCreateDto entity);

    Task<TEntity?> FindByIdAsync(int id);

    Task<TEntity> UpdateAsync(int id, TEntityUpdateDto entity);

    Task DeleteAsync(int id);
}
