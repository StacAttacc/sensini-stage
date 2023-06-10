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
        private IFiscalYearBusiness _fiscalYearBusiness;
        private IGovernmentBusiness _governmentBusiness;

        public TaxBracketBusiness(ITaxBracketRepository taxBracketRepository,
                                  IFiscalYearBusiness fiscalYearBusiness,
                                  IGovernmentBusiness governmentBusiness)
        {
            this._taxBracketRepository = taxBracketRepository;
            this._fiscalYearBusiness = fiscalYearBusiness;
            this._governmentBusiness = governmentBusiness;
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
            var fiscalYears = await _taxBracketRepository.GetTaxBracketsAsync();
            var allTaxBrackets = await _taxBracketRepository.GetTaxBracketsAsync();
            try
            {
                if(ValidateOverlap(_fiscalYearBusiness.GetFiscalYearByIdAsync(taxBracket.FiscalYearId),
                                    _governmentBusiness.GetGovernmentByIdAsync(taxBracket.GovernmentId),
                                    taxBracket.LowerLimit,
                                    taxBracket.UpperLimit,
                                    fiscalYears))
                {
                    if(await ValidateCoverageAsync(taxBracket,
                                    _fiscalYearBusiness.GetFiscalYearByIdAsync(taxBracket.FiscalYearId),
                                    _governmentBusiness.GetGovernmentByIdAsync(taxBracket.GovernmentId),
                                    taxBracket.LowerLimit,
                                    taxBracket.UpperLimit))
                    {
                        var result = await _taxBracketRepository.SaveTaxBracketAsync(taxBracket);
                        return result;
                    }
                }
                return default;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        private bool ValidateOverlap(Task<FiscalYear> fiscalYear, Task<Government> government, decimal lowerLimit, decimal upperLimit, List<TaxBracket> taxBrackets)
        {
            if (taxBrackets == null)
            {
                return true;
            }
            
            foreach (TaxBracket taxBracket in taxBrackets)
            {
                if (taxBracket.FiscalYearId == fiscalYear.Id && taxBracket.GovernmentId == government.Id)
                {
                    if (taxBracket.LowerLimit == lowerLimit || taxBracket.UpperLimit == upperLimit)
                    {
                        return false;
                    }
                    /*if (taxBracket.LowerLimit == upperLimit || taxBracket.UpperLimit == lowerLimit)
                    {
                        return false;
                    }*/
                    if (taxBracket.LowerLimit < lowerLimit && lowerLimit < taxBracket.UpperLimit)
                    {
                        return false;
                    }
                    if (taxBracket.UpperLimit > upperLimit && upperLimit > taxBracket.LowerLimit)
                    {
                        return false;
                    }
                }
            }
            return true;
        }

        private async Task<bool> ValidateCoverageAsync(TaxBracket taxBracketInput ,Task<FiscalYear> fiscalYear, Task<Government> government, decimal lowerLimit, decimal upperLimit)
        {
            if (_taxBracketRepository.GetTaxBracketsAsync == null)
            {
                return true;
            }
            var sortedTaxBracketsList = await SortTaxBracketWithFiscalYearAndGovernmentAsync(fiscalYear, government);
            var taxBracketToCompare = sortedTaxBracketsList.Last();
            if(taxBracketToCompare != null)
            {
                if(upperLimit != taxBracketToCompare.LowerLimit)
                {
                    return false;
                }
            }
            return true;
        }

        private async Task<List<TaxBracket>> SortTaxBracketWithFiscalYearAndGovernmentAsync(Task<FiscalYear> fiscalYear, Task<Government> government)
        {
            var taxBrackets = await _taxBracketRepository.GetTaxBracketsAsync();
            List<TaxBracket> targetedTaxBrackets = null;
            List<TaxBracket> sortedTaxBrackets = null;
            foreach (TaxBracket taxBracket in taxBrackets)
            {
                if(taxBracket.FiscalYearId == fiscalYear.Id)
                {
                    if(taxBracket.GovernmentId == government.Id)
                    {
                        targetedTaxBrackets.Add(taxBracket);
                    }
                }
            }
            if(targetedTaxBrackets != null)
            {
                sortedTaxBrackets = targetedTaxBrackets.OrderBy(tax => tax.LowerLimit).ToList();
            }
            return sortedTaxBrackets;
            
        }

        
    }
}
