using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebCommon;
using WebCommon.Resources;
using WebInfrastructure;

namespace WebDomain
{
    public class EmployeesService : BaseService<Employees>, IEmployeesService
    {
        #region Field
        private readonly IEmployeesRepository _employee;
        #endregion

        #region Constructor
        public EmployeesService(IEmployeesRepository employee):base(employee)
        {
            _employee = employee;
        }
        #endregion

        #region Methods
        public override async Task<ReponsitoryModel> GetAll()
        {
            List<string> message = new List<string>();
            try
            {
                var result = await _employee.GetAllAsync<EmployeesViewModel>();
                message.Add(MessageSuccess.GetSuccess);
                return new ReponsitoryModel(result, CodeSuccess.Code200, message);
            }
            catch (Exception ex)
            {
                message.Add(ex.Message);
                return new ReponsitoryModel(null, CodeErrors.Code500, message);

            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(19/10/2022)
        /// Function: Xử lý phân trang dữ liệu
        /// </summary>
        /// <param name="keyword">tìm kiếm theo tên, id</param>
        /// <param name="currentPageNumber">trang hiện tại</param>
        /// <param name="pageSize">số bản ghi/trang</param>
        /// <returns></returns>
        public async Task<ReponsitoryModel> Paging(string keyword, int currentPageNumber, int pageSize)
        {
            List<string> message = new List<string>();
            try
            {
                // lấy tên proceduce
                var nameProceduce = "Proc_Employees_Paging(@_keyword,@_currentPageNumber,@_pageSize)";

                // chỉnh sửa lại keyword
                keyword = '%' + keyword + '%';

                // khai báo parameters
                var parameters = new DynamicParameters();
                parameters.Add("@_keyword", keyword);
                parameters.Add("@_currentPageNumber", currentPageNumber);
                parameters.Add("@_pageSize", pageSize);

                //  gọi đến db truy vấn
                var result = await _employee.Paging<EmployeesViewModel>(nameProceduce, parameters);
                message.Add("thử nè");
                return new ReponsitoryModel(result, CodeSuccess.Code200, message);
            }
            catch (Exception ex)
            {
                message.Add(ex.Message);
                return new ReponsitoryModel(null, CodeErrors.Code500, message);
            }
        }
        #endregion
    }
}
