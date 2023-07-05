using Microsoft.EntityFrameworkCore;
using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Business.Implementations;
using SCSI.Payroll.Repository;
using SCSI.Payroll.Repository.Contracts;
using SCSI.Payroll.Repository.Implementations;
using SCSI.Payroll.WebApi.MiddleWares;

namespace SCSI.Payroll.WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            // Add services to the container.
            var configurationBuilder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional:true, reloadOnChange: true)
                .AddJsonFile("appsettings.Development.json", optional:true, reloadOnChange:true);

            var configuration = configurationBuilder.Build();

            builder.Services.AddSingleton<IConfiguration>(configuration);
            
            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            builder.Services.AddScoped<IEmployeeBusiness, EmployeeBusiness>();

            builder.Services.AddScoped<IFiscalYearRepository, FiscalYearRepository>();
            builder.Services.AddScoped<IFiscalYearBusiness, FiscalYearBusiness>();

            builder.Services.AddScoped<IGovernmentRepository, GovernmentRepository>();
            builder.Services.AddScoped<IGovernmentBusiness, GovernmentBusiness>();

            builder.Services.AddScoped<ITaxBracketRepository, TaxBracketRepository>();
            builder.Services.AddScoped<ITaxBracketBusiness, TaxBracketBusiness>();

            builder.Services.AddScoped<ISocialContributionEmployeeRepository, SocialContributionEmployeeRepository>();
            builder.Services.AddScoped<ISocialContributionEmployeeBusiness, SocialContributionEmployeeBusiness>();

            builder.Services.AddScoped<ISocialContributionEmployerRepository, SocialContributionEmployerRepository>();
            builder.Services.AddScoped<ISocialContributionEmployerBusiness, SocialContributionEmployerBusiness>();

            builder.Services.AddScoped<ExceptionMiddleware>();

            builder.Services.AddDbContext<PayrollDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("PayrollConn")));

            var x = configuration.GetConnectionString("PayrollConn");

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(b =>
                {
                    b.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod();
                });
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

           

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseMiddleware<ExceptionMiddleware>();

            app.MapControllers();

            app.Run();
        }
    }
}