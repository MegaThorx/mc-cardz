using McCardz.Domain.Models;
using McCardz.Domain.Repositories;

namespace McCardz.Domain.Dtos;

public class AnswerCreateDto : IEntityDtoMap<Answer>
{
    public string Text { get; set; }

    public bool IsCorrect { get; set; }

    public bool IsAiGenerated { get; set; }

    public int QuestionId { get; set; }


    public void MapTo(Answer entity)
    {
        entity.Text = Text;
        entity.IsCorrect = IsCorrect;
        entity.IsAiGenerated = IsAiGenerated;
        entity.QuestionId = QuestionId;
    }
}