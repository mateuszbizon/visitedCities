using VisitedCitiesApi.Models.Database;

namespace VisitedCitiesApi.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, long>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Location> Locations { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = Program.configuration["VisitedCitiesDBConnectionAzure"];
            optionsBuilder.UseSqlServer(connectionString);

            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppRole>().HasData(
                new AppRole { Id = 1, Name = "Admin", NormalizedName = "ADMIN" },
                new AppRole { Id = 2, Name = "User", NormalizedName = "USER" }
                );

            modelBuilder.Entity<Location>()
                .HasMany(h => h.Visitors)
                .WithMany(t => t.VisitedLocations)
                .UsingEntity<Dictionary<string, object>>(
                "VisitedLocation",
                x => x.HasOne<AppUser>().WithMany().OnDelete(DeleteBehavior.NoAction),
                x => x.HasOne<Location>().WithMany().OnDelete(DeleteBehavior.NoAction)
            );

            base.OnModelCreating(modelBuilder);
        }
    }
}