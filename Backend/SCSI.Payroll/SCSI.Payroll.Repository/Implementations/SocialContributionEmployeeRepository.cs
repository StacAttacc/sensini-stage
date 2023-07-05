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
    public class SocialContributionEmployeeRepository : ISocialContributionEmployeeRepository
    {
        private PayrollDbContext _payrollDbContext;

        public SocialContributionEmployeeRepository (PayrollDbContext payrollDbContext)
        {
            this._payrollDbContext = payrollDbContext;
        }

        public async Task<SocialContributionEmployee> DeleteSocialContributionByIdAsync(int id)
        {
            try
            {
                var query = from e in _payrollDbContext.SocialContributionEmployees where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
                if(query.Count() > 0)
                {
                    _payrollDbContext.SocialContributionEmployees.Remove(query.First());
                    await _payrollDbContext.SaveChangesAsync();
                }
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
                var query = from e in _payrollDbContext.SocialContributionEmployees where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
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
                var result = await _payrollDbContext.SocialContributionEmployees.ToListAsync();
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
                if(socialContribution.Id == 0)
                {
                    _payrollDbContext.SocialContributionEmployees.Add(socialContribution);
                }
                else
                {
                    _payrollDbContext.SocialContributionEmployees.Update(socialContribution);
                }
                await _payrollDbContext.SaveChangesAsync();
                return socialContribution;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
