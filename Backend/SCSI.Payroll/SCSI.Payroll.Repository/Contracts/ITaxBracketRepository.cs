using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Repository.Contracts
{
    public interface ITaxBracketRepository
    {
        Task<List<TaxBracket>> GetTaxBracketsAsync();
        Task<TaxBracket> GetTaxBracketByIdAsync(int id);
        Task<TaxBracket> DeleteTaxBracketByIdAsync(int id);
        Task<TaxBracket> SaveTaxBracketAsync(TaxBracket taxBracket);
        Task<List<TaxBracket>> GetTaxBracketsByYearAndGov(int fiscalYearId, ASCIIEncoding govId);
    }
}
