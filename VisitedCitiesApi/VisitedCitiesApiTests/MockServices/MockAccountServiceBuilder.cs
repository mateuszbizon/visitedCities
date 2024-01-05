using Microsoft.Extensions.DependencyInjection;

namespace VisitedCitiesApiTests.MockServices
{
    public class MockAccountServiceBuilder : IMockBuilder<IAccountService>
    {
        private Mock<IAccountService> mock = new Mock<IAccountService>();

        public MockAccountServiceBuilder SetupGetCurrentUser(AppUser appUser)
        {
            mock.Setup(m => m.GetCurrentUser()).ReturnsAsync(appUser);
            return this;
        }

        public Mock<IAccountService> GetMock()
        {
            return mock;
        }
    }
}
