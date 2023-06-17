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
    public class GovernmentRepository : IGovernmentRepository
    {
        private PayrollDbContext _payrollDbContext;
        public GovernmentRepository(PayrollDbContext payrollDbContext)
        {
            this._payrollDbContext = payrollDbContext;
        }

        public async  Task<Government> DeleteGovernmentByIdAsync(int id)
        {
            try
            {
                var query = from e in _payrollDbContext.Governments where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
                if(query.Count() > 0)
                {
                    _payrollDbContext.Governments.Remove(result);
                    await _payrollDbContext.SaveChangesAsync();
                }
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<Government> GetGovernmentByIdAsync(int id)
        {
            try
            {
                var query = from e in _payrollDbContext.Governments where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<Government> GetGovernmentByCodeAsync(string code)
        {
            try
            {
                var query = from e in _payrollDbContext.Governments where e.Code == code select e;
                var result = await query.FirstOrDefaultAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<List<Government>> GetGovernmentsAsync()
        {
            try
            {
                var result = await _payrollDbContext.Governments.ToListAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<Government> SaveGovernmentAsync(Government government)
        {
            try
            {
                if(government.Id == 0)
                {
                    _payrollDbContext.Governments.Add(government);
                }
                else
                {
                    _payrollDbContext.Governments.Update(government);
                }
                await _payrollDbContext.SaveChangesAsync();
                return government;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
