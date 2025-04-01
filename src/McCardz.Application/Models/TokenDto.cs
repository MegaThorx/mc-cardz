namespace McCardz.Application.Models;

public class TokenDto
{
    public string Token { get; init; } = string.Empty;

    public string Id { get; init; } = string.Empty;

    public DateTime Expiration { get; init; }

    public IList<string> Roles { get; init; } = new List<string>();
}