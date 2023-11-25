namespace VisitedCitiesApi.Controllers
{
    [JwtAuthorize("User")]
    [Route("api/[controller]")]
    [ApiController]
    public class VisitController : Controller
    {
        private readonly IVisitService _visitService;

        public VisitController(IVisitService visitService)
        {
            _visitService = visitService;
        }

        [HttpPost("Visit/{locationId}")]
        public async Task<ServiceResponse> VisitLocation(int locationId)
        {
            return await _visitService.VisitLocation(locationId);
        }

        [HttpDelete("Unvisit/{locationId}")]
        public async Task<ServiceResponse> UnvisitLocation(int locationId)
        {
            return await _visitService.UnvisitLocation(locationId);
        }

        [HttpGet("GetVisitedLocations")]
        public async Task<ServiceResponse> GetVisitedLocations()
        {
            return await _visitService.GetVisitedLocations();
        }
    }
}
