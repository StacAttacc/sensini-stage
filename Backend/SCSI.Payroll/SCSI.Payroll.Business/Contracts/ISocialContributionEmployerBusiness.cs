using SCSI.Payroll.Models.Domains;
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
        Task<decimal> SetRrq(decimal amount, int fiscalYearId);
        Task<decimal> SetRqap(decimal amount, int fiscalYearId);
        Task<decimal> SetEmploymentInsurance(decimal amount, int fiscalYearId);
        Task<decimal> SetCnesst(decimal amount, int fiscalYearId);
        Task<decimal> SetFss(decimal amount, int fiscalYearId);
        Task<decimal> SetFdrcmo(decimal amount, int fiscalYearId);
        Task<EmployerTaxes> CalculateTaxes(decimal amount, int fiscalYearId);
    }
}
