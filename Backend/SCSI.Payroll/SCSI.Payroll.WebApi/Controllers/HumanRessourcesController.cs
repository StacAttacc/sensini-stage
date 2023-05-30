using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Models.Entities;

namespace SCSI.Payroll.WebApi.Controllers
{
    [Route("api/human-ressources/v1")]
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

        [HttpGet("employees/{id}")]
        [ProducesResponseType(typeof(Employee), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            await Task.Delay(1);
            var employee = new Employee() {Id = 1, FirstName = "fn1", LastName = "ln1", BirthDate = DateTime.Today, NAS="324234234"};

            return Ok(employee);
        }

        [HttpPost("employees")]
        [ProducesResponseType(typeof(Employee), StatusCodes.Status200OK)]
        public async Task<IActionResult> SaveEmployee([FromBody] Employee employee)
        {
            await Task.Delay(1);

            var empl = new Employee() { Id = 1, FirstName = "fn1", LastName = "ln1", BirthDate = DateTime.Today, NAS = "123123123" };

            return Ok(empl);
        }
    }
}
