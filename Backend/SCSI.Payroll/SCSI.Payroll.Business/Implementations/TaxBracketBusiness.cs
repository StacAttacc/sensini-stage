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
            var taxBrackets = await _taxBracketRepository.GetTaxBracketsAsync();
            TaxBracket? result = null;
            try
            {
                if(ValidateOverlap( await _fiscalYearBusiness.GetFiscalYearByIdAsync(taxBracket.FiscalYearId),
                                    await _governmentBusiness.GetGovernmentByIdAsync(taxBracket.GovernmentId),
                                    taxBrackets,
                                    taxBracket))
                {
                    if(await ValidateCoverageAsync( taxBracket,
                                                    await _fiscalYearBusiness.GetFiscalYearByIdAsync(taxBracket.FiscalYearId),
                                                    await _governmentBusiness.GetGovernmentByIdAsync(taxBracket.GovernmentId)))
                    {
                        result = await _taxBracketRepository.SaveTaxBracketAsync(taxBracket);
                    }
                    else
                    {
                        throw new Exception(ErrorMessageConst.CoverageNotRespected);
                    }
                }
                else
                {
                    throw new Exception(ErrorMessageConst.OverlapRuleNotRespected);
                }
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        private bool ValidateOverlap(FiscalYear fiscalYear,
                                     Government government,
                                     List<TaxBracket> taxBrackets,
                                     TaxBracket taxBracket)
        {
            bool isValid = true;
            if (taxBrackets == null)
            {
                isValid = true;
            }
            
            foreach (TaxBracket item in taxBrackets)
            {
                if (item .FiscalYearId == fiscalYear.Id && item.GovernmentId == government.Id)
                {
                    if (item.LowerLimit == taxBracket.LowerLimit || item.UpperLimit == taxBracket.UpperLimit)
                    {
                        isValid = false;
                    }
                    /*if (item.LowerLimit == upperLimit || taxBracket.UpperLimit == lowerLimit)
                    {
                        return false;
                    }*/
                    if (item.LowerLimit < taxBracket.LowerLimit && taxBracket.LowerLimit < item.UpperLimit)
                    {
                        isValid = false;
                    }
                    if (item.UpperLimit > taxBracket.UpperLimit && taxBracket.UpperLimit > item.LowerLimit)
                    {
                        isValid = false;
                    }
                }
            }
            return isValid;
        }

        private async Task<bool> ValidateCoverageAsync(TaxBracket taxBracket, FiscalYear fiscalYear, Government government)
        {
            bool isValid = true;
            if (_taxBracketRepository.GetTaxBracketsAsync == null)
            {
                isValid = true;
            }
            var sortedTaxBracketsList = await SortTaxBracketWithFiscalYearAndGovernmentAsync(fiscalYear, government);
            var taxBracketToCompare = sortedTaxBracketsList.Last();
            if(taxBracketToCompare != null)
            {
                if(taxBracket.UpperLimit != taxBracketToCompare.LowerLimit)
                {
                    isValid = false;
                }
            }
            return isValid;
        }

        private async Task<List<TaxBracket>> SortTaxBracketWithFiscalYearAndGovernmentAsync(FiscalYear fiscalYear, Government government)
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
