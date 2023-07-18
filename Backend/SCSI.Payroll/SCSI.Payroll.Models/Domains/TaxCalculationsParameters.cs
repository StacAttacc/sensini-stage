using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Models.Domains
{
    public class TaxCalculationsParameters
    {
        public decimal Amount { get; set; }
        public int FiscalYearId { get; set; }
        //public FiscalYear? FiscalYear { get; set; }
    }
}
