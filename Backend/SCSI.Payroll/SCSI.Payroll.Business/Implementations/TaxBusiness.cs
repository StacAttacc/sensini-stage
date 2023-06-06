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
    public class TaxBusiness : ITaxBusiness
    {
        private ITaxRepository _taxRepository;

        public TaxBusiness(ITaxRepository taxRepository)
        {
            this._taxRepository = taxRepository;
        }
        public async Task<SocialContribution> DeleteSocialContributionByIdAsync(int id)
        {
            try
            {
                var result = await _taxRepository.DeleteSocialContributionByIdAsync(id);
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<SocialContribution> GetSocialContributionByIdAsync(int id)
        {
            try
            {
                var result = await _taxRepository.GetSocialContributionByIdAsync(id);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<List<SocialContribution>> GetSocialContributionsAsync()
        {
            try
            {
                var result = await _taxRepository.GetSocialContributionsAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<SocialContribution> SaveSocialContributionsAsync(SocialContribution socialContribution)
        {
            try
            {
                var result = await _taxRepository.SaveSocialContributionsAsync(socialContribution);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
