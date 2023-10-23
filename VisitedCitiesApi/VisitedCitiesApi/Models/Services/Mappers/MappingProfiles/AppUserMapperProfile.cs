namespace VisitedCitiesApi.Models.Services.Mappers.MappingProfiles
{
    public class AppUserMapperProfile : Profile
    {
        public AppUserMapperProfile()
        {
            CreateMap<AppUser, UserModel>();
        }
    }
}
