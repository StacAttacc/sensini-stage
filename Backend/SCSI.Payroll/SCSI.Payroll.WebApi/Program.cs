using Microsoft.EntityFrameworkCore;
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
            builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();
            builder.Services.AddDbContext<PayrollDbContext>(options => options.UseSqlServer("conString"));

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle


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

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}