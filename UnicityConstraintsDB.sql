-- -------------------------------------------------
-- Adding Unique Constraints
-- -------------------------------------------------

ALTER TABLE [dbo].[Government]
ADD CONSTRAINT [UC_Government_Code] UNIQUE ([Code]);
GO

ALTER TABLE [dbo].[FiscalYear]
ADD CONSTRAINT [UC_FiscalYear_Year] UNIQUE ([Year]);
GO