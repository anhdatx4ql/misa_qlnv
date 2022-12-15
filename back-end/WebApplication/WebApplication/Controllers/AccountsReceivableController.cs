using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.AMIS.BL;
using MISA.AMIS.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.AMIS.Application
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsReceivableController : BaseController<AccountsReceivable>
    {
        #region Fields
        /// <summary>
        /// Author: Phạm Văn Đạt(09/12/2022)
        /// Function: Xử lý khởi tạo service tài khoản
        /// </summary>
        private readonly IAccountsReceivableService _service;
        #endregion

        #region Constructor
        public AccountsReceivableController(IAccountsReceivableService service) : base(service)
        {
            _service = service;
        }
        #endregion
    }
}
