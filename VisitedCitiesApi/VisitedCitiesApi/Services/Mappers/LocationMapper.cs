namespace VisitedCitiesApi.Services.Mappers
{
    public class LocationMapper : MapperService<Location, LocationModel>, ILocationMapper
    {
        public LocationMapper(IMapper mapper) : base(mapper)
        {
        }
    }
}
