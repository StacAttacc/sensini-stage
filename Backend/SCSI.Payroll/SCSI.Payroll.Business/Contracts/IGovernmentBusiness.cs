﻿using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Contracts
{
    public interface IGovernmentBusiness
    {
        Task<List<Government>> GetGovernmentsAsync();
        Task<Government> GetGovernmentByIdAsync(int id);
        Task<Government> GetGovernmentByCodeAsync(string code);
        Task<Government> DeleteGovernmentByIdAsync(int id);
        Task<Government> SaveGovernmentAsync(Government government);
        Task<bool> IsCodeValid(string code);
    }
}