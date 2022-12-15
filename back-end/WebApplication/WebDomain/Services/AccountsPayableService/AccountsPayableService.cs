using MISA.AMIS.Common;
using MISA.AMIS.DL;
using WebCommon;

namespace MISA.AMIS.BL
{
    /// <summary>
    /// Author: Phạm Văn Đạt(08/12/2022)
    /// Function: xử lý nghiệp vụ tài khoản
    /// </summary>
    public class AccountsPayableService : BaseService<AccountsPayable>, IAccountsPayableService
    {
        #region Fields
        private readonly IAccountsPayableRepository _accounts;
        #endregion

        #region Constructor
        public AccountsPayableService(IAccountsPayableRepository accounts) : base(accounts)
        {
            _accounts = accounts;
        }
        #endregion
    }
}
