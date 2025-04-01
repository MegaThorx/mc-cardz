using McCardz.Domain.Models;
using McCardz.Domain.Repositories;

namespace McCardz.Domain.Dtos;

public class AnswerUpdateDto : IEntityDtoCopy<Answer>
{
    public string Text { get; set; } = string.Empty;

    public bool IsCorrect { get; set; }

    public bool IsAiGenerated { get; set; }


    public void CopyTo(Answer entity)
    {
        entity.Text = Text;
        entity.IsCorrect = IsCorrect;
        entity.IsAiGenerated = IsAiGenerated;
    }
}