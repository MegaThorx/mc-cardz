using McCardz.Domain.Dtos;
using McCardz.Domain.Models;
using McCardz.Domain.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace McCardz.API.Controllers;

[ApiController]
[Route("api/questions")]
[Authorize]
public class QuestionsController : ControllerBase
{
    private readonly IAnswerRepository _answersRepository;
    private readonly IQuestionRepository _questionRepository;

    public QuestionsController(IQuestionRepository questionRepository, IAnswerRepository answersRepository)
    {
        _questionRepository = questionRepository;
        _answersRepository = answersRepository;
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

        var answers = await _answersRepository.FindByQuestionAsync(question.Id);

        return Ok(answers);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Question>> Post(QuestionCreateDto question)
    {
        var newQuestion = await _questionRepository.AddAsync(question);

        return CreatedAtAction(nameof(Get), new { id = newQuestion.Id }, newQuestion);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Question>> Put(int id, QuestionUpdateDto question)
    {
        var originalQuestion = await _questionRepository.FindByIdAsync(id);

        if (originalQuestion is null)
            return NotFound();


        return Ok(await _questionRepository.UpdateAsync(originalQuestion.Id, question));
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

        await _questionRepository.DeleteAsync(question.Id);

        return Ok(question);
    }
}