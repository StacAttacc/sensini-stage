using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Contracts
{
    public interface IEmployeeBusiness
    {
        Task<Employee> SaveEmployeeAsync(Employee employee);
        Task<List<Employee>> GetAllEmployeeListAsync();
        Task<Employee> GetEmployeeByIdAsync(int employeeId);
        Task<Employee> GetEmployeeByNameAsync(string employeeName);
        Task<Employee> DeleteEmployeeByIdAsunc(int employeeId);
        bool ValidationEmployee(Employee employee);
    }
}
