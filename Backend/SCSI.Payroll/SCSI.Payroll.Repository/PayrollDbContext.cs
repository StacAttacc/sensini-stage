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
        public PayrollDbContext(DbContextOptions<PayrollDbContext> options) :base(options){}

        public virtual DbSet<Employee> Employees { get; set; }

        public virtual DbSet<SocialContribution> SocialContributions { get; set; }

        public virtual DbSet<FiscalYear> FiscalYears { get; set; }

        public virtual DbSet<Government> Governments { get; set; }

        public virtual DbSet<TaxBracket> TaxBrackets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FiscalYear>()
                .HasIndex(e => e.Year)
                .IsUnique();
            modelBuilder.Entity<Government>()
                .HasIndex(e => e.Code)
                .IsUnique();
        }


    }
    
}
