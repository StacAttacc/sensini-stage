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
    public class TaxRepository : ITaxRepository
    {
        private PayrollDbContext _payrollDbContext;

        public TaxRepository (PayrollDbContext payrollDbContext)
        {
            this._payrollDbContext = payrollDbContext;
        }

        public async Task<SocialContribution> DeleteSocialContributionByIdAsync(int id)
        {
            try
            {
                var query = from e in _payrollDbContext.SocialContributions where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
                if(query.Count() > 0)
                {
                    _payrollDbContext.SocialContributions.Remove(query.First());
                    await _payrollDbContext.SaveChangesAsync();
                }
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        
        public async Task<SocialContribution> GetSocialContributionByIdAsync(int id)
        {
            try
            {
                var query = from e in _payrollDbContext.SocialContributions where e.Id == id select e;
                var result = await query.FirstOrDefaultAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<List<SocialContribution>> GetSocialContributionsAsync()
        {
            try
            {
                var result = await _payrollDbContext.SocialContributions.ToListAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<SocialContribution> SaveSocialContributionsAsync(SocialContribution socialContribution)
        {
            try
            {
                if(socialContribution.Id == 0)
                {
                    _payrollDbContext.SocialContributions.Add(socialContribution);
                }
                else
                {
                    _payrollDbContext.SocialContributions.Update(socialContribution);
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
