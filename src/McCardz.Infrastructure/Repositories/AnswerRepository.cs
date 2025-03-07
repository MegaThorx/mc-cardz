using McCardz.Domain.Models;
using McCardz.Domain.Repositories;
using McCardz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace McCardz.Infrastructure.Repositories;

public class AnswerRepository : IAnswerRepository
{
    private readonly ApplicationDbContext _context;

    public AnswerRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Answer> AddAsync(Answer entity)
    {
        _context.Answers.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task<IReadOnlyCollection<Answer>> FindAllAsync()
    {
        return await _context.Answers.ToListAsync();
    }

    public async Task<IReadOnlyCollection<Answer>> FindByQuestionAsync(int questionId)
    {
        return await _context.Answers.Where(x => x.QuestionId == questionId).ToListAsync();
    }

    public async Task<Answer?> FindByIdAsync(int id)
    {
        return await _context.Answers.FindAsync();
    }

    public async Task<Answer> UpdateAsync(Answer entity)
    {
        var existing = await _context.Answers.FindAsync(entity.Id);

        if (existing == null)
            throw new ArgumentException("Answer does not exist.");

        _context.Entry(existing).CurrentValues.SetValues(entity);

        _context.Answers.Update(existing);
        await _context.SaveChangesAsync();
        return existing;
    }

    public async Task DeleteAsync(Answer entity)
    {
        var existing = await _context.Answers.FindAsync(entity.Id);

        if (existing == null)
            throw new ArgumentException("Answer does not exist.");

        _context.Answers.Remove(existing);
        await _context.SaveChangesAsync();
    }
}
