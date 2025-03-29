using McCardz.Domain.Models;
using McCardz.Domain.Repositories;

namespace McCardz.Domain.Dtos;

public class TopicUpdateDto : IEntityDtoMap<Topic>
{
    public string Name { get; set; }

    public void MapTo(Topic entity)
    {
        entity.Name = Name;
    }
}

