using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.AMIS.Common
{
    /// <summary>
    /// Author: PHạm Văm Đạt(27/10/2022)
    /// Function: model trả về dữ liệu lúc check trùng
    /// </summary>
    public class CheckDupcatyModel
    {
        #region Fields
        public List<string> Message { set; get; }

        public List<Dictionary<string,string>> FieldsDupcaty { set; get; }
        #endregion

        #region constructor
        public CheckDupcatyModel(List<string> message, List<Dictionary<string, string>> fieldsDupcaty)
        {
            this.Message = message;
            this.FieldsDupcaty = fieldsDupcaty;
        }

        public CheckDupcatyModel()
        {
           
        }
        #endregion
    }
}
