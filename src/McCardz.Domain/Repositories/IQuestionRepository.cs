using McCardz.Domain.Models;

namespace McCardz.Domain.Repositories;

public interface IQuestionRepository : IRepository<Question>
{
    Task<IReadOnlyCollection<Question>> FindByTopicAsync(int topicId);
}
