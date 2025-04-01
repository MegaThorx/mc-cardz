using McCardz.Domain.Dtos;
using McCardz.Domain.Models;
using McCardz.Domain.Repositories;
using McCardz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace McCardz.Infrastructure.Repositories;

public class QuestionRepository : RepositoryBase<Question, QuestionCreateDto, QuestionUpdateDto>, IQuestionRepository
{
    private readonly ApplicationDbContext _context;

    public QuestionRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IReadOnlyCollection<Question>> FindByTopicAsync(int topicId)
    {
        return await _context.Questions.Where(x => x.TopicId == topicId).ToListAsync();
    }
}