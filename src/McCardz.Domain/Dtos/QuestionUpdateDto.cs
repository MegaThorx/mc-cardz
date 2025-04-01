using McCardz.Domain.Models;
using McCardz.Domain.Repositories;

namespace McCardz.Domain.Dtos;

public class QuestionUpdateDto : IEntityDtoCopy<Question>
{
    public string Text { get; set; } = string.Empty;

    public void CopyTo(Question entity)
    {
        entity.Text = Text;
    }
}