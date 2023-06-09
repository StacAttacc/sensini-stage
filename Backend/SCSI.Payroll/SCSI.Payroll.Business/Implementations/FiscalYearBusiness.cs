﻿using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Models.Constants;
using SCSI.Payroll.Models.Entities;
using SCSI.Payroll.Repository.Contracts;
using SCSI.Payroll.Repository.Implementations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Business.Implementations
{
    public class FiscalYearBusiness : IFiscalYearBusiness
    {
        private IFiscalYearRepository _fiscalYearRepository;
        public FiscalYearBusiness(IFiscalYearRepository fiscalYearRespository)
        {
            this._fiscalYearRepository = fiscalYearRespository;
        }
        public async Task<FiscalYear> DeleteFiscalYearByIdAsync(int id)
        {
            try
            {
                var result = await _fiscalYearRepository.DeleteFiscalYearByIdAsync(id);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<List<FiscalYear>> GetAllFiscalYearsAsync()
        {
            try
            {
                var result = await _fiscalYearRepository.GetAllFiscalYearsAsync();
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<FiscalYear> GetFiscalYearByIdAsync(int id)
        {
            try
            {
                var result = await _fiscalYearRepository.GetFiscalYearByIdAsync(id);
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<FiscalYear> GetFiscalYearByYearAsync(int year)
        {
            try
            {
                var result = await _fiscalYearRepository.GetFiscalYearByYearAsync(year);
                return result;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<FiscalYear> SaveFiscalYearAsync(FiscalYear fiscalYear)
        {
            try
            {
                var result = fiscalYear;
                if(await IsYearValid(fiscalYear.Year))
                {
                    result = await _fiscalYearRepository.SaveFiscalYearAsync(fiscalYear);
                }
                else
                {
                    throw new Exception(ErrorMessageConst.YearTaken);
                }
                return result;
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public async Task<bool> IsYearValid(int year)
        {
            bool yearIsAvailable = true;
            if(await _fiscalYearRepository.GetFiscalYearByYearAsync(year) != null)
            {
                yearIsAvailable = false;
            }
            return yearIsAvailable;
        }
    }
}
