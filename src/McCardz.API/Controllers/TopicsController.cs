using McCardz.Domain.Dtos;
using McCardz.Domain.Models;
using McCardz.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace McCardz.API.Controllers;

[ApiController]
[Route("api/topics")]
[Authorize]
public class TopicsController : ControllerBase
{
    private readonly IQuestionRepository _questionRepository;
    private readonly ITopicRepository _topicRepository;

    public TopicsController(ITopicRepository topicRepository, IQuestionRepository questionRepository)
    {
        _topicRepository = topicRepository;
        _questionRepository = questionRepository;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Topic>))]
    public async Task<ActionResult<IEnumerable<Topic>>> GetAll()
    {
        return Ok(await _topicRepository.FindAllAsync());
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Topic>> Get(int id)
    {
        var topic = await _topicRepository.FindByIdAsync(id);

        if (topic is null)
            return NotFound();

        return Ok(topic);
    }

    [HttpGet("{id}/questions")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<Question>>> GetAllQuestions(int id)
    {
        var topic = await _topicRepository.FindByIdAsync(id);

        if (topic is null)
            return NotFound();

        var questions = await _questionRepository.FindByTopicAsync(topic.Id); //implement FindByTopicAsync

        return Ok(questions);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Topic>> Post(TopicCreateDto topicCreate)
    {
        var newTopic = await _topicRepository.AddAsync(topicCreate);

        return CreatedAtAction(nameof(Get), new { id = newTopic.Id }, newTopic);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Topic>> Put(int id, TopicUpdateDto topic)
    {
        var originalTopic = await _topicRepository.FindByIdAsync(id);

        if (originalTopic is null)
            return NotFound();

        return Ok(await _topicRepository.UpdateAsync(originalTopic.Id, topic));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Topic>> Delete(int id)
    {
        var topic = await _topicRepository.FindByIdAsync(id);

        if (topic is null)
            return NotFound();

        await _topicRepository.DeleteAsync(topic.Id);

        return Ok(topic);
    }
}