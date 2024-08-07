﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SolvedCCG.Api.Data;

#nullable disable

namespace SolvedCCG.Api.Data.Migrations
{
    [DbContext(typeof(SolvedCCGContext))]
    [Migration("20240703212328_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.2");

            modelBuilder.Entity("SolvedCCG.Api.Entities.GameRule", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Abilities")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("ActionBased")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("EnergyBased")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("MultiEnergy")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("MultiLocate")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<bool>("PlayPoints")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("PlayTurns")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Power")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("SimoPlay")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("TurnBased")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserExtension")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Rules");
                });
#pragma warning restore 612, 618
        }
    }
}
