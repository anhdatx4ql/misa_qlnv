using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MISA.AMIS.Common;
using MISA.AMIS.BL;

namespace WebApplication
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController:BaseController<Departments>
    {
        #region Fields
        /// <summary>
        /// Author: Phạm Văn Đạt(26/10/2022)
        /// Function: Xử lý khởi tạo service
        /// </summary>
        private readonly IDepartmentsService _departments;
        #endregion

        #region Constructor
        public DepartmentsController(IDepartmentsService departments):base(departments)
        {
            _departments = departments;
        }
        #endregion
    }
}
