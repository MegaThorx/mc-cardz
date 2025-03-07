using McCardz.Domain.Models;
using McCardz.Domain.Repositories;
using McCardz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace McCardz.Infrastructure.Repositories;

public class TopicRepository : ITopicRepository
{
    private readonly ApplicationDbContext _context;

    public TopicRepository(ApplicationDbContext context)
    {
        _context = context;
    }
        
    public async Task<Topic> AddAsync(Topic entity)
    {
        _context.Topics.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<IReadOnlyCollection<Topic>> FindAllAsync()
    {
        return await _context.Topics.ToListAsync();
    }

    public async Task<Topic?> FindByIdAsync(int id)
    {
        return await _context.Topics.FindAsync(id);
    }

    public async Task<Topic> UpdateAsync(Topic entity)
    {
        var existing = await FindByIdAsync(entity.Id);

        if (existing is null)
            throw new ArgumentException("Topic does not exist.");

        _context.Entry(existing).CurrentValues.SetValues(entity);

        _context.Topics.Update(existing);
        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task DeleteAsync(Topic entity)
    {
        var existing = await _context.Topics.FindAsync(entity.Id);

        if (existing is null)
            throw new ArgumentException("Topic does not exist.");

        _context.Topics.Remove(existing);
        await _context.SaveChangesAsync();
    }
}
