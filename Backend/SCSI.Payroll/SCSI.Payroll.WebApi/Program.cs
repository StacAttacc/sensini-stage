using Microsoft.EntityFrameworkCore;
using SCSI.Payroll.Business.Contracts;
using SCSI.Payroll.Business.Implementations;
using SCSI.Payroll.Repository;
using SCSI.Payroll.Repository.Contracts;
using SCSI.Payroll.Repository.Implementations;

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

            builder.Services.AddScoped<ITaxRepository, TaxRepository>();
            builder.Services.AddScoped<ITaxBusiness, TaxBusiness>();

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


            app.MapControllers();

            app.Run();
        }
    }
}