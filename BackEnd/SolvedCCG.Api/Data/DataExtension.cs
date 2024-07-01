using Microsoft.EntityFrameworkCore;

namespace SolvedCCG.Api.Data;

public static class DataExtension
{
    public static async Task MigrateDbAsync(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<SolvedCCGContext>();
        await dbContext.Database.MigrateAsync();
    }
}
