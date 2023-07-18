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
        private ISocialContributionEmployeeBusiness _socialContributionEmployeeBusiness;

        public TaxBracketBusiness(ITaxBracketRepository taxBracketRepository,
                                  IFiscalYearBusiness fiscalYearBusiness,
                                  IGovernmentBusiness governmentBusiness,
                                  ISocialContributionEmployeeBusiness socialContributionEmployeeBusiness)
        {
            this._taxBracketRepository = taxBracketRepository;
            this._fiscalYearBusiness = fiscalYearBusiness;
            this._governmentBusiness = governmentBusiness;
            this._socialContributionEmployeeBusiness = socialContributionEmployeeBusiness;
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

        public async Task<WithheldSalary> ComputeWithheldSalary(decimal amount, int fiscalYearId)
        {            
            WithheldSalary withheldSalary = new WithheldSalary();
            try
            {
                withheldSalary.FedTax = await SetFederalTaxes(amount, fiscalYearId);
                withheldSalary.ProvTax = await SetProvincialTaxes(amount, fiscalYearId);
                withheldSalary.Rrq = await SetRrq(amount, fiscalYearId);
                withheldSalary.Rqap = await SetRqap(amount, fiscalYearId);
                withheldSalary.EmploymentInsurance = await SetEmploymentInsurance(amount, fiscalYearId);
                return withheldSalary;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<decimal> SetFederalTaxes(decimal amount, int fiscalYearId)
        {
            List<TaxBracket> taxBrackets = await _taxBracketRepository.GetTaxBracketsByYearAndGov(fiscalYearId, 1);
            List<TaxBracket> sortedTaxBrackets = taxBrackets.OrderBy(taxBracket => taxBracket.LowerLimit).ToList();
            decimal taxToPay = CalculateTaxes(amount, sortedTaxBrackets);
            return taxToPay;
        }

        public async Task<decimal> SetProvincialTaxes(decimal amount, int fiscalYearId)
        {
            List<TaxBracket> taxBrackets = await _taxBracketRepository.GetTaxBracketsByYearAndGov(fiscalYearId, 2);
            List<TaxBracket> sortedTaxBrackets = taxBrackets.OrderBy(taxBracket => taxBracket.LowerLimit).ToList();
            decimal taxToPay = CalculateTaxes(amount, sortedTaxBrackets);
            return taxToPay;
        }

        public async Task<decimal> SetRrq(decimal amount, int fiscalYearId)
        {
            decimal rrqToPay = 0;
            SocialContributionEmployee socialContribution = await _socialContributionEmployeeBusiness.GetSocialContributionByFiscalYearIdAsync(fiscalYearId);
            if(amount >= socialContribution.RrqMga)
            {
                rrqToPay = socialContribution.RrqMga * (socialContribution.RrqRate / 100);
            }
            else
            {
                rrqToPay = amount * (socialContribution.RrqRate / 100);
            }
            return rrqToPay;
        }

        public async Task<decimal> SetRqap(decimal amount, int fiscalYearId)
        {
            decimal rqapToPay = 0;
            SocialContributionEmployee socialContribution = await _socialContributionEmployeeBusiness.GetSocialContributionByFiscalYearIdAsync(fiscalYearId);
            if(amount >= socialContribution.RqapMga)
            {
                rqapToPay = socialContribution.RqapMga * (socialContribution.RqapRate / 100);
            }
            else
            {
                rqapToPay = amount * (socialContribution.RqapRate / 100);
            }
            return rqapToPay;
        }

        public async Task<decimal> SetEmploymentInsurance(decimal amount, int fiscalYearId)
        {
            decimal insuranceToPay = 0;
            SocialContributionEmployee socialContribution = await _socialContributionEmployeeBusiness.GetSocialContributionByFiscalYearIdAsync(fiscalYearId);
            insuranceToPay = amount * (socialContribution.EmploymentInsurance / 100);
            return insuranceToPay;
        }

        public decimal CalculateTaxes(decimal amount, List<TaxBracket> sortedTaxBrackets)
        {
            decimal amountToPay = 0;
            decimal salLeft = amount;
            decimal taxesToPay = 0;

            int i = 1;

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
