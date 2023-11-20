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
            var locations = await _locationRepository.FindByConditions(Filter(getLocationsParameters));
            var mappedLocations = new List<LocationModel>();
            foreach(var location in locations)
            {
                mappedLocations.Add(_locationMapper.MapToClientModel(location));
            }

            return ServiceResponse<List<LocationModel>>.Success(mappedLocations, $"Found results: {mappedLocations.Count()}");
        }

        private Expression<Func<Location, bool>> Filter(GetLocationsParameters getLocationsParameters)
        {
            return l =>
            (getLocationsParameters.Name == null
                || (getLocationsParameters.LocationSearchParameters.ExactMatch ? l.Name.ToLower() == getLocationsParameters.Name.ToLower() 
                : l.Name.ToLower().Contains(getLocationsParameters.Name.ToLower()))) &&

            (getLocationsParameters.District == null 
                || (getLocationsParameters.LocationSearchParameters.ExactMatch ? l.District.ToLower() == getLocationsParameters.District.ToLower() 
                : l.District.ToLower().Contains(getLocationsParameters.District.ToLower()))) &&

            (getLocationsParameters.Commune == null 
                || (getLocationsParameters.LocationSearchParameters.ExactMatch ? l.Commune.ToLower() == getLocationsParameters.Commune.ToLower() 
                : l.Commune.ToLower().Contains(getLocationsParameters.Commune.ToLower()))) &&

            (getLocationsParameters.Province == null 
                || (getLocationsParameters.LocationSearchParameters.ExactMatch ? l.Province.ToLower() == getLocationsParameters.Province.ToLower() 
                : l.Province.ToLower().Contains(getLocationsParameters.Province.ToLower()))) &&

            (getLocationsParameters.Type == null 
                || (getLocationsParameters.LocationSearchParameters.ExactMatch ? l.Type.ToLower() == getLocationsParameters.Type.ToLower() 
                : l.Type.ToLower().Contains(getLocationsParameters.Type.ToLower()))) &&

            (getLocationsParameters.Precision == null 
                || getLocationsParameters.Latitude == null || getLocationsParameters.Precision > Math.Abs((double)(getLocationsParameters.Latitude - l.Latitude))) &&

            (getLocationsParameters.Precision == null 
                || getLocationsParameters.Longitude == null || getLocationsParameters.Precision > Math.Abs((double)(getLocationsParameters.Longitude - l.Longitude)));
        }
    }
}
