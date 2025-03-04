using McCardz.Domain.Repositories;

namespace McCardz.Domain.Models;

public class Answer : IEntity
{
    public int Id { get; set; }

    public required string Text { get; set; }

    public bool IsCorrect { get; set; }

    public bool IsAiGenerated { get; set; }

    public int QuestionId { get; set; }
}
