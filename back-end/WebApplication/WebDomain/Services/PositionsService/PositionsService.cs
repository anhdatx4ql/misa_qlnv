using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebCommon;
using WebInfrastructure;

namespace WebDomain
{
    /// <summary>
    /// Author: Phạm Văn Đạt(14/10/2022)
    /// Function: xử lý nghiệp vụ chức danh
    /// </summary>
    public class PositionsService:BaseService<Positions>,IPositionsService
    {
        #region Fields
        private readonly IPositionsRepository _position;
        #endregion

        #region Constructor
        public PositionsService(IPositionsRepository position):base(position)
        {
            _position = position;
        }
        #endregion
    }
}
