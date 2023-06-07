using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Threading.Tasks;

namespace SCSI.Payroll.Models.Entities
{
    [Table("SocialContribution", Schema = "dbo")]
    public class SocialContribution
    {
        [Key(), Column("Id")]
        public int Id { get; set; }

        [Column("Year")]
        public int Year { get; set; }

        [Column("RRQ_RATE")]
        public decimal RRQ_RATE { get; set; }

        [Column("RRQ_MGA")]
        public decimal RRQ_MGA { get; set; }

        [Column("Employment_Insurance")]
        public decimal Employment_Insurance { get; set; }

        [Column("RQAP_RATE")]
        public decimal RQAP_RATE { get; set; }

        [Column("RQAP_MGA")]
        public decimal RQAP_MGA { get; set; }

    }
}
