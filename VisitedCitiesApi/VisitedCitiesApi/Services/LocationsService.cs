namespace VisitedCitiesApi.Services
{
    public class LocationsService : ILocationsService
    {
        private readonly ILocationRepository _locationRepository;
        private readonly ILocationMapper _locationMapper;

        public LocationsService(ILocationRepository locationRepository, ILocationMapper locationMapper)
        {
            _locationRepository = locationRepository;
            _locationMapper = locationMapper;
        }

        public async Task<ServiceResponse> GetLocations(GetLocationsParameters getLocationsParameters)
        {
            var locations = await _locationRepository.FindByConditions(CreateFilterByCommune(getLocationsParameters));
            var mappedLocations = new List<LocationModel>();
            foreach(var location in locations)
            {
                mappedLocations.Add(_locationMapper.MapToClientModel(location));
            }

            return ServiceResponse<List<LocationModel>>.Success(mappedLocations, $"Found results: {mappedLocations.Count()}");
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
