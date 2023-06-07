﻿using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Contracts
{
    public interface ITaxBusiness
    {
        Task<SocialContribution> SaveSocialContributionsAsync(SocialContribution socialContribution);
        Task<List<SocialContribution>> GetSocialContributionsAsync();
        Task<SocialContribution> GetSocialContributionByIdAsync(int id);
        Task<SocialContribution> DeleteSocialContributionByIdAsync(int id);
    }
}