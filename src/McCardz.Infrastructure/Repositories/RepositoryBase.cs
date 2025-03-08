using McCardz.Domain.Repositories;
using McCardz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace McCardz.Infrastructure.Repositories;

public abstract class RepositoryBase<T> : IRepository<T> where T : class, IEntity
{
    protected readonly ApplicationDbContext Context;

    public RepositoryBase(ApplicationDbContext context)
    {
        Context = context;
    }
    
    public async Task<IReadOnlyCollection<T>> FindAllAsync()
    {
        return await Context.Set<T>().ToListAsync();
    }

    public async Task<T> AddAsync(T entity)
    {
        Context.Set<T>().Add(entity);
        await Context.SaveChangesAsync();
        return entity;
    }

    public async Task<T?> FindByIdAsync(int id)
    {
        return await Context.Set<T>().FindAsync(id);
    }

    public async Task<T> UpdateAsync(T entity)
    {
        var existing = await FindByIdAsync(entity.Id);

        if (existing is null)
            throw new ArgumentException("Entity does not exist.");
        
        Context.Entry(existing).CurrentValues.SetValues(entity);
        // _context.Set<T>().Update(existing); TODO: Check if this actually needed. Entities fetched with ef core should be tracked by default
        await Context.SaveChangesAsync();

        return existing;
    }

    public async Task DeleteAsync(T entity)
    {
        var existing = await FindByIdAsync(entity.Id);

        if (existing is null)
            throw new ArgumentException("Entity does not exist.");
        
        Context.Set<T>().Remove(existing);
        await Context.SaveChangesAsync();
    }
}