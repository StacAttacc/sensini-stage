using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Repository.Contracts
{
    public interface IGovernmentRepository
    {
        Task<List<Government>> GetGovernmentsAsync();

        Task<Government> GetGovernmentByIdAsync(int id);

        Task<Government> DeleteGovernmentByIdAsync(int id);

        Task<Government> SaveGovernmentAsync(Government government);
    }
}
