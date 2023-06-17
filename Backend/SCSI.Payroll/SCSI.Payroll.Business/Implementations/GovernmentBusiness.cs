using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Models.Entities;
using SCSI.Payroll.Repository.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Implementations
{
    public class GovernmentBusiness : IGovernmentBusiness
    {
        private IGovernmentRepository _governmentRepository;
        public GovernmentBusiness(IGovernmentRepository governmentRepository)
        {
            this._governmentRepository = governmentRepository;
        }
        public async Task<Government> DeleteGovernmentByIdAsync(int id)
        {
            try
            {
                var result = await _governmentRepository.DeleteGovernmentByIdAsync(id);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<Government> GetGovernmentByIdAsync(int id)
        {
            try
            {
                var result = await _governmentRepository.GetGovernmentByIdAsync(id);
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<Government> GetGovernmentByCodeAsync(string code)
        {
            try
            {
                var result = await _governmentRepository.GetGovernmentByCodeAsync(code);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<List<Government>> GetGovernmentsAsync()
        {
            try
            {
                var result = await _governmentRepository.GetGovernmentsAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<Government> SaveGovernmentAsync(Government government)
        {
            try
            {
                var result = await _governmentRepository.SaveGovernmentAsync(government);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }
    }
}
