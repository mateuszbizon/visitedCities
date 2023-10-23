namespace VisitedCitiesApi.Interfaces.Services.Mappers
{
    public interface IMapperService<D, C> where D : IDatabaseModel where C : IClientModel
    {
        public D MapToDatabaseModel(C clientModel);
        public C MapToClientModel(D dbModel);
    }
}
