namespace VisitedCitiesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("GoogleExternalLogin")]
        public async Task<ServiceResponse> GoogleExternalLogin(TokenRequest tokenRequest)
        {
            return await _accountService.GoogleExternalLogin(tokenRequest);
        }
    }
}
