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
        public decimal amount { get; set; }
        public FiscalYear fiscalYear { get; set; }
    }
}
