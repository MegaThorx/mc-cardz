using McCardz.Domain.Models;
using McCardz.Infrastructure.Data.Configurations;
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
        
        modelBuilder.ApplyConfigurationsFromAssembly(GetType().Assembly);
    }
}
