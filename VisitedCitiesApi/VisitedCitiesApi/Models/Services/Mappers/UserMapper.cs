﻿namespace VisitedCitiesApi.Models.Services.Mappers
{
    public class UserMapper : MapperService<AppUser, UserModel>, IUserMapper
    {
        public UserMapper(IMapper mapper) : base(mapper)
        {
        }
    }
}