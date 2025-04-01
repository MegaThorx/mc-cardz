using McCardz.Domain.Dtos;
using McCardz.Domain.Models;

namespace McCardz.Domain.Repositories;

public interface IQuestionRepository : IRepository<Question, QuestionCreateDto, QuestionUpdateDto>
{
    Task<IReadOnlyCollection<Question>> FindByTopicAsync(int topicId);
}