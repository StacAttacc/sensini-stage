-- -------------------------------------------------
-- Adding Unique Constraints
-- -------------------------------------------------

ALTER TABLE [dbo].[Government]
ADD CONSTRAINT [Unique_Code] UNIQUE ([Code]);
GO

ALTER TABLE [dbo].[FiscalYear]
ADD CONSTRAINT [Unique_Year] UNIQUE ([Year]);
GO