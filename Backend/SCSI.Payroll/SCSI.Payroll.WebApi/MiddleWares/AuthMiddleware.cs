using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SCSI.Payroll.WebApi.MiddleWares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly FirebaseApp _firebaseApp;

        public AuthMiddleware(RequestDelegate next, FirebaseApp firebaseApp)
        {
            _next = next;
            _firebaseApp = firebaseApp;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            try
            {
                if (httpContext.Request.Headers.ContainsKey("Authorization"))
                {
                    var authHeader = httpContext.Request.Headers["Authorization"].ToString();
                    var token = authHeader.Replace("Bearer ", "");
                    var auth = FirebaseAdmin.Auth.FirebaseAuth.GetAuth(_firebaseApp);
                    var tokenDecoded = await auth.VerifyIdTokenAsync(token);
                    var uid = tokenDecoded.Uid;
                    var claimsIdentity = new ClaimsIdentity(new[] { new Claim(ClaimTypes.NameIdentifier, uid) });
                    httpContext.User = new ClaimsPrincipal(claimsIdentity);
                }
            }
            catch (FirebaseAuthException)
            {
                httpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
                await httpContext.Response.WriteAsync("Invalid firebase token");
                return;
            }
            finally
            {
                await _next(httpContext);
            }
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class AuthMiddlewareExtensions
    {
        public static IApplicationBuilder UseAuthMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuthMiddleware>();
        }
    }
}
