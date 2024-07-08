using System.ComponentModel.DataAnnotations;

namespace SolvedCCG.Api.Dtos;

public record class UpdateRuleDto(
    [Required][StringLength(50)] string UserExtension,
    [Required][StringLength(50)] string Name, 
    [Required] bool TurnBased, 
    [Required] bool PlayTurns, 
    [Required] bool PlayPoints, 
    [Required] bool ActionBased,
    [Required] bool EnergyBased, 
    [Required] bool MultiEnergy, 
    [Required] bool Abilities, 
    [Required] bool Power, 
    [Required] bool SimoPlay, 
    [Required] bool MultiLocate
);
