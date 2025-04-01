using McCardz.Domain.Dtos;
using McCardz.Domain.Models;

namespace McCardz.Domain.Repositories;

public interface ITopicRepository : IRepository<Topic, TopicCreateDto, TopicUpdateDto>
{
}