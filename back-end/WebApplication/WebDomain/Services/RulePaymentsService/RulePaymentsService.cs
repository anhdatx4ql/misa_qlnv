using MISA.AMIS.Common;
using MISA.AMIS.DL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

/// <summary>
/// Author: Phạm Văn Đạt(09/12/2022)
/// Function: xử lý nghiệp vụ điều khoản thanh toán
/// </summary>

namespace MISA.AMIS.BL
{
    public class RulePaymentsService :BaseService<RulePayments>, IRulePaymentsService
    {
        #region Fields
        private readonly IRulePaymentsRepository _repository;
        #endregion

        #region Constructor
        public RulePaymentsService(IRulePaymentsRepository repository) : base(repository)
        {
            _repository = repository;
        }
        #endregion
    }
}
