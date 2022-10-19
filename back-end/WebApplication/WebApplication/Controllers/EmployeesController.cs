using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebCommon;
using WebDomain;

namespace WebApplication
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : BaseController<Employees>
    {
        #region Field
        /// <summary>
        /// Khai báo employee service
        /// </summary>
        private readonly IEmployeesService _employeeService;
        #endregion

        #region contructors
        public EmployeesController(IEmployeesService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Lấy tất cả dữ liệu trong bảng
        /// </summary>
        /// <returns>danh sách các bản ghi</returns>
        [HttpGet]
        public override async Task<ReponsitoryModel> GettAll()
        {
            return await _employeeService.GetAll();
        }

        /// <summary>
        /// Author: Phạm Văn Đạt (19/10/2022)
        /// </summary>
        /// <param name="ids">danh sách id</param>
        /// <returns></returns>
        [HttpDelete("DeleteRecords")]
        public async Task<ReponsitoryModel> DeleteRecords([FromBody] List<Guid> ids)
        {
            return await _employeeService.DeleteRecords(ids);
        }


        [HttpPost("Paging")]
        public async Task<ReponsitoryModel> Paging(string keyword = null, int currentPageNumber = 1, int pageSize = 10)
        {
            return await _employeeService.Paging(keyword, currentPageNumber, pageSize);
        }
        #endregion
    }
}
