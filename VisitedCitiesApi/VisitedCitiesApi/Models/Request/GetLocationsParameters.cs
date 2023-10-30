namespace VisitedCitiesApi.Models.Request
{
    public class GetLocationsParameters
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
        public string? Commune { get; set; }
        public string? District { get; set; }
        public string? Province { get; set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }
        public double? Precision { get; set; }
    }
}
