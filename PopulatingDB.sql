/*employees*/
INSERT INTO Employee (FirstName, LastName, BirthDate, NAS)
VALUES ('John', 'Doe', 2000-01-01, 123123132);

INSERT INTO Employee (FirstName, LastName, BirthDate, NAS)
VALUES ('Johanne', 'Doe', 1999-12-30, 123123132);

INSERT INTO Employee (FirstName, LastName, BirthDate, NAS)
VALUES ('Johnny', 'Doe', 2000-12-23, 123123132);

INSERT INTO Employee (FirstName, LastName, BirthDate, NAS)
VALUES ('John', 'Daux', 1998-06-06, 123123132);

INSERT INTO Employee (FirstName, LastName, BirthDate, NAS)
VALUES ('Joe', 'Deez', 2000-01-01, 123123132);

/*Fiscal Years*/
INSERT INTO FiscalYear (Year, Description)
VALUES (2021, 2021);

INSERT INTO FiscalYear (Year, Description)
VALUES (2022, 2022);

INSERT INTO FiscalYear (Year, Description)
VALUES (2023, 2023);

/*Governments*/
INSERT INTO Government (Code, Description)
VALUES ('CAN', 'canadian feds');

INSERT INTO Government (Code, Description)
VALUES ('QC', 'quebec');

/*Tax Brackets*/
/*feds 2023*/
INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (0.00, 15000.00, 5.00, 3, 1);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (15000.00, 30000.00, 5.00, 3, 1);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (30000.00, 50000.00, 5.00, 3, 1);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (50000.00, 10000000.00, 5.00, 3, 1);

/*prov 2023*/
INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (0.00, 20000.00, 5.00, 3, 2);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (20000.00, 45000.00, 5.00, 3, 2);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (45000.00, 60000.00, 5.00, 3, 2);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (60000.00, 10000000.00, 5.00, 3, 2);