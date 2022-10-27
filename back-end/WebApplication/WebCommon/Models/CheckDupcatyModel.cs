using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebCommon
{
    /// <summary>
    /// Author: PHạm Văm Đạt(27/10/2022)
    /// Function: model trả về dữ liệu lúc check trùng
    /// </summary>
    public class CheckDupcatyModel
    {
        public List<string> Message { set; get; }

        public List<string> FieldsDupcaty { set; get; }

        public CheckDupcatyModel(List<string> Message, List<string> FieldsDupcaty)
        {
            this.Message = Message;
            this.FieldsDupcaty = FieldsDupcaty;
        }

        public CheckDupcatyModel()
        {
           
        }
    }
}
