using McCardz.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace McCardz.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<Topic> Topics { get; set; }

    public DbSet<Question> Questions { get; set; }

    public DbSet<Answer> Answers { get; set; }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Answer>()
            .HasOne<Question>()
            .WithMany()
            .HasForeignKey(x => x.QuestionId)
            .HasPrincipalKey(x => x.Id);

        modelBuilder.Entity<Question>()
            .HasOne<Topic>()
            .WithMany()
            .HasForeignKey(x => x.TopicId)
            .HasPrincipalKey(x => x.Id);
    }
}
