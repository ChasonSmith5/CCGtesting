namespace SolvedCCG.Api.Dtos;

public record class RuleDto(
    int Id, 
    string Name, 
    bool TurnBased, 
    bool PlayTurns, 
    bool PlayPoints, 
    bool ActionBased,
    bool EnergyBased, 
    bool MultiEnergy, 
    bool Abilities, 
    bool Power, 
    bool SimoPlay, 
    bool MultiLocate
);
