using McCardz.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace McCardz.Infrastructure.Data.Configurations;

internal class AnswerConfiguration : IEntityTypeConfiguration<Answer>
{
    public void Configure(EntityTypeBuilder<Answer> builder)
    {
        builder.HasOne<Question>()
            .WithMany()
            .HasForeignKey(x => x.QuestionId)
            .HasPrincipalKey(x => x.Id);
    }
}
