using SolvedCCG.Api.Dtos;
using SolvedCCG.Api.Entities;

namespace SolvedCCG.Api.Mapping;

public static class RuleMapping
{
    public static GameRule ToEntity(this CreateRuleDto rule)
    {
        return new GameRule()
        {
            Name = rule.Name,
            TurnBased = rule.TurnBased,
            PlayTurns = rule.PlayTurns,
            PlayPoints = rule.PlayPoints,
            ActionBased = rule.ActionBased,
            EnergyBased = rule.EnergyBased,
            MultiEnergy = rule.MultiEnergy,
            Abilities = rule.Abilities,
            Power = rule.Power,
            SimoPlay = rule.SimoPlay,
            MultiLocate = rule.MultiLocate
        };
    }

    public static RuleDto ToRuleDto(this GameRule rule)
    {
        return new(
            rule.Id,
            rule.Name,
            rule.TurnBased,
            rule.PlayTurns,
            rule.PlayPoints,
            rule.ActionBased,
            rule.EnergyBased,
            rule.MultiEnergy,
            rule.Abilities,
            rule.Power,
            rule.SimoPlay,
            rule.MultiLocate
        );
    }

    public static GameRule ToEntity(this UpdateRuleDto rule, int id)
    {
        return new GameRule()
        {
            Id = id,
            Name = rule.Name,
            TurnBased = rule.TurnBased,
            PlayTurns = rule.PlayTurns,
            PlayPoints = rule.PlayPoints,
            ActionBased = rule.ActionBased,
            EnergyBased = rule.EnergyBased,
            MultiEnergy = rule.MultiEnergy,
            Abilities = rule.Abilities,
            Power = rule.Power,
            SimoPlay = rule.SimoPlay,
            MultiLocate = rule.MultiLocate
        };
    }
}
