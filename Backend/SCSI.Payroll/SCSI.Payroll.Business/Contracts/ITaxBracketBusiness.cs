using SCSI.Payroll.Models.Domains;
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
        Task<bool> ValidateOverlapAndCoverage(TaxBracket taxBracket);
        Task<WithheldSalary> ComputeWithheldSalary(decimal amount, int fiscalYearId);
        decimal CalculateTaxes(decimal amount, List<TaxBracket> sortedTaxBrackets);
        Task<decimal> SetFederalTaxes(decimal amount, int fiscalYearId); 
        Task<decimal> SetProvincialTaxes(decimal amount, int fiscalYearId);
        Task<decimal> SetRrq(decimal amount, int fiscalYearId);
        Task<decimal> SetRqap(decimal amount, int fiscalYearId);
        Task<decimal> SetEmploymentInsurance(decimal amount, int fiscalYearId);
    }
}
