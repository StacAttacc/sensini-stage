using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Contracts
{
    public interface IFiscalYearBusiness
    {
        Task<List<FiscalYear>> GetAllFiscalYearsAsync();
        Task<FiscalYear> GetFiscalYearByIdAsync(int id);
        Task<FiscalYear> GetFiscalYearByYearAsync(int year);
        Task<FiscalYear> DeleteFiscalYearByIdAsync(int id);
        Task<FiscalYear> SaveFiscalYearAsync(FiscalYear fiscalYear);
        Task<bool> IsYearValid(int year);
    }
}
