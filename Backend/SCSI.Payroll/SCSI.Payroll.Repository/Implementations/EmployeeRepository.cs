using Microsoft.EntityFrameworkCore;
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
        private PayrollDbContext _payrollDbContext;

        public EmployeeRepository(PayrollDbContext payrollDbContext)
        {
            _payrollDbContext = payrollDbContext;
        }

        public async Task<Employee> DeleteEmployeeByIdAsync(int employeeId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Employee>> GetAllEmployeeListAsync()
        {
            try
            {
                var results = await _payrollDbContext.Employees.ToListAsync();
                return results;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<Employee> GetEmployeeByIdAsync(int employeeId)
        {
            try
            {
                var query = from e in _payrollDbContext.Employees where e.Id == employeeId select e;
                var result =  await query.FirstOrDefaultAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
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
