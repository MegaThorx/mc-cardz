using McCardz.Domain.Models;
using McCardz.Domain.Repositories;
using McCardz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace McCardz.Infrastructure.Repositories;

public class QuestionRepository : IQuestionRepository
{
    private readonly ApplicationDbContext _context;

    public QuestionRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Question> AddAsync(Question entity)
    {
        _context.Questions.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<IReadOnlyCollection<Question>> FindAllAsync()
    {
        return await _context.Questions.ToListAsync();
    }

    public async Task<IReadOnlyCollection<Question>> FindByTopicAsync(int topicId)
    {
        return await _context.Questions.Where(x => x.TopicId == topicId).ToListAsync();
    }

    public async Task<Question?> FindByIdAsync(int id)
    {
        return await _context.Questions.FindAsync(id);
    }

    public async Task<Question> UpdateAsync(Question entity)
    {
        var existing = await _context.Questions.FindAsync(entity.Id);

        if (existing is null)
            throw new ArgumentException("Question does not exist.");

        _context.Questions.Update(existing);
        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task DeleteAsync(Question entity)
    {
        var existing = await _context.Questions.FindAsync(entity.Id);

        if (existing is null)
            throw new ArgumentException("Question does not exist.");

        _context.Questions.Remove(existing);
        await _context.SaveChangesAsync();
    }
}
