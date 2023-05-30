using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SCSI.Payroll.Models.Entities;

namespace SCSI.Payroll.WebApi.Controllers
{
    [Route("api/human-ressources/v1")]
    [ApiController]
    public class HumanRessourcesController : ControllerBase
    {
        public HumanRessourcesController() { 
        
        }

        [HttpGet("employees")]
        public async Task<IActionResult> GetEmployees() {
            await Task.Delay(1);

            var employees = new List<Employee>()
            {
                new Employee()
            };
            return Ok(employees);
        }
    }
}
