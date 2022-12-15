using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.AMIS.BL;
using MISA.AMIS.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebCommon;

/// <summary>
/// Author: Phạm Văn Đạt(09/12/2022)
/// FUnction: Xử lý kết xuất api tài khoản công nợ phải trả
/// </summary>

namespace MISA.AMIS.Application
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsPayableController : BaseController<AccountsPayable>
    {
        #region Fields
        /// <summary>
        /// Author: Phạm Văn Đạt(09/12/2022)
        /// Function: Xử lý khởi tạo service tài khoản
        /// </summary>
        private readonly IAccountsPayableService _service;
        #endregion

        #region Constructor
        public AccountsPayableController(IAccountsPayableService service) :base(service)
        {
            _service = service;
        }
        #endregion
    }
}
