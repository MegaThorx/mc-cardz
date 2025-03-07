using McCardz.Domain.Models;

namespace McCardz.Domain.Repositories
{
    public interface IAnswerRepository : IRepository<Answer>
    {
        Task<IReadOnlyCollection<Answer>> FindByQuestionAsync(int questionId);
    }
}
