namespace VisitedCitiesApi.Services
{
    public class VisitService : IVisitService
    {
        private readonly ILocationRepository _locationRepository;
        private readonly IAccountService _accountService;
        private readonly ILocationMapper _locationMapper;

        public VisitService(ILocationRepository locationRepository, IAccountService accountService, ILocationMapper locationMapper)
        {
            _locationRepository = locationRepository;
            _accountService = accountService;
            _locationMapper = locationMapper;
        }

        public async Task<ServiceResponse> GetVisitedLocations()
        {
            var currentUser = await _accountService.GetCurrentUser();
            if (currentUser is null)
            {
                return ServiceResponse.Error("User does not exist.", HttpStatusCode.NotFound);
            }

            var locations = await _locationRepository.FindByConditions(l => l.Visitors.Contains(currentUser));
            var mappedLocations = new List<LocationModel>();

            foreach(var location in locations)
            {
                mappedLocations.Add(_locationMapper.MapToClientModel(location));
            }

            return ServiceResponse<List<LocationModel>>.Success(mappedLocations, "Visited locations retrieved.");
        }

        public async Task<ServiceResponse> UnvisitLocation(int locationId)
        {
            var location = await _locationRepository.FindByConditionsFirstOrDefault(l => l.Id == locationId);
            if (location is null)
            {
                return ServiceResponse.Error("Location does not exist.", HttpStatusCode.NotFound);
            }

            var currentUser = await _accountService.GetCurrentUser();
            if (currentUser is null)
            {
                return ServiceResponse.Error("User does not exist.", HttpStatusCode.NotFound);
            }

            if(!location.Visitors.Any(l => l.Id == currentUser.Id))
            {
                return ServiceResponse.Error("Location not visited.");
            }

            location.Visitors.Remove(currentUser);
            await _locationRepository.Edit(location);

            return ServiceResponse.Success("Location unvisited.");
        }

        public async Task<ServiceResponse> VisitLocation(int locationId)
        {
            var location = await _locationRepository.FindByConditionsFirstOrDefault(l => l.Id == locationId);
            if(location is null)
            {
                return ServiceResponse.Error("Location does not exist.", HttpStatusCode.NotFound);
            }

            var currentUser = await _accountService.GetCurrentUser();
            if(currentUser is null)
            {
                return ServiceResponse.Error("User does not exist.", HttpStatusCode.NotFound);
            }

            if (location.Visitors.Any(u => u.Id == currentUser.Id))
            {
                return ServiceResponse.Error("Location already visited.");
            }

            location.Visitors.Add(currentUser);
            await _locationRepository.Edit(location);

            return ServiceResponse.Success("Location visited.");
        }
    }
}
