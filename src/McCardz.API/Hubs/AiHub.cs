using Microsoft.AspNetCore.SignalR;

namespace McCardz.API.Hubs;


public interface IAiHub
{
    Task ReceiveMessage(string identifier, string answer);
}
public class AiHub : Hub
{


    public async Task SendMessage(string identifier, string question)
    {
        var answer = "";
        await Clients.AllExcept(Context.ConnectionId).SendAsync("ReceiveMessage", identifier, answer);
    }
}
