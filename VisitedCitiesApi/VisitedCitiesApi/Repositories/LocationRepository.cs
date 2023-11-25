namespace VisitedCitiesApi.Repositories
{
    public class LocationRepository : BaseRepository<Location>, ILocationRepository
    {
        public LocationRepository(DataContext context) : base(context)
        {
        }

        public async override Task<IEnumerable<Location>> FindByConditions(Expression<Func<Location, bool>> expresion)
        {
            return await QueryWithIncludes(_context.Set<Location>()).Where(expresion).Take(100).ToListAsync();
        }

        public override IQueryable<Location> QueryWithIncludes(DbSet<Location> querry)
        {
            return querry.Include(l => l.Visitors);
        }
    }
}
