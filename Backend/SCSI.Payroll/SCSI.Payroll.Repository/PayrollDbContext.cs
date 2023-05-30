using Microsoft.EntityFrameworkCore;
using SCSI.Payroll.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Repository
{
    public class PayrollDbContext:DbContext
    {
        public PayrollDbContext(DbContextOptions<PayrollDbContext> options) :base(options)
        {

        }
        public virtual DbSet<Employee> Employees { get; set }

    }
    
}
