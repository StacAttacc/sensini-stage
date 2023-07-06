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
    public class TaxBracketRepository : ITaxBracketRepository
    {
        private PayrollDbContext _payrollDbContext;
        public TaxBracketRepository(PayrollDbContext payrollDbContext)
        {
            this._payrollDbContext = payrollDbContext;
        }
        public async Task<TaxBracket> DeleteTaxBracketByIdAsync(int id)
        {
            try
            {
                var query = from e in _payrollDbContext.TaxBrackets where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
                if(query.Count() > 0)
                {
                    _payrollDbContext.TaxBrackets.Remove(result);
                    await _payrollDbContext.SaveChangesAsync();
                }
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<TaxBracket> GetTaxBracketByIdAsync(int id)
        {
            try
            {
                var query = from e in _payrollDbContext.TaxBrackets where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<List<TaxBracket>> GetTaxBracketsAsync()
        {
            try
            {
                var result = await _payrollDbContext.TaxBrackets
                    .Include(e => e.FiscalYear)
                    .Include(e => e.Government)
                    .ToListAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<TaxBracket> SaveTaxBracketAsync(TaxBracket taxBracket)
        {
            try
            {
                if(taxBracket.Id == 0)
                {
                    _payrollDbContext.TaxBrackets.Add(taxBracket);
                }
                else
                {
                    _payrollDbContext.TaxBrackets.Update(taxBracket);
                }
                await _payrollDbContext.SaveChangesAsync();
                return taxBracket;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
