using McCardz.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace McCardz.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthenticationController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IConfiguration _configuration;

    public AuthenticationController(UserManager<IdentityUser> userManager, IConfiguration configuration)
    {
        _userManager = userManager;
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<ActionResult<ResponseDto>> Register([FromBody]RegisterDto register)
    {
        if (await _userManager.FindByNameAsync(register.Username) != null)
        {
            return BadRequest("Username already taken");
        }

        var user = new IdentityUser
        {
            UserName = register.Username,
            NormalizedUserName = register.Username.ToUpper(),
            Email = register.Email,
            NormalizedEmail = register.Email.ToUpper()
        };

        await _userManager.AddPasswordAsync(user, register.Password);

        return new ResponseDto
        {
            Status = "Success",
            Message = "Succesfully registered"
        };
    }
}
