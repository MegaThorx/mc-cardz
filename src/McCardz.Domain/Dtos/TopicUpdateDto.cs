using McCardz.Domain.Models;
using McCardz.Domain.Repositories;

namespace McCardz.Domain.Dtos;

public class TopicUpdateDto : IEntityDtoCopy<Topic>
{
    public string Name { get; set; }

    public void CopyTo(Topic entity)
    {
        entity.Name = Name;
    }
}