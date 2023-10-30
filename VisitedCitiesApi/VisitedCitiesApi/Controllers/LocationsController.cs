namespace VisitedCitiesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationsController : Controller
    {
        private readonly ILocationsService _locationsService;

        public LocationsController(ILocationsService locationsService)
        {
            _locationsService = locationsService;
        }

        [HttpPost("GetLocations")]
        public async Task<ServiceResponse> GetLocations([FromBody]GetLocationsParameters getLocationsParameters)
        {
            return await _locationsService.GetLocations(getLocationsParameters);
        }
    }
}
