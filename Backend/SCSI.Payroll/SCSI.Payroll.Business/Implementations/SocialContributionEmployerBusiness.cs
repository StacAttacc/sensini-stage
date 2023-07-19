using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Models.Domains;
using SCSI.Payroll.Models.Entities;
using SCSI.Payroll.Repository.Contracts;
using SCSI.Payroll.Repository.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Implementations
{
    public class SocialContributionEmployerBusiness : ISocialContributionEmployerBusiness
    {
        private ISocialContributionEmployerRepository _SCERepository;
        public SocialContributionEmployerBusiness(ISocialContributionEmployerRepository socialContribution)
        {
            this._SCERepository = socialContribution;
        }
        public async Task<SocialContributionEmployer> DeleteSocialContributionByIdAsync(int id)
        {
            try
            {
                var result = await _SCERepository.DeleteSocialContributionByIdAsync(id);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<SocialContributionEmployer> GetSocialContributionByIdAsync(int id)
        {
            try
            {
                var result = await _SCERepository.GetSocialContributionByIdAsync(id);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<List<SocialContributionEmployer>> GetSocialContributionsAsync()
        {
            try
            {
                var result = await _SCERepository.GetSocialContributionsAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<SocialContributionEmployer> SaveSocialContributionsAsync(SocialContributionEmployer socialContribution)
        {
            try
            {
                var result = await _SCERepository.SaveSocialContributionsAsync(socialContribution);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<EmployerTaxes> CalculateTaxes(decimal amount, int fiscalYearId)
        {
            EmployerTaxes employerTaxes = new EmployerTaxes();
            try
            {
                employerTaxes.Rrq = await SetRrq(amount, fiscalYearId);
                employerTaxes.Rqap = await SetRqap(amount, fiscalYearId);
                employerTaxes.EmploymentInsurance = await SetEmploymentInsurance(amount, fiscalYearId);
                employerTaxes.Cnesst = await SetCnesst(amount, fiscalYearId);
                employerTaxes.Fss = await SetFss(amount, fiscalYearId);
                employerTaxes.Fdrcmo = await SetFdrcmo(amount, fiscalYearId);
                return employerTaxes;
            }
            catch(Exception ex){
                throw;
            }
        }

        public async Task<decimal> SetRrq(decimal amount, int fiscalYearId)
        {
            decimal amountToPay = 0;
            SocialContributionEmployer scer = await _SCERepository.GetSocialContributionEmployerByFiscalYearIdAsync(fiscalYearId);
            if(amount >= scer.RrqMga)
            {
                amountToPay = scer.RrqMga * (scer.RrqRate / 100);
            }
            else{
                amountToPay = amount * (scer.RrqRate / 100);
            }
            return amountToPay;
        }

        public async Task<decimal> SetRqap(decimal amount, int fiscalYearId)
        {
            decimal amountToPay = 0;
            SocialContributionEmployer scer = await _SCERepository.GetSocialContributionEmployerByFiscalYearIdAsync(fiscalYearId);
            if(amountToPay >= scer.RqapMga)
            {
                amountToPay = scer.RqapMga * (scer.RqapRate / 100);
            }
            else
            {
                amount = amount * (scer.RqapRate / 100);
            }
            return amountToPay;
        }

        public async Task<decimal> SetEmploymentInsurance(decimal amount, int fiscalYearId)
        {
            decimal amountToPay = 0;
            SocialContributionEmployer scer = await _SCERepository.GetSocialContributionEmployerByFiscalYearIdAsync(fiscalYearId);
            amountToPay = amount * (scer.EmploymentInsurance / 100);
            return amountToPay;
        }

        public async Task<decimal> SetCnesst(decimal amount, int fiscalYearId)
        {
            decimal amountToPay = 0;
            SocialContributionEmployer scer = await _SCERepository.GetSocialContributionEmployerByFiscalYearIdAsync(fiscalYearId);
            amountToPay = amount * (scer.Cnesst / 100);
            return amountToPay;
        }

        public async Task<decimal> SetFss(decimal amount, int fiscalYearId)
        {
            decimal amountToPay = 0;
            SocialContributionEmployer scer = await _SCERepository.GetSocialContributionEmployerByFiscalYearIdAsync(fiscalYearId);
            amountToPay = amount * (scer.Fss / 100);
            return amountToPay;
        }

        public async Task<decimal> SetFdrcmo(decimal amount, int fiscalYearId)
        {
            decimal amountToPay = 0;
            SocialContributionEmployer scer = await _SCERepository.GetSocialContributionEmployerByFiscalYearIdAsync(fiscalYearId);
            amountToPay = amount * (scer.Fdrcmo / 100);
            return amountToPay;
        }
    }
}
