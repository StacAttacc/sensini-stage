﻿using Moq;
using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Business.Implementations;
using SCSI.Payroll.Models.Entities;
using SCSI.Payroll.Repository.Contracts;
using Xunit;

namespace SCSI.Payroll.Business.UnitTests
{
    public class TaxBracketBusiness_Tests
    {
        [Theory]
        [InlineData(0, 15000, false)]
        [InlineData(30000, 45000, true)]
        [InlineData(29999, 45000, false)]
        [InlineData(20000, 30000, false)]
        public async Task ValidateOverlap_MustWork(decimal lowerLimit, decimal upperLimit, bool expectedResult)
        {
            var fiscalYear = new FiscalYear() { Id = 3, Year = 2023, Description = "Fiscal year 2023" };
            var gouvernment = new Government() { Id = 1, Code = "CAN", Description = "Gouv FED" };
            var taxBrackets = new List<TaxBracket>()
            {
                new TaxBracket()
                {
                    Id = 1,
                    FiscalYearId = 3,
                    GovernmentId = 1,
                    LowerLimit = 0,
                    UpperLimit = 15000,
                    Rate = 17
                },
                new TaxBracket()
                {
                    Id = 2,
                    FiscalYearId = 3,
                    GovernmentId = 1,
                    LowerLimit=15000,
                    UpperLimit=30000,
                    Rate = 25
                }
            };
            var (taxBracketBusiness, taxBracketRepository, fiscalYearBusiness, governmentBusiness) = Given_TaxBracketBusiness();
            var newTaxBracket = new TaxBracket()
            {
                Id = 3,
                FiscalYearId = 3,
                GovernmentId = 1,
                LowerLimit = lowerLimit,
                UpperLimit = upperLimit,
                Rate = 50
            };
            var result = taxBracketBusiness.ValidateOverlap(fiscalYear, gouvernment, taxBrackets, newTaxBracket);
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData(30000, 45000, true)]
        [InlineData(35000, 45000, false)]
        public async Task ValidateCoverage_MustWork(decimal lowerLimit, decimal upperLimit, bool expectedResult)
        {
            var fiscalYear = new FiscalYear() { Id = 3, Year = 2023, Description = "Fiscal year 2023" };
            var gouvernment = new Government() { Id = 1, Code = "CAN", Description = "Gouv FED" };
            var taxBrackets = new List<TaxBracket>()
            {
                new TaxBracket()
                {
                    Id = 1,
                    FiscalYearId = 3,
                    GovernmentId = 1,
                    LowerLimit = 0,
                    UpperLimit = 15000,
                    Rate = 17
                },
                new TaxBracket()
                {
                    Id = 2,
                    FiscalYearId = 3,
                    GovernmentId = 1,
                    LowerLimit=15000,
                    UpperLimit=30000,
                    Rate = 25
                }
            };
            var (taxBracketBusiness, taxBracketRepository, fiscalYearBusiness, governmentBusiness) = Given_TaxBracketBusiness();
            var newTaxBracket = new TaxBracket()
            {
                Id = 3,
                FiscalYearId = 3,
                GovernmentId = 1,
                LowerLimit = lowerLimit,
                UpperLimit = upperLimit,
                Rate = 50
            };
            var result = await taxBracketBusiness.ValidateCoverageAsync(newTaxBracket, fiscalYear, gouvernment);
            Assert.Equal(expectedResult, result);
        }

        [Theory]
        [InlineData(20000, 40000, false)]
        [InlineData(30000, 45000, true)]
        [InlineData(40000, 50000, false)]
        [InlineData(100000, 10000000, false)]
        public async Task ValidateCoverageAndOverlap(decimal lowerLimit, decimal upperLimit, bool expectedResult)
        {
            var fiscalYear = new FiscalYear() { Id = 3, Year = 2023, Description = "Fiscal year 2023" };
            var gouvernment = new Government() { Id = 1, Code = "CAN", Description = "Gouv FED" };
            var taxBrackets = new List<TaxBracket>()
            {
                new TaxBracket()
                {
                    Id = 1,
                    FiscalYearId = 3,
                    GovernmentId = 1,
                    LowerLimit = 0,
                    UpperLimit = 15000,
                    Rate = 17
                },
                new TaxBracket()
                {
                    Id = 2,
                    FiscalYearId = 3,
                    GovernmentId = 1,
                    LowerLimit=15000,
                    UpperLimit=30000,
                    Rate = 25
                }
            };
            var (taxBracketBusiness, taxBracketRepository, fiscalYearBusiness, governmentBusiness) = Given_TaxBracketBusiness();
            var newTaxBracket = new TaxBracket()
            {
                Id = 3,
                FiscalYearId = 3,
                GovernmentId = 1,
                LowerLimit = lowerLimit,
                UpperLimit = upperLimit,
                Rate = 50
            };
            var result = await taxBracketBusiness.ValidateOverlapAndCoverage(newTaxBracket);
            Assert.Equal(expectedResult, result);
        }

        [Fact]
        public void TaxCalculations()
        {
            var (taxBracketBusiness, taxBracketRepository, fiscalYearBusiness, governmentBusiness)
                = Given_TaxBracketBusiness();
            List<TaxBracket> taxBracketList = new List<TaxBracket>()
                {
                    new TaxBracket()
                    {
                        Id = 1,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 0,
                        UpperLimit = 50197,
                        Rate = 15
                    },
                    new TaxBracket()
                    {
                        Id = 2,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 50197,
                        UpperLimit = 100392,
                        Rate = 20.5m
                    },
                    new TaxBracket()
                    {
                        Id = 3,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 100392,
                        UpperLimit = 155625,
                        Rate = 26
                    },
                    new TaxBracket()
                    {
                        Id = 4,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 155625,
                        UpperLimit = 221708,
                        Rate = 29
                    },
                    new TaxBracket()
                    {
                        Id = 5,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 221708,
                        UpperLimit = 1000000000,
                        Rate = 33
                    },
                };

            decimal result = taxBracketBusiness.CalculateTaxes(300000, taxBracketList);
            Assert.Equal(77180.535m, result);
        }



        private static (
            TaxBracketBusiness taxBracketBusiness,
            Mock<ITaxBracketRepository> mockTaxBracketRepository,
            Mock<IFiscalYearBusiness> mockFiscalYearBusiness,
            Mock<IGovernmentBusiness> mockGovernmentBusiness
        ) Given_TaxBracketBusiness()
        {
            var taxBracketRepository = new Mock<ITaxBracketRepository>();
            var fiscalYearBusiness = new Mock<IFiscalYearBusiness>();
            var governmentBusiness = new Mock<IGovernmentBusiness>();

            fiscalYearBusiness
                .Setup(e => e.GetAllFiscalYearsAsync())
                .ReturnsAsync(new List<FiscalYear>()
                {
                    new FiscalYear()
                    {
                        Id = 3,
                        Year = 2002,
                        Description = "Fiscal Year of 2002"
                    }
                });

            fiscalYearBusiness
                .Setup(e => e.GetFiscalYearByIdAsync(3))
                .ReturnsAsync(new FiscalYear
                {
                    Id = 3,
                    Year = 2002,
                    Description = "Fiscal Year of 2002"
                });

            governmentBusiness
                .Setup(e => e.GetGovernmentsAsync())
                .ReturnsAsync(new List<Government>()
                {
                    new Government()
                    {
                        Id = 1,
                        Code = "CAN",
                        Description = "Canadian Feds"
                    },
                    new Government()
                    {
                        Id = 2,
                        Code = "QC",
                        Description = "QUEBEC"
                    }
                });

            governmentBusiness
                .Setup(e => e.GetGovernmentByIdAsync(1))
                .ReturnsAsync(new Government
                {
                    Id = 1,
                    Code = "CAN",
                    Description = "Canadian Feds"
                });

            taxBracketRepository
                .Setup(e => e.GetTaxBracketsAsync())
                .ReturnsAsync(new List<TaxBracket>()
                {
                    new TaxBracket()
                    {
                        Id = 1,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 0,
                        UpperLimit = 15000,
                        Rate = 17
                    },
                    new TaxBracket()
                    {
                        Id = 2,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 15000,
                        UpperLimit = 30000,
                        Rate = 17
                    }

                });

            taxBracketRepository
                .Setup(e => e.GetTaxBracketsByYearAndGov(3, 1))
                .ReturnsAsync(new List<TaxBracket>()
                {
                    new TaxBracket()
                    {
                        Id = 1,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 0,
                        UpperLimit = 50197,
                        Rate = 15
                    },
                    new TaxBracket()
                    {
                        Id = 2,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 50197,
                        UpperLimit = 100392,
                        Rate = 20.5m
                    },
                    new TaxBracket()
                    {
                        Id = 3,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 100392,
                        UpperLimit = 155625,
                        Rate = 26
                    },
                    new TaxBracket()
                    {
                        Id = 4,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 155625,
                        UpperLimit = 221708,
                        Rate = 29
                    },
                    new TaxBracket()
                    {
                        Id = 5,
                        FiscalYearId = 3,
                        GovernmentId = 1,
                        LowerLimit = 221708,
                        UpperLimit = 1000000000,
                        Rate = 33
                    },
                });

            var taxBracketBusiness = new TaxBracketBusiness(
                 taxBracketRepository.Object,
                 fiscalYearBusiness.Object,
                 governmentBusiness.Object
            );

            return (taxBracketBusiness, taxBracketRepository, fiscalYearBusiness, governmentBusiness);
        }
    }
}
