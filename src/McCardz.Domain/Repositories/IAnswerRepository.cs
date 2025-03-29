using McCardz.Domain.Dtos;
using McCardz.Domain.Models;

namespace McCardz.Domain.Repositories
{
    public interface IAnswerRepository : IRepository<Answer, AnswerCreateDto, AnswerUpdateDto>
    {
        Task<IReadOnlyCollection<Answer>> FindByQuestionAsync(int questionId);
    }
}
