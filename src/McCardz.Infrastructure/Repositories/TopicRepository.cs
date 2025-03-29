using McCardz.Domain.Dtos;
using McCardz.Domain.Models;
using McCardz.Domain.Repositories;
using McCardz.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace McCardz.Infrastructure.Repositories;

public class TopicRepository : RepositoryBase<Topic, TopicCreateDto, TopicUpdateDto>, ITopicRepository
{
    private readonly ApplicationDbContext _context;

    public TopicRepository(ApplicationDbContext context) : base(context)
    {
        _context = context;
    }
}
