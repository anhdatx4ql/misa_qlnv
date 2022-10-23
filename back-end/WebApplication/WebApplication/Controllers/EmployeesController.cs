﻿using Microsoft.AspNetCore.Mvc;
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
        [HttpDelete]
        public async Task<ReponsitoryModel> DeleteRecords([FromBody] List<Guid> ids)
        {
            return await _employeeService.DeleteRecords(ids);
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(23/10/2022)
        /// Function: xử lý phân trang
        /// </summary>
        /// <param name="keyword"></param>
        /// <param name="currentPageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        [HttpGet("Paging")]
        public async Task<ReponsitoryModel> Paging(string keyword = null, int currentPageNumber = 1, int pageSize = 10)
        {
            return await _employeeService.Paging(keyword, currentPageNumber, pageSize);
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(23/10/2022)
        /// Function: Lấy mã code mới nhất
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetMaxCode")]
        public async Task<ReponsitoryModel> GetMaxCode()
        {
            return await _employeeService.GetMaxCode();
        }
        #endregion
    }
}
