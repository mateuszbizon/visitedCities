namespace VisitedCitiesApi.Services
{
    public class LocationsService : ILocationsService
    {
        private readonly ILocationRepository _locationRepository;

        public LocationsService(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        public async Task<ServiceResponse> GetLocations(GetLocationsParameters getLocationsParameters)
        {
            Expression<Func<Location, bool>> filter = CreateFilterByCommune(getLocationsParameters);

            var locations = await _locationRepository.FindByConditions(CreateFilterByCommune(getLocationsParameters));

            return ServiceResponse<List<Location>>.Success(locations.ToList(), $"Found results: {locations.Count()}");
        }

        private Expression<Func<Location, bool>> CreateFilterByCommune(GetLocationsParameters getLocationsParameters)
        {
            return l =>
            (getLocationsParameters.Name == null || l.Name.ToLower() == getLocationsParameters.Name.ToLower()) &&
            (getLocationsParameters.District == null || l.District.ToLower() == getLocationsParameters.District.ToLower()) &&
            (getLocationsParameters.Commune == null || l.Commune.ToLower() == getLocationsParameters.Commune.ToLower()) &&
            (getLocationsParameters.Province == null || l.Province.ToLower() == getLocationsParameters.Province.ToLower()) &&
            (getLocationsParameters.Type == null || l.Type.ToLower() == getLocationsParameters.Type.ToLower()) &&
            (getLocationsParameters.Precision == null || getLocationsParameters.Latitude == null || getLocationsParameters.Precision > Math.Abs((double)(getLocationsParameters.Latitude - l.Latitude))) &&
            (getLocationsParameters.Precision == null || getLocationsParameters.Longitude == null || getLocationsParameters.Precision > Math.Abs((double)(getLocationsParameters.Longitude - l.Longitude)));
        }
    }
}
