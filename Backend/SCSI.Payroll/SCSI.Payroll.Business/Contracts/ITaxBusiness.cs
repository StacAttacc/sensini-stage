using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Contracts
{
    public interface ITaxBusiness
    {
        Task<SocialContributionEmployee> SaveSocialContributionsAsync(SocialContributionEmployee socialContribution);
        Task<List<SocialContributionEmployee>> GetSocialContributionsAsync();
        Task<SocialContributionEmployee> GetSocialContributionByIdAsync(int id);
        Task<SocialContributionEmployee> DeleteSocialContributionByIdAsync(int id);
    }
}
