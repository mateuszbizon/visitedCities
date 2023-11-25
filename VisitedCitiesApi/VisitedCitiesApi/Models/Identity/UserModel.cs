namespace VisitedCitiesApi.Models.Identity
{
    public class UserModel : IClientModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string ProfilePictureLink { get; set; }
    }
}
