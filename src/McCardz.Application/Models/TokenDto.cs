namespace McCardz.Application.Models;

public class TokenDto
{
    public string Token { get; init; }

    public string Id { get; init; }

    public DateTime Expiration { get; init; }

    public IList<string> Roles { get; init; }
}