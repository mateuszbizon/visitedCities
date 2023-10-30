namespace VisitedCitiesApi.Interfaces.Services
{
    public interface ILocationsService
    {
        public Task<ServiceResponse> GetLocations(GetLocationsParameters getLocationsParameters);
    }
}
