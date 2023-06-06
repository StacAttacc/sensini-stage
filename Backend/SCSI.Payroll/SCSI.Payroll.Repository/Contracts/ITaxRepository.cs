using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Repository.Contracts
{
    public interface ITaxRepository
    {
        Task<SocialContribution> SaveSocialContributionsAsync(SocialContribution socialContribution);
        Task<SocialContribution> GetSocialContributionsAsync();
        Task<SocialContribution> GetSocialContributionById(int id);
        Task<SocialContribution> DeleteSocialContributionById(int id);

    }
}
