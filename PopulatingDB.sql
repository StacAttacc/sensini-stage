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
VALUES (0.00, 50197.00, 15.00, 3, 1);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (50197.00, 100392.00, 20.50, 3, 1);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (100392.00, 155625.00, 26.00, 3, 1);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (155625.00, 221708.00, 29.00, 3, 1);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (221708.00, 100000000.00, 33.00, 3, 1);

/*prov 2023*/
INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (0.00, 46295.00, 15.00, 3, 2);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (46295.00, 92580.00, 20.00, 3, 2);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (92580.00, 112655.00, 24.00, 3, 2);

INSERT INTO TaxBracket (LowerLimit, UpperLimit, Rate, FiscalYearId, GovernmentId)
VALUES (112655.00, 100000000.00, 25.75, 3, 2);