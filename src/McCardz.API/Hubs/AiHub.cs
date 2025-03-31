using McCardz.Application.Services;
using Microsoft.AspNetCore.SignalR;

namespace McCardz.API.Hubs;


public interface IAiHub
{
    Task ReceiveMessage(string identifier, string answer);
}
public class AiHub : Hub
{
    private readonly IAiService _aiService;

    public AiHub(IAiService aiService)
    {
        _aiService = aiService;
    }

    public async Task SendMessage(string identifier, string question)
    {
        var answer = await _aiService.GetAiResponseAsync($"Generate a incorrect answer to the question `{question}`");
        await Clients.Caller.SendAsync("ReceiveMessage", identifier, answer);
    }
}
