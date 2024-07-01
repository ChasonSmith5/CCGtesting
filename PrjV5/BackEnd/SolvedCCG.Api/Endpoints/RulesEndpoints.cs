using System.Data;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.EntityFrameworkCore;
using SolvedCCG.Api.Data;
using SolvedCCG.Api.Dtos;
using SolvedCCG.Api.Entities;
using SolvedCCG.Api.Mapping;

namespace SolvedCCG.Api.Endpoints;

public static class RulesEndpoints
{

    const string GetRuleEndpointName = "GetRule";
    
    public static RouteGroupBuilder MapRulesEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("rules").WithParameterValidation();

        //GET rules
        group.MapGet("/", async (SolvedCCGContext dbContext) =>
            await dbContext.Rules.Select(rule => rule.ToRuleDto()).AsNoTracking().ToListAsync());

        //GET rules #
        group.MapGet("/{id}", async (int id, SolvedCCGContext dbContext) => 
        {
            GameRule? rule = await dbContext.Rules.FindAsync(id);

            return rule is null ? Results.NotFound() : Results.Ok(rule.ToRuleDto());
        })
        .WithName(GetRuleEndpointName);

        //POST rules
        group.MapPost("/", async (CreateRuleDto newRule, SolvedCCGContext dbContext) =>
        {
            GameRule rule = newRule.ToEntity();

            dbContext.Rules.Add(rule);
            await dbContext.SaveChangesAsync();

            return Results.CreatedAtRoute(GetRuleEndpointName, new { id = rule.Id}, rule.ToRuleDto());
        });

        //PUT rules
        group.MapPut("/{id}", async (int id, UpdateRuleDto updatedRule, SolvedCCGContext dbContext) =>
        {
            var existingRule = await dbContext.Rules.FindAsync(id);

            if(existingRule is null){
                return Results.NotFound();
            }

            dbContext.Entry(existingRule).CurrentValues.SetValues(updatedRule.ToEntity(id));
            await dbContext.SaveChangesAsync();

            return Results.NoContent();
        });

        //DELETE rules #
        group.MapDelete("/{id}", async (int id, SolvedCCGContext dbContext) =>
        {
            await dbContext.Rules.Where(rule => rule.Id == id).ExecuteDeleteAsync();

            return Results.NoContent();
        });

        return group;
    }
}
