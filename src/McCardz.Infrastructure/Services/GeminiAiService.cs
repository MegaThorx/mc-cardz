using System.Text;
using System.Text.Json;
using McCardz.Application.Services;
using McCardz.Infrastructure.Models;
using Microsoft.Extensions.Configuration;

namespace McCardz.Infrastructure.Services;

public class GeminiAiService : IAiService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;

    public GeminiAiService(HttpClient httpClient, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _configuration = configuration;
    }
    
    public async Task<string> GetAiResponseAsync(string prompt)
    {
        var geminiRequest = new GeminiRequest
        {
            Contents = [
                new GeminiRequestContent
                {
                    Parts = [
                        new GeminiRequestPart
                        {
                            Text = prompt,
                        }
                    ]
                }
            ]
        };

        var body = JsonSerializer.Serialize(geminiRequest);
        
        var request = new HttpRequestMessage(HttpMethod.Post, $"{_configuration.GetValue<string>("Gemini:Url")}?key={_configuration.GetValue<string>("Gemini:Key")}");
        request.Content = new StringContent(body, Encoding.UTF8, "application/json");
        var result = await _httpClient.SendAsync(request);
        var response = JsonSerializer.Deserialize<GeminiResponse>(await result.Content.ReadAsStringAsync());
        
        return response?.Candidates.First().Content.Parts.First().Text ?? string.Empty;
    }
}
