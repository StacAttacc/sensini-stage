using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Mvc;

namespace SCSI.Payroll.WebApi.Controllers
{
    [Route("api/users/login")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        private FirebaseAuth _auth;

        public UserManagementController(FirebaseAuth auth)
        {
            _auth = auth;
        }

        [HttpPost("makeAdmin")]
        public async Task<IActionResult> MakeAdmin(string uid)
        {
            var claims = new Dictionary<string, object>()
            {
                { "admin", true }
            };

            await _auth.SetCustomUserClaimsAsync(uid, claims);

            return Ok();
        }

    }
}
