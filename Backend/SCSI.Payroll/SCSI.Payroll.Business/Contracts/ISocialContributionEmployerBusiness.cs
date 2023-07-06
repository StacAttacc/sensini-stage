using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Contracts
{
    public interface ISocialContributionEmployerBusiness
    {
        Task<SocialContributionEmployer> SaveSocialContributionsAsync(SocialContributionEmployer socialContribution);
        Task<List<SocialContributionEmployer>> GetSocialContributionsAsync();
        Task<SocialContributionEmployer> GetSocialContributionByIdAsync(int id);
        Task<SocialContributionEmployer> DeleteSocialContributionByIdAsync(int id);
    }
}
