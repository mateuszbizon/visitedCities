namespace VisitedCitiesApi.Models.Identity
{
    public class UserLoginResponse
    {
        public string Token { get; set; }
        public UserModel User { get; set; }
    }
}
