using VisitedCitiesApi.Middlewares;
using VisitedCitiesApi.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

ServicesConfigurator.ConfigureSwagger(builder);
ServicesConfigurator.ConfigureDatabase(builder);
ServicesConfigurator.ConfigureIdentity(builder);
ServicesConfigurator.ConfigureServices(builder.Services);

builder.Services.AddCors(options =>
{
    options.AddPolicy("corspolicy",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});

configuration = builder.Configuration;
var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("corspolicy");

app.UseMiddleware<ExceptionMiddleware>();
app.UseMiddleware<ServiceResponseMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();

public partial class Program
{
    public static IConfiguration configuration { get; private set; }
}