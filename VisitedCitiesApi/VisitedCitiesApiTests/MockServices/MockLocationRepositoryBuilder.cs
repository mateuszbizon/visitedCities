namespace VisitedCitiesApiTests.MockServices
{
    public class MockLocationRepositoryBuilder : IMockBuilder<ILocationRepository>
    {
        private Mock<ILocationRepository> mock = new Mock<ILocationRepository>();

        public MockLocationRepositoryBuilder SetupFindByConditions(Location location)
        {
            mock.Setup(x => x.FindByConditions(It.IsAny<Expression<Func<Location, bool>>>()))
                   .ReturnsAsync(new List<Location>() { location });
            return this;
        }

        public MockLocationRepositoryBuilder SetupFindByConditionsFirstOrDefault(Location location)
        {
            mock.Setup(x => x.FindByConditionsFirstOrDefault(It.IsAny<Expression<Func<Location, bool>>>()))
                   .ReturnsAsync( location );
            return this;
        }

        public MockLocationRepositoryBuilder SetupEdit(Location location)
        {
            mock.Setup(x => x.Edit(location));
            return this;
        }

        public Mock<ILocationRepository> GetMock()
        {
            return mock;
        }
    }
}
