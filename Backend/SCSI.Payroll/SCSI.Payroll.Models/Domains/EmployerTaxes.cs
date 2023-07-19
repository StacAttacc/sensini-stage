using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Models.Domains
{
    public class EmployerTaxes
    {
        public decimal Rrq { get; set; }
        public decimal Rqap { get; set; }
        public decimal EmploymentInsurance { get; set; }
        public decimal Cnesst { get; set; }
        public decimal Fss { get; set; }
        public decimal Fdrcmo { get; set; }
    }
}
