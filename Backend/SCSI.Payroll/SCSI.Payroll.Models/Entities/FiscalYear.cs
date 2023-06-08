using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Models.Entities
{
    [Table("FiscalYear", Schema = "dbo")]
    public class FiscalYear
    {
        [Key(), Column("Id")]
        public int Id { get; set; }

        [Column("Year")]
        public int Year { get; set; }
        
        [Column("Description")]
        public string Description { get; set; }

    }
}
