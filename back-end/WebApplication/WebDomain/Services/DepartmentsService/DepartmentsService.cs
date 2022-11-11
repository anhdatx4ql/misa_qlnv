using MISA.AMIS.Common;
using MISA.AMIS.DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebCommon;

namespace MISA.AMIS.BL
{
    /// <summary>
    /// Author: Phạm Văn Đạt(14/10/2022)
    /// Function: xử lý nghiệp vụ phòng ban
    /// </summary>
    public class DepartmentsService: BaseService<Departments>,IDepartmentsService
    {
        #region Fields
        private readonly IDepartmentsRepository _departments;
        #endregion

        #region Constructor
        public DepartmentsService(IDepartmentsRepository departments):base(departments)
        {
            _departments = departments;
        }
        #endregion
    }
}
