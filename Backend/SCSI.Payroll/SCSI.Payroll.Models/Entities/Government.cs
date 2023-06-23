using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Models.Entities
{
    [Table("Government", Schema = "dbo")]
    public class Government
    {
        [Key(), Column("Id")]
        public int Id { get; set; }

        [Column("Code")]
        public string Code { get; set; }

        [Column("Description")]
        public string Description { get; set; }
    }
}
