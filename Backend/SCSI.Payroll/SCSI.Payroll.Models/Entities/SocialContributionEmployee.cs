using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Models.Entities
{
    [Table("SocialContributionEmployee", Schema = "dbo")]
    public class SocialContributionEmployee
    {
        [Key(), Column("Id")]
        public int Id { get; set; }

        [Column("FiscalYearId")]
        public int FiscalYearId { get; set; }

        [Column("RRQ_RATE")]
        public decimal RrqRate { get; set; }

        [Column("RRQ_MGA")]
        public decimal RrqMga { get; set; }

        [Column("Employment_Insurance")]
        public decimal EmploymentInsurance { get; set; }

        [Column("RQAP_RATE")]
        public decimal RqapRate { get; set; }

        [Column("RQAP_MGA")]
        public decimal RqapMga{ get; set; }

        [ForeignKey("FiscalYearId")]
        public virtual FiscalYear? FiscalYear { get; set; }

    }
}
