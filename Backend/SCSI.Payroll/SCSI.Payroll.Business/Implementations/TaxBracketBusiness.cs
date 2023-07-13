using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Models.Constants;
using SCSI.Payroll.Models.Domains;
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
                if(await ValidateOverlapAndCoverage(taxBracket))
                {
                    result = await _taxBracketRepository.SaveTaxBracketAsync(taxBracket);
                }
                else
                {
                    throw new Exception(ErrorMessageConst.OverlapOrCoverageNotRespected);
                }
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<bool> ValidateOverlapAndCoverage(TaxBracket taxBracket)
        {
            bool isValid = true;
            var taxBrackets = await _taxBracketRepository.GetTaxBracketsAsync();
            if (ValidateOverlap(await _fiscalYearBusiness.GetFiscalYearByIdAsync(taxBracket.FiscalYearId),
                                await _governmentBusiness.GetGovernmentByIdAsync(taxBracket.GovernmentId),
                                taxBrackets,
                                taxBracket))
            {
                if (await ValidateCoverageAsync(taxBracket,
                                                await _fiscalYearBusiness.GetFiscalYearByIdAsync(taxBracket.FiscalYearId),
                                                await _governmentBusiness.GetGovernmentByIdAsync(taxBracket.GovernmentId)))
                {
                    isValid = true;
                }
                else
                {
                    isValid = false;
                    //throw new Exception(ErrorMessageConst.CoverageNotRespected);
                }
            }
            else
            {
                isValid = false;
                // throw new Exception(ErrorMessageConst.OverlapRuleNotRespected);
            }
            return isValid;
        }

        public bool ValidateOverlap(FiscalYear fiscalYear,
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

        public async Task<bool> ValidateCoverageAsync(TaxBracket taxBracket, FiscalYear fiscalYear, Government government)
        {
            bool isValid = true;
            if (_taxBracketRepository.GetTaxBracketsAsync == null)
            {
                isValid = true;
            }
            var sortedTaxBracketsList = await SortTaxBracketWithFiscalYearAndGovernmentAsync(fiscalYear, government);
            if(sortedTaxBracketsList.Count() > 0) 
            {
                var taxBracketToCompare = sortedTaxBracketsList.Last();
                if(taxBracket.LowerLimit != taxBracketToCompare.UpperLimit)
                {
                    isValid = false;
                }
            }
            return isValid;
        }

        public async Task<List<TaxBracket>> SortTaxBracketWithFiscalYearAndGovernmentAsync(FiscalYear fiscalYear, Government government)
        {
            var taxBrackets = await _taxBracketRepository.GetTaxBracketsAsync();
            List<TaxBracket> targetedTaxBrackets = new List<TaxBracket>();
            List<TaxBracket> sortedTaxBrackets = new List<TaxBracket>();
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
            sortedTaxBrackets = targetedTaxBrackets.OrderBy(tax => tax.LowerLimit).ToList();
            return sortedTaxBrackets;
            
        }

        public async Task<WithheldSalary> ComputeWithheldSalary(decimal amount, FiscalYear fiscalYear, Government government)
        {            
            WithheldSalary withheldSalary = new WithheldSalary();
            try
            {
                List<TaxBracket> taxBrackets = await _taxBracketRepository.GetTaxBracketsByYearAndGov(fiscalYear.Id, government.Id);
                List<TaxBracket> sortedTaxBrackets = taxBrackets.OrderBy(taxBracket => taxBracket.LowerLimit).ToList();

                if(government.Id == 1)
                {
                    withheldSalary.FedTax = CalculateTaxes(amount, sortedTaxBrackets);
                }
                if(government.Id != 1)
                {
                    withheldSalary.ProvTax = CalculateTaxes(amount, sortedTaxBrackets);
                }

                return withheldSalary;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public decimal CalculateTaxes(decimal amount, List<TaxBracket> sortedTaxBrackets)
        {
            decimal amountToPay = 0;
            decimal salLeft = amount;
            decimal taxesToPay = 0;
            bool bracketsLeft = true;

            int i = 1;
            int nbTaxBrackets = sortedTaxBrackets.Count();

            foreach (TaxBracket taxBracket in sortedTaxBrackets)
            {
                if (amount <= taxBracket.UpperLimit)
                {
                    amountToPay = salLeft * (taxBracket.Rate/100);
                    taxesToPay += amountToPay;

                    return taxesToPay;
                }
                else
                {
                    amountToPay = (taxBracket.UpperLimit - taxBracket.LowerLimit) * (taxBracket.Rate / 100);
                    taxesToPay += amountToPay;
                    if(salLeft - (taxBracket.UpperLimit - taxBracket.LowerLimit) <= 0)
                    {
                        salLeft = 0;
                        return taxesToPay;
                    }
                    else
                    {
                        salLeft = salLeft - (taxBracket.UpperLimit - taxBracket.LowerLimit);
                    }

                    Console.WriteLine(amount);
                    Console.WriteLine();
                }
                i++;
            }
            return amountToPay;
        }
    }
}
