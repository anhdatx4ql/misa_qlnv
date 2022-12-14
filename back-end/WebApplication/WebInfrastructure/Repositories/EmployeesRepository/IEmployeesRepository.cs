using Dapper;
using MISA.AMIS.Common;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MISA.AMIS.DL
{
    /// <summary>
    /// Author: Phạm Văn Đạt(15/10/2022)
    /// Function: thao tác với DB của bảng phòng ban
    /// </summary>
    public interface IEmployeesRepository : IBaseRepository<Employees>
    {
    }
}
