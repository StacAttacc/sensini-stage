using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Models.Entities
{
    [Table("Employee", Schema = "dbo")]
    public class Employee
    {
        [Key(), Column("Id")]
        public int Id { get; set; }
        
        [Column("FirstName")]
        public string FirstName { get; set; }

        [Column("LastName")]
        public string LastName { get; set; }

        [Column("BirthDate")]
        public System.DateTime BirthDate { get; set; }

        [Column("NAS")]
        public string NAS { get; set; }
    }
}
