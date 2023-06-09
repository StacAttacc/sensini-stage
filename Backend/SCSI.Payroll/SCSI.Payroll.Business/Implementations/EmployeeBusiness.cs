﻿using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Models.Constants;
using SCSI.Payroll.Models.Entities;
using SCSI.Payroll.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Implementations
{
    public class EmployeeBusiness : IEmployeeBusiness
    {

        private IEmployeeRepository _employeeRepository;

        public EmployeeBusiness()
        {
        }

        public EmployeeBusiness(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<Employee> DeleteEmployeeByIdAsunc(int employeeId)
        {
            try
            {
                var result = await _employeeRepository.DeleteEmployeeByIdAsync(employeeId);
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<List<Employee>> GetAllEmployeeListAsync()
        {
            try 
            {
                var results = await _employeeRepository.GetAllEmployeeListAsync();
                return results;
            }
            catch (Exception ex){ 
                throw;
            }
        }

        public async Task<Employee> GetEmployeeByIdAsync(int employeeId)
        {
            try
            {
                var result = await _employeeRepository.GetEmployeeByIdAsync(employeeId);
                return result;
            }
            catch (Exception ex)
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
            try
            {
                if (ValidationEmployee(employee))
                {
                    await _employeeRepository.SaveEmployeeAsync(employee);
                }
                else
                {
                    throw new Exception(ErrorMessageConst.EmployeeIsUneligible);
                }
                return employee;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public bool ValidationEmployee(Employee employee)
        {
            bool isValid = false;
            if(employee.BirthDate.AddYears(18) <= DateTime.Now)
            {
                isValid = true;
            }
            return isValid;
        }
    }
}
