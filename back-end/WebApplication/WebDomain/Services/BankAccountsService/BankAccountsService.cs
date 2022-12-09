using MISA.AMIS.Common;
using MISA.AMIS.DL;
using WebCommon;

namespace MISA.AMIS.BL
{
    /// <summary>
    /// Author: Phạm Văn Đạt(08/12/2022)
    /// Function: xử lý nghiệp vụ tài khoản
    /// </summary>
    public class BankAccountsService : BaseService<BankAccounts>, IBankAccountsService
    {
        #region Fields
        private readonly IBankAccountsRepository _bankAccounts;
        #endregion

        #region Constructor
        public BankAccountsService(IBankAccountsRepository bankAccounts) : base(bankAccounts)
        {
            _bankAccounts = bankAccounts;
        }
        #endregion
    }
}
