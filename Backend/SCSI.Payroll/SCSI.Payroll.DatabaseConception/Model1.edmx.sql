
-- --------------------------------------------------
-- Entity Designer DDL Script for SQL Server 2005, 2008, 2012 and Azure
-- --------------------------------------------------
-- Date Created: 07/10/2023 11:21:24
-- Generated from EDMX file: B:\Workspace\sensini-stage\Backend\SCSI.Payroll\SCSI.Payroll.DatabaseConception\Model1.edmx
-- --------------------------------------------------

SET QUOTED_IDENTIFIER OFF;
GO
USE [Payrolldb];
GO
IF SCHEMA_ID(N'dbo') IS NULL EXECUTE(N'CREATE SCHEMA [dbo]');
GO

-- --------------------------------------------------
-- Dropping existing FOREIGN KEY constraints
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[FK_FiscalYearTaxBracket]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TaxBracket] DROP CONSTRAINT [FK_FiscalYearTaxBracket];
GO
IF OBJECT_ID(N'[dbo].[FK_GovernmentTaxBracket]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[TaxBracket] DROP CONSTRAINT [FK_GovernmentTaxBracket];
GO
IF OBJECT_ID(N'[dbo].[FK_SocialContributionEmployerFiscalYear]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[SocialContributionEmployer] DROP CONSTRAINT [FK_SocialContributionEmployerFiscalYear];
GO
IF OBJECT_ID(N'[dbo].[FK_SocialContributionEmployeeFiscalYear]', 'F') IS NOT NULL
    ALTER TABLE [dbo].[SocialContributionEmployee] DROP CONSTRAINT [FK_SocialContributionEmployeeFiscalYear];
GO

-- --------------------------------------------------
-- Dropping existing tables
-- --------------------------------------------------

IF OBJECT_ID(N'[dbo].[Employee]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Employee];
GO
IF OBJECT_ID(N'[dbo].[FiscalYear]', 'U') IS NOT NULL
    DROP TABLE [dbo].[FiscalYear];
GO
IF OBJECT_ID(N'[dbo].[Government]', 'U') IS NOT NULL
    DROP TABLE [dbo].[Government];
GO
IF OBJECT_ID(N'[dbo].[TaxBracket]', 'U') IS NOT NULL
    DROP TABLE [dbo].[TaxBracket];
GO
IF OBJECT_ID(N'[dbo].[SocialContributionEmployer]', 'U') IS NOT NULL
    DROP TABLE [dbo].[SocialContributionEmployer];
GO
IF OBJECT_ID(N'[dbo].[SocialContributionEmployee]', 'U') IS NOT NULL
    DROP TABLE [dbo].[SocialContributionEmployee];
GO

-- --------------------------------------------------
-- Creating all tables
-- --------------------------------------------------

-- Creating table 'Employee'
CREATE TABLE [dbo].[Employee] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [FirstName] nvarchar(250)  NOT NULL,
    [LastName] nvarchar(250)  NOT NULL,
    [BirthDate] datetime  NOT NULL,
    [NAS] nvarchar(9)  NOT NULL
);
GO

-- Creating table 'FiscalYear'
CREATE TABLE [dbo].[FiscalYear] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Year] int  NOT NULL,
    [Description] nvarchar(100)  NOT NULL
);
GO

-- Creating table 'Government'
CREATE TABLE [dbo].[Government] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [Code] nvarchar(3)  NOT NULL,
    [Description] nvarchar(100)  NOT NULL
);
GO

-- Creating table 'TaxBracket'
CREATE TABLE [dbo].[TaxBracket] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [LowerLimit] decimal(18,2)  NOT NULL,
    [UpperLimit] decimal(18,2)  NOT NULL,
    [Rate] decimal(18,2)  NOT NULL,
    [FiscalYearId] int  NOT NULL,
    [GovernmentId] int  NOT NULL
);
GO

-- Creating table 'SocialContributionEmployer'
CREATE TABLE [dbo].[SocialContributionEmployer] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [RRQ_RATE] decimal(18,2)  NOT NULL,
    [RRQ_MGA] decimal(18,2)  NOT NULL,
    [Employment_Insurance] decimal(18,2)  NOT NULL,
    [RQAP_RATE] decimal(18,2)  NOT NULL,
    [RQAP_MGA] decimal(18,2)  NOT NULL,
    [CNESST] decimal(18,2)  NOT NULL,
    [FSS] decimal(18,2)  NOT NULL,
    [FDRCMO] decimal(18,2)  NOT NULL,
    [FiscalYearId] int  NOT NULL
);
GO

-- Creating table 'SocialContributionEmployee'
CREATE TABLE [dbo].[SocialContributionEmployee] (
    [Id] int IDENTITY(1,1) NOT NULL,
    [RRQ_RATE] decimal(18,2)  NOT NULL,
    [RRQ_MGA] decimal(18,2)  NOT NULL,
    [Employment_Insurance] decimal(18,2)  NOT NULL,
    [RQAP_RATE] decimal(18,2)  NOT NULL,
    [RQAP_MGA] decimal(18,2)  NOT NULL,
    [FiscalYearId] int  NOT NULL
);
GO

-- --------------------------------------------------
-- Creating all PRIMARY KEY constraints
-- --------------------------------------------------

-- Creating primary key on [Id] in table 'Employee'
ALTER TABLE [dbo].[Employee]
ADD CONSTRAINT [PK_Employee]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'FiscalYear'
ALTER TABLE [dbo].[FiscalYear]
ADD CONSTRAINT [PK_FiscalYear]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'Government'
ALTER TABLE [dbo].[Government]
ADD CONSTRAINT [PK_Government]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'TaxBracket'
ALTER TABLE [dbo].[TaxBracket]
ADD CONSTRAINT [PK_TaxBracket]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'SocialContributionEmployer'
ALTER TABLE [dbo].[SocialContributionEmployer]
ADD CONSTRAINT [PK_SocialContributionEmployer]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- Creating primary key on [Id] in table 'SocialContributionEmployee'
ALTER TABLE [dbo].[SocialContributionEmployee]
ADD CONSTRAINT [PK_SocialContributionEmployee]
    PRIMARY KEY CLUSTERED ([Id] ASC);
GO

-- --------------------------------------------------
-- Creating all FOREIGN KEY constraints
-- --------------------------------------------------

-- Creating foreign key on [FiscalYearId] in table 'TaxBracket'
ALTER TABLE [dbo].[TaxBracket]
ADD CONSTRAINT [FK_FiscalYearTaxBracket]
    FOREIGN KEY ([FiscalYearId])
    REFERENCES [dbo].[FiscalYear]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_FiscalYearTaxBracket'
CREATE INDEX [IX_FK_FiscalYearTaxBracket]
ON [dbo].[TaxBracket]
    ([FiscalYearId]);
GO

-- Creating foreign key on [GovernmentId] in table 'TaxBracket'
ALTER TABLE [dbo].[TaxBracket]
ADD CONSTRAINT [FK_GovernmentTaxBracket]
    FOREIGN KEY ([GovernmentId])
    REFERENCES [dbo].[Government]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_GovernmentTaxBracket'
CREATE INDEX [IX_FK_GovernmentTaxBracket]
ON [dbo].[TaxBracket]
    ([GovernmentId]);
GO

-- Creating foreign key on [FiscalYearId] in table 'SocialContributionEmployer'
ALTER TABLE [dbo].[SocialContributionEmployer]
ADD CONSTRAINT [FK_SocialContributionEmployerFiscalYear]
    FOREIGN KEY ([FiscalYearId])
    REFERENCES [dbo].[FiscalYear]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_SocialContributionEmployerFiscalYear'
CREATE INDEX [IX_FK_SocialContributionEmployerFiscalYear]
ON [dbo].[SocialContributionEmployer]
    ([FiscalYearId]);
GO

-- Creating foreign key on [FiscalYearId] in table 'SocialContributionEmployee'
ALTER TABLE [dbo].[SocialContributionEmployee]
ADD CONSTRAINT [FK_SocialContributionEmployeeFiscalYear]
    FOREIGN KEY ([FiscalYearId])
    REFERENCES [dbo].[FiscalYear]
        ([Id])
    ON DELETE NO ACTION ON UPDATE NO ACTION;
GO

-- Creating non-clustered index for FOREIGN KEY 'FK_SocialContributionEmployeeFiscalYear'
CREATE INDEX [IX_FK_SocialContributionEmployeeFiscalYear]
ON [dbo].[SocialContributionEmployee]
    ([FiscalYearId]);
GO

-- -------------------------------------------------
-- Adding Unique Constraints
-- -------------------------------------------------

ALTER TABLE [dbo].[Government]
ADD CONSTRAINT [UC_Government_Code] UNIQUE ([Code]);
GO

ALTER TABLE [dbo].[FiscalYear]
ADD CONSTRAINT [UC_FiscalYear_Year] UNIQUE ([Year]);
GO

-- --------------------------------------------------
-- Script has ended
-- --------------------------------------------------