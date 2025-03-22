using McCardz.Domain.Models;
using McCardz.Domain.Repositories;
using McCardz.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace McCardz.API.Controllers;

[ApiController]
[Route("api/answers")]
[Authorize]
public class AnswersController : ControllerBase
{
    private readonly IAnswerRepository _answerRepository;

    public AnswersController(IAnswerRepository answerRepository)
    {
        _answerRepository = answerRepository;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<IEnumerable<Answer>>> GetAll()
    {
        return Ok(await _answerRepository.FindAllAsync());
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Answer>> Get(int id)
    {
        var answer = await _answerRepository.FindByIdAsync(id);

        if (answer == null)
            return NotFound();

        return Ok(answer);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Answer>> Post(Answer answer)
    {
        var newAnswer = await _answerRepository.AddAsync(answer);

        return CreatedAtAction(nameof(Get), new { id = newAnswer.Id }, newAnswer);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Answer>> Put(int id, Answer answer)
    {
        var originalAnswer = await _answerRepository.FindByIdAsync(id);

        if (originalAnswer is null)
            return NotFound();

        originalAnswer.Text = answer.Text;
        originalAnswer.IsCorrect = answer.IsCorrect;
        originalAnswer.QuestionId = answer.QuestionId;

        return Ok(await _answerRepository.UpdateAsync(originalAnswer));
    }

    [HttpDelete]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Answer>> Delete(int id)
    {
        var answer = await _answerRepository.FindByIdAsync(id);

        if (answer is null)
            return NotFound();

        await _answerRepository.DeleteAsync(answer);

        return Ok(answer);
    }
}
