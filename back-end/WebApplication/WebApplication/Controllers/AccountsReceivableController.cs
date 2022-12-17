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
        #region Field

        private readonly IAccountsReceivableService _service;
        #endregion

        #region constructor
        public AccountsReceivableController(IAccountsReceivableService service):base(service)
        {
            _service = service;
        }
        #endregion
    }
}
