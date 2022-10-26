using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebCommon
{
    /// <summary>
    /// Author: Phạm Văn Đạt(13/10/2022)
    /// Function: model dữ liệu trả về
    /// </summary>
    public class ReponsitoryModel
    {
        #region Fields
        public Object Data { set; get; }
        public string StatusCode { set; get; }
        public List<string> Message { set; get; }
        #endregion

        #region Constructor
        public ReponsitoryModel(Object _data, string _statusCode, List<string> _message)
        {
            this.Data = _data;
            this.StatusCode = _statusCode;
            this.Message = _message;
        }
        public ReponsitoryModel()
        {

        }
        #endregion
    }


}
