using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Repository.Contracts
{
    public interface ISocialContributionEmployeeRepository
    {
        Task<SocialContributionEmployee> SaveSocialContributionsAsync(SocialContributionEmployee socialContribution);
        Task<List<SocialContributionEmployee>> GetSocialContributionsAsync();
        Task<SocialContributionEmployee> GetSocialContributionByIdAsync(int id);
        Task<SocialContributionEmployee> DeleteSocialContributionByIdAsync(int id);
        Task<SocialContributionEmployee> GetSocialContributionByFiscalYearId(int fiscalYearId);
    }
}
