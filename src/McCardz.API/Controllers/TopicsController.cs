using McCardz.Domain.Models;
using McCardz.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace McCardz.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TopicsController : ControllerBase
{
    private readonly ITopicRepository _topicRepository;

    public TopicsController(ITopicRepository topicRepository)
    {
        _topicRepository = topicRepository;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Topic>))]
    public async Task<ActionResult<IEnumerable<Topic>>> GetAll()
    {
        return Ok(await _topicRepository.FindAllAsync());
    }
}