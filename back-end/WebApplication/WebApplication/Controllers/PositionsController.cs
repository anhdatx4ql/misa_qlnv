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
    public class PositionsController : BaseController<Positions>
    {
        #region Fields
        private readonly IPositionsService _positions;
        #endregion

        #region Constructor
        public PositionsController(IPositionsService positions) : base(positions)
        {
            _positions = positions;
        }
        #endregion
    }
}
