using SCSI.Payroll.Models.Domains;
using System.Net;
using System.Text.Json;

namespace SCSI.Payroll.WebApi.MiddleWares
{
    public class ExceptionMiddleware : IMiddleware
    {
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await ManageError(ex, context);
            }
        }

        private async Task ManageError(Exception ex, HttpContext context)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var response = new CustomApiError((int)HttpStatusCode.InternalServerError, ex.Message);
            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var json = System.Text.Json.JsonSerializer.Serialize(response, options);
            await context.Response.WriteAsync(json);
        }
    }
}
