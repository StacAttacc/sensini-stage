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
        }
    }
}
