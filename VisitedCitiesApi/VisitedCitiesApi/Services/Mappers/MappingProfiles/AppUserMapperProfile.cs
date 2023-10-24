namespace VisitedCitiesApi.Services.Mappers.MappingProfiles
{
    public class AppUserMapperProfile : Profile
    {
        public AppUserMapperProfile()
        {
            CreateMap<AppUser, UserModel>();
        }
    }
}
