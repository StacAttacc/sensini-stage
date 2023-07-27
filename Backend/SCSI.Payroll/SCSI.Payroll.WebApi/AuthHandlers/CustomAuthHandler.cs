
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using SCSI.Payroll.Models.Constants;

namespace SCSI.Payroll.WebApi.AuthHandlers
{
    public class CustomAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        //private HttpContext _context;

        public CustomAuthHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock)
        : base(options, logger, encoder, clock)
        {
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (Context == null)
            {
                return Task.FromResult(AuthenticateResult.Fail(ErrorMessageConst.UnauthorizedAccess));
            }

            var user = Context.User;
            if (user == null)
            {
                return Task.FromResult(AuthenticateResult.Fail(ErrorMessageConst.UnauthorizedAccess));
            }

            if (user.Identity == null)
            {
                return Task.FromResult(AuthenticateResult.Fail(ErrorMessageConst.UnauthorizedAccess));
            }

            if (user != null && user.Identity != null && user.Identity.IsAuthenticated)
            {
                var ticket = new AuthenticationTicket(user, "DefaultAuthScheme");
                return Task.FromResult(AuthenticateResult.Success(ticket));
            }
            else
            {
                return Task.FromResult(AuthenticateResult.NoResult());
            }
        }

        public Task ChallengeAsync(AuthenticationProperties? properties)
        {
            Context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }

        public Task ForbidAsync(AuthenticationProperties? properties)
        {
            Context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        }
    }
}
