using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Models.Entities
{
    [Table("TaxBracket", Schema = "dbo")]
    public class TaxBracket
    {
        [Key(), Column("Id")]
        public int Id { get; set; }

        [Column("FiscalYearId")]
        public int FiscalYearId { get; set; }

        [Column("GovernmentId")]
        public int GovernmentId { get; set; }

        [Column("LowerLimit")]
        public decimal LowerLimit { get; set; }

        [Column("UpperLimit")]
        public decimal UpperLimit { get; set; }

        [Column("Rate")]
        public decimal Rate { get; set; }

        [ForeignKey("FiscalYearId")]
        public virtual FiscalYear? FiscalYear { get; set; }

        [ForeignKey("GovernmentId")]
        public virtual Government? Government { get; set; }
    }
}
