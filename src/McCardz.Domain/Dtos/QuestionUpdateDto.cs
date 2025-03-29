using McCardz.Domain.Models;
using McCardz.Domain.Repositories;

namespace McCardz.Domain.Dtos;

public class QuestionUpdateDto : IEntityDtoMap<Question>
{
    public string Text { get; set; }

    public void MapTo(Question entity)
    {
        entity.Text = Text;
    }
}
