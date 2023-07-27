using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Models.Entities;

namespace SCSI.Payroll.WebApi.Controllers
{
    [Route("api/human-ressources/v1/employees")]
    [ApiController]
    public class HumanRessourcesController : ControllerBase
    {

        private IEmployeeBusiness _employeeBusiness;
        public HumanRessourcesController(IEmployeeBusiness employeeBusiness)
        { 
            _employeeBusiness = employeeBusiness;
        }

        [HttpGet("employees")]
        [ProducesResponseType(typeof(List<Employee>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetEmployees()
        {
            var employees = await _employeeBusiness.GetAllEmployeeListAsync();
            return Ok(employees);
        }

        [HttpGet("employee-by-id")]
        [ProducesResponseType(typeof(Employee), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            var employee = await _employeeBusiness.GetEmployeeByIdAsync(id);
            return Ok(employee);
        }

        [Authorize]
        [HttpDelete("employee-delete-by-id")]
        [ProducesResponseType(typeof(Employee), StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteEmployeeById(int id)
        {
            var employee = await _employeeBusiness.DeleteEmployeeByIdAsunc(id);
            return Ok(employee);
        }

        [Authorize]
        [HttpPost("employees")]
        [ProducesResponseType(typeof(Employee), StatusCodes.Status200OK)]
        public async Task<IActionResult> SaveEmployee([FromBody] Employee employee)
        {
            await _employeeBusiness.SaveEmployeeAsync(employee);
            return Ok(employee);
        }
    }
}
