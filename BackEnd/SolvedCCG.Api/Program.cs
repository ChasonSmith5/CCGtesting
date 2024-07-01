using SolvedCCG.Api.Data;
using SolvedCCG.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("SolvedCCG");
builder.Services.AddSqlite<SolvedCCGContext>(connString);

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder =>
        {
            builder.WithOrigins("http://127.0.0.1:5500")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

// Use CORS middleware
app.UseCors("AllowLocalhost");

app.MapRulesEndpoints();

await app.MigrateDbAsync();

app.Run();
