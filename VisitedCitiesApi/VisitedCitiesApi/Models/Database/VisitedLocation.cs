namespace VisitedCitiesApi.Models.Database
{
    public class VisitedLocation
    {
        public long UserId { get; set; }
        public virtual AppUser Visitor { get; set; }

        public long LocationId { get; set; }
        public virtual Location Location { get; set; }
    }
}
