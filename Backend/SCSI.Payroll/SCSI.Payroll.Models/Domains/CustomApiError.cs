using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SCSI.Payroll.Models.Domains
{
    public class CustomApiError
    {
        public CustomApiError(int statusCode, string message)
        {
            StatusCode = statusCode;
            Message = message;
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}
