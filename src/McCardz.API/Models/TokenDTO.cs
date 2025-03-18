namespace McCardz.API.Models
{
    public class TokenDto
    {
        public string Token { get; internal set; }

        public string Id { get; internal set; }

        public DateTime Expiration { get; internal set; }

        public IList<string> Roles { get; internal set; }
    }
}
