using McCardz.Domain.Repositories;

namespace McCardz.Domain.Models;

public class Topic : IEntity
{
    public string Name { get; set; } = string.Empty;
    public int Id { get; set; }
}