using Moq;
using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Business.Implementations;
using SCSI.Payroll.Models.Entities;
using SCSI.Payroll.Repository.Contracts;
using SCSI.Payroll.Repository.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace SCSI.Payroll.Business.UnitTests
{
    public class EmployeeBusiness_Tests
    {
        private static (
                        EmployeeBusiness employeeBusiness,
                        Mock<IEmployeeRepository> employeeRepository
            )
            Given_EmployeeBusiness()
        {
            var employeeRepository = new Mock<IEmployeeRepository>();

            var employeeBusiness = new EmployeeBusiness(
                employeeRepository.Object
            );

            return (employeeBusiness, employeeRepository);
        }

        [Theory]
        [InlineData("2023-01-01", false)]
        [InlineData("2010-01-01", false)]
        [InlineData("2004-01-01", true)]
        [InlineData("2003-01-01", true)]
        public async Task EmployeeIsAnAdult(string dateStr, bool expectedResult)
        {
            DateTime date = DateTime.Parse(dateStr);
            Employee employee = new Employee()
            {
                Id = 1,
                FirstName = "fn",
                LastName = "ln",
                BirthDate = date,
                NAS = "123123123"
            };
            var (employeeBusiness, employeeRepository) = Given_EmployeeBusiness();

            var result = employeeBusiness.ValidationEmployee(employee);
            Assert.Equal(expectedResult, result);
        }
    }
}
