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
    public class FiscalYearRepository : IFiscalYearRepository
    {
        private PayrollDbContext _payrollDbContext;
        public FiscalYearRepository(PayrollDbContext payrollDbContext)
        {
            this._payrollDbContext = payrollDbContext;
        }

        public async Task<FiscalYear> DeleteFiscalYearByIdAsync(int id)
        {
            try
            {
                var query = from e in _payrollDbContext.FiscalYears where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
                if (query.Count() > 0)
                {
                    _payrollDbContext.FiscalYears.Remove(result);
                    await _payrollDbContext.SaveChangesAsync();
                }
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<List<FiscalYear>> GetAllFiscalYearsAsync()
        {
            try
            {
                var result = await _payrollDbContext.FiscalYears.ToListAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
            

        }

        public async Task<FiscalYear> GetFiscalYearByIdAsync(int id)
        {
            try
            {
                var query = from e in _payrollDbContext.FiscalYears where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<FiscalYear> GetFiscalYearByYearAsync(int year)
        {
            try
            {
                var query = from e in _payrollDbContext.FiscalYears where e.Year == year select e;
                var result = await query.FirstOrDefaultAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<FiscalYear> SaveFiscalYearAsync(FiscalYear fiscalYear)
        {
            try
            {
                if(fiscalYear.Id == 0)
                {
                    await _payrollDbContext.FiscalYears.AddAsync(fiscalYear);
                }
                else
                {
                    _payrollDbContext.FiscalYears.Update(fiscalYear);
                }
                await _payrollDbContext.SaveChangesAsync();
                return fiscalYear;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
