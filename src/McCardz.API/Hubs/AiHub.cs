using Microsoft.AspNetCore.SignalR;

namespace McCardz.API.Hubs;


public interface IAiHub
{
    Task ReceiveMessage(string user, string message);
}
public class AiHub : Hub
{


    public async Task SendMessage(string user, string message)
    {



        await Clients.AllExcept(Context.ConnectionId).SendAsync("ReceiveMessage", user, message);
    }
}
