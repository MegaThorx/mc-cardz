using McCardz.Domain.Models;
using McCardz.Domain.Repositories;
using McCardz.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace McCardz.API.Controllers;

[ApiController]
[Route("api/questions")]
public class QuestionsController : ControllerBase
{
    private readonly IQuestionRepository _questionRepository;

    public QuestionsController(IQuestionRepository questionRepository)
    {
        _questionRepository = questionRepository;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Question>>> GetAll()
    {
        return Ok(await _questionRepository.FindAllAsync());
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Question>> Get(int id)
    {
        var question = await _questionRepository.FindByIdAsync(id);

        if (question is null)
            return NotFound();

        return Ok(question);
    }

    [HttpGet("{id}/answers")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<IEnumerable<Answer>>> GetAllAnswers(int id) 
    {
        var question = await _questionRepository.FindByIdAsync(id);

        if (question is null)
            return NotFound();

        var answers = await _questionRepository.FindByIdAsync(question.Id); //implement FindByQuestionAsync

        return Ok(answers);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Question>> Post(Question question)
    {
        var newQuestion = await _questionRepository.AddAsync(question);

        return CreatedAtAction(nameof(Get), new { id = newQuestion.Id}, newQuestion);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Question>> Put(int id, Question question)
    {
        var originalQuestion = await _questionRepository.FindByIdAsync(id);

        if (originalQuestion is null)
            return NotFound();

        originalQuestion.Text = question.Text;
        originalQuestion.TopicId = question.TopicId;

        return Ok(await _questionRepository.UpdateAsync(originalQuestion));
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Question>> Delete(int id)
    {
        var question = await _questionRepository.FindByIdAsync(id);

        if (question is null)
            return NotFound();

        await _questionRepository.DeleteAsync(question);

        return Ok(question);
    }
}
