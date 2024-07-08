namespace SolvedCCG.Api.Entities;

public class GameRule
{
    public int Id { get; set; }

    public required string UserExtension { get; set; }

    public required string Name { get; set; }

    public required bool TurnBased { get; set; }

    public required bool PlayTurns { get; set; }

    public required bool PlayPoints { get; set; }

    public required bool ActionBased { get; set; }

    public required bool EnergyBased { get; set; }

    public required bool MultiEnergy { get; set; }

    public required bool Abilities { get; set; }

    public required bool Power { get; set; }

    public required bool SimoPlay { get; set; }

    public required bool MultiLocate { get; set; }
}
