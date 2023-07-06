using Microsoft.EntityFrameworkCore;
using SCSI.Payroll.Models.Entities;
using SCSI.Payroll.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Repository.Implementations
{
    public class SocialContributionEmployerRepository : ISocialContributionEmployerRepository
    {
        private PayrollDbContext _payrollDbContext;
        public SocialContributionEmployerRepository(PayrollDbContext payrollDbContext)
        {
            this._payrollDbContext = payrollDbContext;
        }
        public async Task<SocialContributionEmployer> DeleteSocialContributionByIdAsync(int id)
        {
            try
            {
                var query = from e in _payrollDbContext.SocialContributionEmployers where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
                if(query.Count() > 0)
                {
                    this._payrollDbContext.SocialContributionEmployers.Remove(query.First());
                    await this._payrollDbContext.SaveChangesAsync();
                }
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<SocialContributionEmployer> GetSocialContributionByIdAsync(int id)
        {
            try
            {
                var query = from e in _payrollDbContext.SocialContributionEmployers where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
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
                var result = await this._payrollDbContext.SocialContributionEmployers
                    .Include(e => e.FiscalYear)
                    .ToListAsync();
                    
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<SocialContributionEmployer> SaveSocialContributionsAsync(SocialContributionEmployer socialContribution)
        {
            try
            {
                if (socialContribution.Id == 0)
                {
                    this._payrollDbContext.SocialContributionEmployers.Add(socialContribution);
                }
                else
                {
                    this._payrollDbContext.SocialContributionEmployers.Update(socialContribution);
                }
                await this._payrollDbContext.SaveChangesAsync();
                return socialContribution;
            }
            catch
            {
                throw;
            }
        }
    }
}
