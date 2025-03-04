using McCardz.Domain.Repositories;

namespace McCardz.Domain.Models;

public class Question : IEntity
{
    public int Id { get; set; }

    public required string Text { get; set; }

    public int TopicId { get; set; }
}

