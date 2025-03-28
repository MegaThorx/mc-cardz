using McCardz.API.Models;
using McCardz.Application.Services;
using McCardz.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace McCardz.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthenticationController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ITokenService _tokenService;

    public AuthenticationController(UserManager<ApplicationUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<ResponseDto>> Register([FromBody]RegisterDto register)
    {
        if (await _userManager.FindByNameAsync(register.Username) != null)
        {
            return BadRequest(new ResponseDto
            {
                Status = "Error",
                Message = "Username already taken."
            });
        }

        var user = new ApplicationUser
        {
            UserName = register.Username,
            NormalizedUserName = register.Username.ToUpper(),
            Email = register.Email,
            NormalizedEmail = register.Email.ToUpper()
        };

        var result = await _userManager.CreateAsync(user, register.Password);

        if (!result.Succeeded)
        {
            return BadRequest(new ResponseDto
            {
                Status = "Error",
                Message = string.Join('\n', result.Errors.Select(e => e.Description))
            });
        }
        
        return new ResponseDto
        {
            Status = "Success",
            Message = "Succesfully registered"
        };
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        var user = await _userManager.FindByNameAsync(model.Username);
        if (user is not null && await _userManager.CheckPasswordAsync(user, model.Password))
        {
            return Ok(await _tokenService.GenerateAccessTokenAsync(user));
        }

        return Unauthorized(new ResponseDto
        {
            Status = "Error",
            Message = "Username or password is incorrect."
        });
    }
}
