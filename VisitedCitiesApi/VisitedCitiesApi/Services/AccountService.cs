namespace VisitedCitiesApi.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserMapper _mapper;
        private readonly AuthenticationSettings _authenticationSettings;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AccountService(AuthenticationSettings authenticationSettings, IUserMapper mapper, UserManager<AppUser> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _authenticationSettings = authenticationSettings;
            _mapper = mapper;
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ServiceResponse> GoogleExternalLogin(TokenRequest tokenRequest)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var encodedToken = tokenHandler.ReadToken(tokenRequest.Token);
            var decodedToken = encodedToken as JwtSecurityToken;

            var userEmail = decodedToken.Claims.FirstOrDefault(c => c.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                AppUser newUser = new AppUser { Email = userEmail, UserName = userEmail };
                newUser.EmailConfirmed = true;
                var result = await _userManager.CreateAsync(newUser, "@Aa1234" + Guid.NewGuid().ToString().ToUpper());
                user = await _userManager.FindByEmailAsync(userEmail);
                await _userManager.AddToRoleAsync(newUser, "User");
            }

            var securityStamp = _userManager.GetSecurityStampAsync(user);
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("AspNet.Identity.SecurityStamp", user.SecurityStamp),
            };
            claims.AddRange(await GetUserRoles(user));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Program.configuration["JwtKey"]));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);
            var token = new JwtSecurityToken(_authenticationSettings.JwtIssuer, _authenticationSettings.JwtIssuer, claims, expires: expires, signingCredentials: cred);

            var loginUserResponse = new UserLoginResponse
            {
                Token = tokenHandler.WriteToken(token),
                User = _mapper.MapToClientModel(user)
            };

            return ServiceResponse<UserLoginResponse>.Success(loginUserResponse, "Login with google successful.");
        }

        public async Task<AppUser> GetCurrentUser()
        {
            var authHeader = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].FirstOrDefault();
            var token = authHeader.Substring("Bearer ".Length);
            var handler = new JwtSecurityTokenHandler();
            var claims = handler.ReadJwtToken(token).Claims;
            var userIdClaim = claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            return await _userManager.FindByIdAsync(userIdClaim.Value);
        }

        private async Task<List<Claim>> GetUserRoles(AppUser? user)
        {
            List<Claim> userRoles = new();
            foreach (string role in await _userManager.GetRolesAsync(user))
            {
                userRoles.Add(new Claim(ClaimTypes.Role, role));
            }

            return userRoles;
        }
    }
}
