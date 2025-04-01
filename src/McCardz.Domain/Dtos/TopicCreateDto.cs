using McCardz.Domain.Models;
using McCardz.Domain.Repositories;

namespace McCardz.Domain.Dtos;

public class TopicCreateDto : IEntityDtoCopy<Topic>
{
    public string Name { get; set; } = string.Empty;

    public void CopyTo(Topic entity)
    {
        entity.Name = Name;
    }
}