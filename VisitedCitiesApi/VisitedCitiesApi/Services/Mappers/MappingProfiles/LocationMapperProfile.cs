namespace VisitedCitiesApi.Services.Mappers.MappingProfiles
{
    public class LocationMapperProfile : Profile
    {
        public LocationMapperProfile()
        {
            CreateMap<Location, LocationModel>();
        }
    }
}
