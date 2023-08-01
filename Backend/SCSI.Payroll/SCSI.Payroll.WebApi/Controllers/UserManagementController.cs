using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Mvc;
using SCSI.Payroll.Models.Domains;

namespace SCSI.Payroll.WebApi.Controllers
{
    [Route("api/users/login")]
    [ApiController]
    public class UserManagementController : Controller
    {
        private readonly IConfiguration _configuration;

        public UserManagementController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("login")]
        [ProducesResponseType(typeof(FirebaseToken), StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromBody] string token)
        {
            FirebaseToken decodedToken;
            try
            {
                decodedToken = await FirebaseAdmin.Auth.FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);
            }
            catch (Exception ex)
            {
                throw;
            }
            Response.Cookies.Append("token", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true
            });
            return Ok(decodedToken);
        }

    }
}
