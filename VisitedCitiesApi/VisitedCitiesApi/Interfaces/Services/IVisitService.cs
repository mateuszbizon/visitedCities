namespace VisitedCitiesApi.Interfaces.Services
{
    public interface IVisitService
    {
        public Task<ServiceResponse> VisitLocation(int locationId);
        public Task<ServiceResponse> UnvisitLocation(int locationId);
        public Task<ServiceResponse> GetVisitedLocations();
    }
}
