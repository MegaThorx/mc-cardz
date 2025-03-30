using System.Text.Json.Serialization;

namespace McCardz.Infrastructure.Models;

public class GeminiResponse
{
    [JsonPropertyName("candidates")]
    public List<GeminiResponseCandidate> Candidates { get; set; }
}

public class GeminiResponseCandidate
{
    [JsonPropertyName("content")]
    public GeminiResponseContent Content { get; set; }
}

public class GeminiResponseContent
{
    [JsonPropertyName("parts")]
    public List<GeminiResponsePart> Parts { get; set; }
}

public class GeminiResponsePart
{
    [JsonPropertyName("text")]
    public string Text { get; set; }
}