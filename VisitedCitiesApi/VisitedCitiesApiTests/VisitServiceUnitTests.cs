using Autofac.Extras.Moq;

namespace VisitedCitiesApiTests
{
    public class VisitServiceUnitTests
    {
        [Fact]
        public async Task GetVisitedLocations_GetLocations()
        {
            //Arrange
            var visitor = GetSampleUser;
            var location = GetSampleLocation(new List<AppUser> { visitor });
            var mappedLocation = GetSampleLocationModel;

            var mockLocationRepository = new MockLocationRepositoryBuilder()
                .SetupFindByConditions(location).GetMock();
            var mockAccountService = new MockAccountServiceBuilder()
                .SetupGetCurrentUser(visitor).GetMock();
            var mockLocationMapper = new MockLocationMapperBuilder()
                .SetupMapToClientModel(location, mappedLocation).GetMock();

            VisitService visitService = new(
                 mockLocationRepository.Object,
                 mockAccountService.Object,
                 mockLocationMapper.Object
                );

            //Act
            var locationsResponse = (ServiceResponse<List<LocationModel>>)(await visitService.GetVisitedLocations());

            //Assert
            Assert.NotNull(locationsResponse);
            Assert.Equal(HttpStatusCode.OK, locationsResponse.StatusCode);
            Assert.NotNull(locationsResponse.Content);
            Assert.Contains<LocationModel>(mappedLocation, locationsResponse.Content);
        }

        [Fact]
        public async Task VisitLocation_Valid()
        {
            //Arrange
            var visitor = GetSampleUser;
            var location = GetSampleLocation(null);

            var mockLocationRepository = new MockLocationRepositoryBuilder().SetupFindByConditionsFirstOrDefault(location).SetupEdit(location).GetMock();
            var mockAccountService = new MockAccountServiceBuilder().SetupGetCurrentUser(visitor).GetMock();
            var mockLocationMapper = new MockLocationMapperBuilder().GetMock();

            VisitService visitService = new(
                 mockLocationRepository.Object,
                 mockAccountService.Object,
                 mockLocationMapper.Object
                );

            //Act
            var locationsResponse = await visitService.VisitLocation((int)location.Id);

            //Assert
            Assert.NotNull(locationsResponse);
            Assert.Equal(HttpStatusCode.OK, locationsResponse.StatusCode);
            mockLocationRepository.Verify(x => x.Edit(location), Times.Once());
        }

        [Fact]
        public async Task UnvisitLocation_Valid()
        {
            //Arrange
            var visitor = GetSampleUser;
            var location = GetSampleLocation(new List<AppUser> { visitor });

            var mockLocationRepository = new MockLocationRepositoryBuilder().SetupFindByConditionsFirstOrDefault(location).SetupEdit(location).GetMock();
            var mockAccountService = new MockAccountServiceBuilder().SetupGetCurrentUser(visitor).GetMock();
            var mockLocationMapper = new MockLocationMapperBuilder().GetMock();

            VisitService visitService = new(
                 mockLocationRepository.Object,
                 mockAccountService.Object,
                 mockLocationMapper.Object
                );

            //Act
            var locationsResponse = await visitService.UnvisitLocation((int)location.Id);

            //Assert
            Assert.NotNull(locationsResponse);
            Assert.Equal(HttpStatusCode.OK, locationsResponse.StatusCode);
            mockLocationRepository.Verify(x => x.Edit(location), Times.Once());
        }

        private AppUser GetSampleUser => new AppUser { Id = 1 };

        private List<AppUser> GetSampleUsers => new List<AppUser> {
            new AppUser {Id = 1},
            new AppUser {Id = 2},
            new AppUser {Id = 3}
        };

        private Location GetSampleLocation(List<AppUser>? visitors) => new Location
        {
            Id = 1,
            Visitors = visitors ?? new List<AppUser>()
        };

        private LocationModel GetSampleLocationModel => new LocationModel { Id = 1 };
    }
}