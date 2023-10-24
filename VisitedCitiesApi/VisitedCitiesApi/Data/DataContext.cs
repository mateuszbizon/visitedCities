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
            var connectionString = configuration.GetConnectionString("VisitedCitiesDBConnection");
            optionsBuilder.UseSqlServer(connectionString);

            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppRole>().HasData(
                new AppRole { Id = 1, Name = "Admin", NormalizedName = "ADMIN" },
                new AppRole { Id = 2, Name = "User", NormalizedName = "USER" }
                );

            modelBuilder.Entity<Location>().HasData(
                new Location { Id = 1, Name = "Abramowice Kościelne", Type = "village", Commune = "Głusk", District = "lubelski", Province = "lubelskie",Latitude= 51.190163058783824, Longitude = 22.628096340156684 }
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}