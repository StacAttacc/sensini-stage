﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SCSI.Payroll.DatabaseConception
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class Model1Container : DbContext
    {
        public Model1Container()
            : base("name=Model1Container")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<FiscalYear> FiscalYear { get; set; }
        public virtual DbSet<Government> Government { get; set; }
        public virtual DbSet<TaxBracket> TaxBracket { get; set; }
        public virtual DbSet<SocialContributionEmployer> SocialContributionEmployer { get; set; }
        public virtual DbSet<SocialContributionEmployee> SocialContributionEmployee { get; set; }
    }
}
