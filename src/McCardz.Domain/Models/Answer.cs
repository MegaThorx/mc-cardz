﻿using McCardz.Domain.Repositories;

namespace McCardz.Domain.Models;

public class Answer : IEntity
{
    public string Text { get; set; } = string.Empty;

    public bool IsCorrect { get; set; }

    public bool IsAiGenerated { get; set; }

    public int QuestionId { get; set; }
    public int Id { get; set; }
}