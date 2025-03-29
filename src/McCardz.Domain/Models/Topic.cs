using McCardz.Domain.Repositories;

namespace McCardz.Domain.Models;

public class Topic : IEntity
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
}

