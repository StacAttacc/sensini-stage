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

        private ITaxBracketBusiness _taxBracketBusiness;
        private IGovernmentBusiness _governmentBusiness;
        private IFiscalYearBusiness _fiscalYearBusiness;

        public TaxController(   ITaxBusiness taxBusiness,
                                ITaxBracketBusiness taxBracketBusiness,
                                IGovernmentBusiness governmentBusiness,
                                IFiscalYearBusiness fiscalYearBusiness
        )
        {
            this._taxBusiness = taxBusiness;
            this._taxBracketBusiness =  taxBracketBusiness;
            this._governmentBusiness = governmentBusiness;
            this._fiscalYearBusiness = fiscalYearBusiness;
        }

        #region getAlls
        [HttpGet("social-contributions")]
        [ProducesResponseType(typeof(List<SocialContribution>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSocialContributionsAsync()
        {
            var socialContributions = await _taxBusiness.GetSocialContributionsAsync();
            return Ok(socialContributions);
        }

        [HttpGet("tax-brackets")]
        [ProducesResponseType(typeof(List<TaxBracket>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTaxBracketsAsync()
        {
            var taxBrackets = await _taxBracketBusiness.GetTaxBracketsAsync();
            return Ok(taxBrackets);
        }

        [HttpGet("fiscal-years")]
        [ProducesResponseType(typeof(List<FiscalYear>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetFiscalYearsAsync()
        {
            var fiscalYears = await _fiscalYearBusiness.GetAllFiscalYearsAsync();
            return Ok(fiscalYears);
        }

        [HttpGet("governments")]
        [ProducesResponseType(typeof(List<Government>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetGovernmentsAsync()
        {
            var governments = await _governmentBusiness.GetGovernmentsAsync();
            return Ok(governments);
        }
        #endregion




        #region getById
        [HttpGet("social-contribution-by-id")]
        [ProducesResponseType(typeof(SocialContribution), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSocialContributionByIdAsync(int id)
        {
            var socialContribution = await _taxBusiness.GetSocialContributionByIdAsync(id);
            return Ok(socialContribution);
        }

        [HttpGet("tax-bracket-by-id")]
        [ProducesResponseType(typeof(TaxBracket), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTaxBracketByIdAsync(int id)
        {
            var taxBracket = await _taxBracketBusiness.GetTaxBracketByIdAsync(id);
            return Ok(taxBracket);
        }

        [HttpGet("fiscal-year-by-id")]
        [ProducesResponseType(typeof(FiscalYear), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetFiscalYearByIdAsync(int id)
        {
            var fiscalYear = await _fiscalYearBusiness.GetFiscalYearByIdAsync(id);
            return Ok(fiscalYear);
        }

        [HttpGet("fiscal-year-by-year")]
        [ProducesResponseType(typeof(FiscalYear), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetFiscalYearByYearAsync(int year)
        {
            var fiscalYear = await _fiscalYearBusiness.GetFiscalYearByYearAsync(year);
            return Ok(fiscalYear);
        }

        [HttpGet("government-by-id")]
        [ProducesResponseType(typeof(Government), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetGovernmentByIdAsync(int id)
        {
            var government = await _governmentBusiness.GetGovernmentByIdAsync(id);
            return Ok(government);
        }

        [HttpGet("government-by-code")]
        [ProducesResponseType(typeof(Government), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetGovernmentByCodeAsync(string code)
        {
            var government = await _governmentBusiness.GetGovernmentByCodeAsync(code);
            return Ok(government);
        }
        #endregion




        #region deleteById
        [HttpDelete("social-contribution-delete-by-id")]
        [ProducesResponseType(typeof(SocialContribution), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteSoialContributionByIdAsync(int id)
        {
            var socialContribution = await _taxBusiness.DeleteSocialContributionByIdAsync(id);
            return Ok(socialContribution);
        }

        [HttpDelete("tax-bracket-delete-by-id")]
        [ProducesResponseType(typeof(TaxBracket), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteTaxBracketByIdAsync(int id)
        {
            var taxBracket = await _taxBracketBusiness.DeleteTaxBracketByIdAsync(id);
            return Ok(taxBracket);
        }

        [HttpDelete("fiscal-year-delete-by-id")]
        [ProducesResponseType(typeof(FiscalYear), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteFiscalYearByIdAsync(int id)
        {
            var fiscalYear = await _fiscalYearBusiness.DeleteFiscalYearByIdAsync(id);
            return Ok(fiscalYear);
        }

        [HttpDelete("government-delete-by-id")]
        [ProducesResponseType(typeof(Government), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteGovernmentByIdAsync(int id)
        {
            var government = await _governmentBusiness.DeleteGovernmentByIdAsync(id);
            return Ok(government);
        }
        #endregion



        #region Saves
        [HttpPost("social-contribution")]
        [ProducesResponseType(typeof(SocialContribution),StatusCodes.Status200OK)]
        public async Task<IActionResult> SaveSocialContributionAsync([FromBody] SocialContribution socialContribution)
        {
            await _taxBusiness.SaveSocialContributionsAsync(socialContribution);
            return Ok(socialContribution);
        }

        [HttpPost("tax-bracket")]
        [ProducesResponseType(typeof(TaxBracket), StatusCodes.Status200OK)]
        public async Task<IActionResult> SaveTaxBracketAsync([FromBody] TaxBracket taxBracket)
        {
            await _taxBracketBusiness.SaveTaxBracketAsync(taxBracket);
            return Ok(taxBracket);
        }

        [HttpPost("fiscal-year")]
        [ProducesResponseType(typeof(FiscalYear), StatusCodes.Status200OK)]
        public async Task<IActionResult> SaveFiscalYearAsync([FromBody] FiscalYear fiscalYear)
        {
            await _fiscalYearBusiness.SaveFiscalYearAsync(fiscalYear);
            return Ok(fiscalYear);
        }

        [HttpPost("government")]
        [ProducesResponseType(typeof(Government), StatusCodes.Status200OK)]
        public async Task<IActionResult> SaveGovernmentAsync([FromBody] Government government)
        {
            await _governmentBusiness.SaveGovernmentAsync(government);
            return Ok(government);
        }
        #endregion
    }
}
