using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Contracts
{
    public interface ITaxBracketBusiness
    {
        Task<List<TaxBracket>> GetTaxBracketsAsync();
        Task<TaxBracket> GetTaxBracketByIdAsync(int id);
        Task<TaxBracket> DeleteTaxBracketByIdAsync(int id);
        Task<TaxBracket> SaveTaxBracketAsync(TaxBracket taxBracket);
        bool ValidateOverlap(FiscalYear fiscalYear, Government government, List<TaxBracket> taxBrackets, TaxBracket taxBracket);
        Task<bool> ValidateCoverageAsync(TaxBracket taxBracket, FiscalYear fiscalYear, Government government);
        Task<List<TaxBracket>> SortTaxBracketWithFiscalYearAndGovernmentAsync(FiscalYear fiscalYear, Government government);
    }
}
