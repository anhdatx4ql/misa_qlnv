using MISA.AMIS.Common;
using MISA.AMIS.DL;
using WebCommon;

namespace MISA.AMIS.BL
{
    /// <summary>
    /// Author: Phạm Văn Đạt(08/12/2022)
    /// Function: xử lý nghiệp vụ tài khoản công nợ cần phải thu
    /// </summary>
    public class AccountsReceivableService : BaseService<AccountsReceivable>, IAccountsReceivableService
    {
        #region Fields
        private readonly IAccountsReceivableRepository _accounts;
        #endregion

        #region Constructor
        public AccountsReceivableService(IAccountsReceivableRepository accounts) : base(accounts)
        {
            _accounts = accounts;
        }
        #endregion
    }
}
