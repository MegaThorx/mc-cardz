using McCardz.Domain.Repositories;

namespace McCardz.Domain.Models;

public class Question : IEntity
{
    public int Id { get; set; }

    public string Text { get; set; } = string.Empty;

    public int TopicId { get; set; }
}

