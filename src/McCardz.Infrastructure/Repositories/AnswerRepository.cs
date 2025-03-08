using McCardz.Domain.Models;
using McCardz.Domain.Repositories;
using McCardz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace McCardz.Infrastructure.Repositories;

public class AnswerRepository : RepositoryBase<Answer>, IAnswerRepository
{
    public AnswerRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IReadOnlyCollection<Answer>> FindByQuestionAsync(int questionId)
    {
        return await Context.Answers.Where(x => x.QuestionId == questionId).ToListAsync();
    }
}
