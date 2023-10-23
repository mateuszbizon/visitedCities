namespace VisitedCitiesApi.Interfaces.Services
{
    public interface IAccountService
    {
        public Task<ServiceResponse> GoogleExternalLogin(TokenRequest tokenRequest);
    }
}
