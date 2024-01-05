namespace VisitedCitiesApiTests.MockServices
{
    public class MockLocationMapperBuilder : IMockBuilder<ILocationMapper>
    {
        private Mock<ILocationMapper> mock = new Mock<ILocationMapper>();

        public MockLocationMapperBuilder SetupMapToClientModel(Location location, LocationModel locationModel)
        {
            mock.Setup(m => m.MapToClientModel(location)).Returns(locationModel);
            return this;
        }

        public Mock<ILocationMapper> GetMock()
        {
            return mock;
        }
    }
}
