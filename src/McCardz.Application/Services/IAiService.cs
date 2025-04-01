namespace McCardz.Application.Services;

public interface IAiService
{
    Task<string> GetAiResponseAsync(string prompt);
}