using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Models.Domains
{
    public class WithheldSalary
    {
        public decimal FedTax { get; set; }
        public decimal ProvTax { get; set; }
        public decimal Rrq { get; set; }
        public decimal Rqap { get; set; }
        public decimal EmploymentInsurance { get; set; }
    }
}
