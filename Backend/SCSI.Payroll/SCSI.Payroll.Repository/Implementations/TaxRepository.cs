using SCSI.Payroll.Models.Entities;
using SCSI.Payroll.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Repository.Implementations
{
    public class TaxRepository : ITaxRepository
    {
        public Task<SocialContribution> DeleteSocialContributionById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<SocialContribution> GetSocialContributionById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<SocialContribution> GetSocialContributionsAsync()
        {
            throw new NotImplementedException();
        }

        public Task<SocialContribution> SaveSocialContributionsAsync(SocialContribution socialContribution)
        {
            throw new NotImplementedException();
        }
    }
}
