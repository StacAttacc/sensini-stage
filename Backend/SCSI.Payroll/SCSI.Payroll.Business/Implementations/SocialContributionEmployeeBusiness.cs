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
        public async Task<SocialContributionEmployee> DeleteSocialContributionByIdAsync(int id)
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

        public async Task<SocialContributionEmployee> GetSocialContributionByIdAsync(int id)
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

        public async Task<List<SocialContributionEmployee>> GetSocialContributionsAsync()
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

        public async Task<SocialContributionEmployee> SaveSocialContributionsAsync(SocialContributionEmployee socialContribution)
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
