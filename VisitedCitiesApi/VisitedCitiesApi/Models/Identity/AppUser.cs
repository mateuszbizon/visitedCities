namespace VisitedCitiesApi.Models.Identity
{
    public class AppUser : IdentityUser<long>, IDatabaseModel
    {
        public virtual List<Location> VisitedLocations { get; set; }
    }
}
