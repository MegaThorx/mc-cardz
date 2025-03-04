using McCardz.Domain.Models;
using McCardz.Domain.Repositories;

namespace McCardz.Infrastructure.Repositories;

public class TopicRepository : ITopicRepository
{
    public Task<Topic> AddAsync(Topic entity)
    {
        throw new NotImplementedException();
    }

    public Task DeleteAsync(Topic entity)
    {
        throw new NotImplementedException();
    }

    public Task<IReadOnlyCollection<Topic>> FindAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Topic> FindByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Topic> UpdateAsync(Topic entity)
    {
        throw new NotImplementedException();
    }
}
