using SolvedCCG.Api.Entities;
using Microsoft.EntityFrameworkCore;
using SQLitePCL; // Make sure to include this using statement

namespace SolvedCCG.Api.Data
{
    public class SolvedCCGContext : DbContext
    {
        public SolvedCCGContext(DbContextOptions<SolvedCCGContext> options)
            : base(options)
        {
            Batteries.Init(); // Initialize SQLite
        }

        public DbSet<GameRule> Rules => Set<GameRule>();

        //preload data
        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     modelBuilder.Entity<dataType>().HasData(
        // }
    }
}
