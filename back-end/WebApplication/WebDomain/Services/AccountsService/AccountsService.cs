using MISA.AMIS.Common;
using MISA.AMIS.DL;
using WebCommon;

namespace MISA.AMIS.BL
{
    /// <summary>
    /// Author: Phạm Văn Đạt(08/12/2022)
    /// Function: xử lý nghiệp vụ tài khoản
    /// </summary>
    public class AccountsService : BaseService<Accounts>, IAccountsService
    {
        #region Fields
        private readonly IAccountsRepository _accounts;
        #endregion

        #region Constructor
        public AccountsService(IAccountsRepository accounts) : base(accounts)
        {
            _accounts = accounts;
        }
        #endregion
    }
}
