using MISA.AMIS.Common;
using MISA.AMIS.DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// Author: Phạm Văn Đạt(09/12/2022)
/// Function: xử lý nghiệp vụ nhóm khách hàng
/// </summary>

namespace MISA.AMIS.BL
{
    public class GroupSuppliersService :BaseService<GroupSuppliers>, IGroupSuppliersService
    {
        #region Fields
        private readonly IGroupSuppliersRepository _repository;
        #endregion

        #region Constructor
        public GroupSuppliersService(IGroupSuppliersRepository repository) : base(repository)
        {
            _repository = repository;
        }
        #endregion
    }
}
