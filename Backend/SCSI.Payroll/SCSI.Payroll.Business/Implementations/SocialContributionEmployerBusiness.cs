using SCSI.Payroll.Business.Contracts;
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
    }
}
