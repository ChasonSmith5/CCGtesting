using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SolvedCCG.Api.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    TurnBased = table.Column<bool>(type: "INTEGER", nullable: false),
                    PlayTurns = table.Column<bool>(type: "INTEGER", nullable: false),
                    PlayPoints = table.Column<bool>(type: "INTEGER", nullable: false),
                    ActionBased = table.Column<bool>(type: "INTEGER", nullable: false),
                    EnergyBased = table.Column<bool>(type: "INTEGER", nullable: false),
                    MultiEnergy = table.Column<bool>(type: "INTEGER", nullable: false),
                    Abilities = table.Column<bool>(type: "INTEGER", nullable: false),
                    Power = table.Column<bool>(type: "INTEGER", nullable: false),
                    SimoPlay = table.Column<bool>(type: "INTEGER", nullable: false),
                    MultiLocate = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rules", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rules");
        }
    }
}
