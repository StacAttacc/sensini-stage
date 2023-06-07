using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Models.Entities;

namespace SCSI.Payroll.WebApi.Controllers
{
    [Route("api/tax/v1/social-contribution")]
    [ApiController]
    public class TaxController : ControllerBase
    {
        private ITaxBusiness _taxBusiness;
        public TaxController(ITaxBusiness taxBusiness)
        {
            this._taxBusiness = taxBusiness;
        }

        [HttpGet("social-contributions")]
        [ProducesResponseType(typeof(List<SocialContribution>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSocialContributionsAsync()
        {
            var socialContributions = await _taxBusiness.GetSocialContributionsAsync();
            return Ok(socialContributions);
        }

        [HttpGet("social-contribution-by-id")]
        [ProducesResponseType(typeof(SocialContribution), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSocialContributionByIdAsync(int id)
        {
            var socialContribution = await _taxBusiness.GetSocialContributionByIdAsync(id);
            return Ok(socialContribution);
        }

        [HttpDelete("social-contribution-delete-by-id")]
        [ProducesResponseType(typeof(SocialContribution), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteSoialContributionByIdAsync(int id)
        {
            var socialContribution = await _taxBusiness.DeleteSocialContributionByIdAsync(id);
            return Ok(socialContribution);
        }

        [HttpPost("social-contribution")]
        [ProducesResponseType(typeof(SocialContribution),StatusCodes.Status200OK)]
        public async Task<IActionResult> SaveSocialContributionAsync([FromBody] SocialContribution socialContribution)
        {
            _taxBusiness.SaveSocialContributionsAsync(socialContribution);
            return Ok(socialContribution);
        }
    }
}
