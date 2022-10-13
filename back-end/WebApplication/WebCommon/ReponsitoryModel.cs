using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebCommon
{
    public class ReponsitoryModel
    {
        public Object Data { set; get; }
        public string StatusCode { set; get; }
        public List<string> Message { set; get; }
        public ReponsitoryModel(Object _data, string _statusCode, List<string> _message)
        {
            this.Data = _data;
            this.StatusCode = _statusCode;
            this.Message = _message;
        }
        public ReponsitoryModel()
        {

        }
    }


}
