namespace VisitedCitiesApi.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                HandleException(context, exception);
            }
        }

        private void HandleException(HttpContext context, Exception exception)
        {
            _logger.LogError("Exception message: " + exception.Message + "\n" +
                "Exception Source: " + exception.Source + "\n" +
                "Exception Stack Trace: " + exception.StackTrace + "\n");

            if (exception.InnerException is not null)
            {
                _logger.LogError("Inner Exception message: " + exception.InnerException.Message + "\n" +
                    "Inner Exception Source: " + exception.InnerException.Source + "\n" +
                    "Inner Exception Stack Trace: " + exception.InnerException.StackTrace + "\n");
            }

            if (exception is SecurityTokenValidationException)
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                context.Response.WriteAsJsonAsync(ServiceResponse.Error(
                $"Unauthorized. Invalid token.", (HttpStatusCode)context.Response.StatusCode)).Wait();
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                context.Response.WriteAsJsonAsync(ServiceResponse.Error(
                $"Error ocurred at {context.GetRouteValue("controller")}, {context.GetRouteValue("action")}. {exception.Message}"
                , (HttpStatusCode)context.Response.StatusCode)).Wait();
            }
        }
    }
}
