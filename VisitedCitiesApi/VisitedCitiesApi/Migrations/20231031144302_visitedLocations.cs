using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VisitedCitiesApi.Migrations
{
    public partial class visitedLocations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VisitedLocation",
                columns: table => new
                {
                    VisitedLocationsId = table.Column<long>(type: "bigint", nullable: false),
                    VisitorsId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VisitedLocation", x => new { x.VisitedLocationsId, x.VisitorsId });
                    table.ForeignKey(
                        name: "FK_VisitedLocation_AspNetUsers_VisitorsId",
                        column: x => x.VisitorsId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VisitedLocation_Locations_VisitedLocationsId",
                        column: x => x.VisitedLocationsId,
                        principalTable: "Locations",
                        principalColumn: "Id");
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1L,
                column: "ConcurrencyStamp",
                value: "4ef60353-fa8b-4161-a97c-588fe26a55f7");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2L,
                column: "ConcurrencyStamp",
                value: "a6159efd-3d0c-4a38-86b6-20befc1e5408");

            migrationBuilder.CreateIndex(
                name: "IX_VisitedLocation_VisitorsId",
                table: "VisitedLocation",
                column: "VisitorsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VisitedLocation");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 1L,
                column: "ConcurrencyStamp",
                value: "1537be10-75c3-4d38-b928-565f664cf6db");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: 2L,
                column: "ConcurrencyStamp",
                value: "d7771bb7-ac2d-4bf4-9acf-eb6cff1ad188");
        }
    }
}
