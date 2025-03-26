using McCardz.Application.Models;
using McCardz.Domain.Models;

namespace McCardz.Application.Services;

public interface ITokenService
{
    Task<TokenDto> GenerateAccessTokenAsync(ApplicationUser user);
}
