using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Repository.Contracts
{
    public interface IEmployeeRepository
    {
        Task<Employee> SaveEmployeeAsync(Employee employee);
        Task<List<Employee>> GetAllEmployeeListAsync();
        Task<Employee> GetEmployeeByIdAsync(int employeeId);
        Task<Employee> GetEmployeeByNameAsync(string employeeName);
        Task<Employee> DeleteEmployeeByIdAsunc(int employeeId);
    }
}
