using McCardz.Domain.Models;
using McCardz.Domain.Repositories;

namespace McCardz.Domain.Dtos;

public class QuestionCreateDto : IEntityDtoMap<Question>
{
    public string Text { get; set; }

    public int TopicId { get; set; }

    public void MapTo(Question entity)
    {
        entity.Text = Text;
        entity.TopicId = TopicId;
    }
}
