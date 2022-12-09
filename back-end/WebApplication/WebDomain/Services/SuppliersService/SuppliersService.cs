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
    public class SuppliersService:BaseService<Suppliers>,ISuppliersService
    {
        #region Fields
        private readonly ISuppliersRepository _repository;
        #endregion

        #region Constructor
        public SuppliersService(ISuppliersRepository repository):base(repository)
        {
            _repository = repository;
        }
        #endregion
    }
}
