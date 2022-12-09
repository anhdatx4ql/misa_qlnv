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
    public class Suppliers_GroupSuppliersService : BaseService<Suppliers_GroupSuppliers>,ISuppliers_GroupSuppliersService
    {
        #region Fields
        private readonly ISuppliers_GroupSuppliersRepository _repository;
        #endregion

        #region Constructor
        public Suppliers_GroupSuppliersService(ISuppliers_GroupSuppliersRepository repository):base(repository)
        {
            _repository = repository;
        }
        #endregion
    }
}
