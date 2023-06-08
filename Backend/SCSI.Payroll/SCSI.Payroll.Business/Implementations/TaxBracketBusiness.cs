using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Models.Entities;
using SCSI.Payroll.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Implementations
{
    public class TaxBracketBusiness : ITaxBracketBusiness
    {
        private ITaxBracketRepository _taxBracketRepository;
        public TaxBracketBusiness(ITaxBracketRepository taxBracketRepository)
        {
            this._taxBracketRepository = taxBracketRepository;
        }
        public async Task<TaxBracket> DeleteTaxBracketByIdAsync(int id)
        {
            try
            {
                var result = await _taxBracketRepository.DeleteTaxBracketByIdAsync(id);
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
                var result = await _taxBracketRepository.GetTaxBracketByIdAsync(id);
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
                var result = await _taxBracketRepository.GetTaxBracketsAsync();
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
                var result = await _taxBracketRepository.SaveTaxBracketAsync(taxBracket);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
