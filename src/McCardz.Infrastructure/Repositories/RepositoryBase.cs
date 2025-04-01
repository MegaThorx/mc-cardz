using McCardz.Domain.Repositories;
using McCardz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace McCardz.Infrastructure.Repositories;

public abstract class
    RepositoryBase<TEntity, TEntityCreateDto, TEntityUpdateDto> : IRepository<TEntity, TEntityCreateDto,
    TEntityUpdateDto>
    where TEntity : class, IEntity, new()
    where TEntityCreateDto : IEntityDtoCopy<TEntity>
    where TEntityUpdateDto : IEntityDtoCopy<TEntity>
{
    protected readonly ApplicationDbContext Context;

    public RepositoryBase(ApplicationDbContext context)
    {
        Context = context;
    }

    public async Task<IReadOnlyCollection<TEntity>> FindAllAsync()
    {
        return await Context.Set<TEntity>().AsNoTracking().ToListAsync();
    }

    public async Task<TEntity> AddAsync(TEntityCreateDto entity)
    {
        var instance = new TEntity();
        entity.CopyTo(instance);
        Context.Set<TEntity>().Add(instance);
        await Context.SaveChangesAsync();
        return instance;
    }

    public async Task<TEntity?> FindByIdAsync(int id)
    {
        return await Context.Set<TEntity>().AsNoTracking().FirstAsync(x => x.Id == id);
    }

    public async Task<TEntity> UpdateAsync(int id, TEntityUpdateDto entity)
    {
        var instance = await Context.Set<TEntity>().FindAsync(id);

        if (instance is null)
            throw new ArgumentException("Entity does not exist.");

        entity.CopyTo(instance);
        await Context.SaveChangesAsync();
        return instance;
    }

    public async Task DeleteAsync(int id)
    {
        var instance = await Context.Set<TEntity>().FindAsync(id);

        if (instance is null)
            throw new ArgumentException("Entity does not exist.");

        Context.Set<TEntity>().Remove(instance);
        await Context.SaveChangesAsync();
    }
}