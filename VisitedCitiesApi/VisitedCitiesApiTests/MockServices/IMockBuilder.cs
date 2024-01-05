using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VisitedCitiesApiTests.MockServices
{
    public interface IMockBuilder<T> where T : class
    {
        public Mock<T> GetMock();
    }
}
