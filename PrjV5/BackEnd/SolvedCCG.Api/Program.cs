using SolvedCCG.Api.Data;
using SolvedCCG.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

var connString = builder.Configuration.GetConnectionString("SolvedCCG");
builder.Services.AddSqlite<SolvedCCGContext>(connString);

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("159.203.66.87",
        builder =>
        {
            builder.WithOrigins("http://127.0.0.1:5500")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
    options.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin());
});

var app = builder.Build();

// Use CORS middleware
app.UseCors("159.203.66.87");
app.UseCors(options => options.AllowAnyOrigin());

app.MapRulesEndpoints();

await app.MigrateDbAsync();

app.Run();
