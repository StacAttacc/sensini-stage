using SCSI.Payroll.Models.Entities;
using SCSI.Payroll.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Repository.Implementations
{
    public class EmployeeRepository : IEmployeeRepository
    {
        public async Task<Employee> DeleteEmployeeByIdAsunc(int employeeId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Employee>> GetAllEmployeeListAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int employeeId)
        {
            throw new NotImplementedException();
        }

        public async Task<Employee> GetEmployeeByNameAsync(string employeeName)
        {
            throw new NotImplementedException();
        }

        public async Task<Employee> SaveEmployeeAsync(Employee employee)
        {
            throw new NotImplementedException();
        }
    }
}
