using Dapper;
using MISA.AMIS.Common;
using MISA.AMIS.DL;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebCommon;
using WebCommon.Resources;

namespace MISA.AMIS.BL
{
    /// <summary>
    /// Author: Phạm Văn Đạt(14/10/2022)
    /// Function: xử lý nghiệp vụ khách hàng
    /// </summary>
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
        /// <summary>
        /// Author: Phạm Văn Đạt(26/10/2022)
        /// Function: Xử lý lấy tất cả dữ liệu trong bảng khách hàng
        /// </summary>
        /// <returns></returns>
        public override async Task<ReponsitoryModel> GetAll()
        {
            List<string> message = new List<string>();
            try
            {
                var sql = $"SELECT * FROM View_Employees LIMIT 100";
                var result = await _employee.GetAllAsync<EmployeesViewModel>(sql);
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
        public async Task<ReponsitoryModel> Paging(string keyword, int currentPageNumber, int pageSize, List<EmployeesModelFilter> listFilters)
        {
            List<string> message = new List<string>();
            try
            {

                // chỉnh sửa lại keyword
                keyword = '%' + keyword + '%';

                var stringFilter = "";

                // xử lý lọc các trường
                if (listFilters.Count == 0){
                    stringFilter = "1=1";
                }
                else
                {
                    // xử lý lấy dữ liệu where
                    foreach(var item in listFilters)
                    {

                        if (item.Operator == "like" || item.Operator == "not like")
                        {
                            item.Value = CheckSpecialCharacters.CheckSpecial(item.Value);
                        }

                        var checkGender = false;
                        switch (item.TypeOperator)
                        {
                            case "like":
                                item.Value = "'%" + item.Value + "%'";
                                break;
                            case "firstLike":
                                item.Value = "'" + item.Value + "%'";
                                break;
                            case "lastLike":
                                item.Value = "'%" + item.Value + "'";
                                break;
                            case "gender":
                                checkGender = true;
                                break;
                            default:
                                item.Value = "'" + item.Value + "'";
                                break;
                        }

                        if(checkGender == true)
                        {
                            stringFilter += item.Name + " " + item.Operator + " " + int.Parse(item.Value);
                        }
                        else
                        {
                            stringFilter += item.Name + " " + item.Operator + " " + item.Value;
                        }

                        
                        if(item != listFilters[listFilters.Count - 1])
                        {
                            stringFilter += " and ";
                        }
                    }
                }

                var offset = (currentPageNumber - 1) * pageSize;

                // lấy tên proceduce
                var nameProceduce = "SELECT COUNT(*) FROM employees e WHERE e.Id IN (SELECT ve.Id FROM view_employees ve WHERE (ve.Name LIKE @_keyword OR ve.EmployeeId LIKE @_keyword OR ve.NumberPhone LIKE @_keyword) AND " + stringFilter + "); ";
                nameProceduce += "SELECT * FROM view_employees ve WHERE(ve.Name LIKE @_keyword OR ve.EmployeeId LIKE @_keyword OR ve.NumberPhone LIKE @_keyword) AND " + stringFilter + " ORDER BY ve.UpdatedAt DESC LIMIT @_offset,@_pageSize; ";
                // khai báo parameters
                var parameters = new DynamicParameters();
                parameters.Add("@_keyword", keyword);
                parameters.Add("@_pageSize", pageSize);
                parameters.Add("@_offset", offset);

                //  gọi đến db truy vấn
                var result = await _employee.Paging<EmployeesViewModel>(nameProceduce, parameters);
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
        /// Author: Phạm Văn Đạt(23/10/2022)
        /// Function: Lấy mã code mới nhất
        /// </summary>
        /// <returns></returns>
        public async Task<ReponsitoryModel> GetMaxCode()
        {
            List<string> message = new List<string>();
            try
            {
                // lấy tên proceduce
                var nameProceduce = "Proc_Employees_GetMaxCode";

                // gọi đến db
                var code = await _employee.GetMaxCodeAsync(nameProceduce);

                if (code == null)
                {
                    message.Add(MessageErrors.GetFail);
                    return new ReponsitoryModel(null, CodeErrors.Code400, message);
                }

                string[] ArrCode = code.EmployeeId.Split('-');
                long number;
                var isSuccess = Int64.TryParse(ArrCode[1], out number);
                if (isSuccess == true)
                {
                    var codeNew = ArrCode[0] + "-" + (number + 1).ToString();
                    message.Add(MessageSuccess.GetSuccess);
                    return new ReponsitoryModel(codeNew, CodeSuccess.Code200, message);
                }

                message.Add(MessageErrors.GetFail);
                return new ReponsitoryModel(null, CodeErrors.Code400, message);

            }
            catch(Exception ex)
            {
                message.Add(ex.Message);
                return new ReponsitoryModel(null, CodeErrors.Code500, message);
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(26/10/2022)
        /// Function: Xử lý nghiệp vụ xuất excel
        /// </summary>
        /// <param name="ids">danh sách id các khách hàng cần xuất</param>
        /// <returns></returns>
        public async Task<byte[]> ExportExcel(string keyword = null)
        {
            byte[] fileContents;
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            ExcelPackage Ep = new ExcelPackage();

            ExcelWorksheet workSheet = Ep.Workbook.Worksheets.Add("LIst_Employees_");

            // Tạo title
            workSheet.Cells["A1"].Value = "Mã khách hàng";
            workSheet.Cells["B1"].Value = "Tên khách hàng";
            workSheet.Cells["C1"].Value = "Giới tính";
            workSheet.Cells["D1"].Value = "Ngày sinh";
            workSheet.Cells["E1"].Value = "Số chứng minh nhân dân";
            workSheet.Cells["F1"].Value = "Ngày cấp";
            workSheet.Cells["G1"].Value = "Nơi cấp";
            workSheet.Cells["H1"].Value = "Số tài khoản";
            workSheet.Cells["I1"].Value = "Tên ngân hàng";
            workSheet.Cells["J1"].Value = "Chi nhánh ngân hàng";
            workSheet.Cells["K1"].Value = "Địa chỉ";
            workSheet.Cells["L1"].Value = "Số điện thoại di động";
            workSheet.Cells["M1"].Value = "Số điện bàn";
            workSheet.Cells["N1"].Value = "Email";
            workSheet.Cells["O1"].Value = "Là khách hàng";
            workSheet.Cells["P1"].Value = "Là nhà cung cấp";
            workSheet.Cells["Q1"].Value = "Tên phòng ban";
            workSheet.Cells["R1"].Value = "Tên chức vụ";


            var listTitle = new List<string>()
            {
                "A1","B1","C1","D1","E1","F1","G1","H1","I1","J1","K1","L1","M1","N1","O1","P1","Q1","R1"
            };

            listTitle.ForEach((title) =>
            {

                //  in đậm
                workSheet.Cells[title].Style.Font.Bold = true;

                // căn giữa
                workSheet.Cells[title].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

                //workSheet.Cells["title:D32"].Style.Fill.PatternType = ExcelFillStyle.Solid;

                // border
                workSheet.Cells[title].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                workSheet.Cells[title].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                workSheet.Cells[title].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                workSheet.Cells[title].Style.Border.Left.Style = ExcelBorderStyle.Thin;

                //Màu border
                //workSheet.Cells["A1:K1"].Style.Border.Bottom.Color.SetColor(Color.Black);

            });

            System.Drawing.Color colFromHex = System.Drawing.ColorTranslator.FromHtml("#D8D8D8");
            workSheet.Cells["A1:R1"].Style.Fill.PatternType = ExcelFillStyle.Solid;
            workSheet.Cells["A1:R1"].Style.Fill.BackgroundColor.SetColor(colFromHex);

            var parameters = new DynamicParameters();

            var sqlQuery = @"SELECT * FROM view_employees ve";

            // nếu mảng ids = null => lấy hết 
            if (keyword != null)
            {
                sqlQuery += @" WHERE ve.EmployeeId LIKE @keyword OR ve.Name LIKE @keyword OR ve.NumberPhone LIKE @keyword;";
                keyword = '%' + keyword + '%';
                parameters.Add("@keyword", keyword);
            }
            var result = await _employee.GetAllAsync<EmployeesViewModel>(sqlQuery, parameters);

            if (result.Count > 0)
            {

                // lấy dữ liệu
                int row = 2;
                foreach (var item in result)
                {
                    workSheet.Cells[string.Format("A{0}", row)].Value = (item.EmployeeId != null) ? item.EmployeeId : "";
                    workSheet.Cells[string.Format("B{0}", row)].Value = (item.Name != null) ? item.Name : "";
                    workSheet.Cells[string.Format("C{0}", row)].Value = ((int)item.Gender == (int)Gender.Male) ? "Nam" : ((int)item.Gender == (int)Gender.Female) ? "Nữ" : ((int)item.Gender == (int)Gender.Other) ? "Khác" : "-";
                    workSheet.Cells[string.Format("D{0}", row)].Value = (item.BirthDay != null) ? item.BirthDay : "";
                    workSheet.Cells[string.Format("E{0}", row)].Value = (item.IdNo != null) ? item.IdNo : "";
                    workSheet.Cells[string.Format("F{0}", row)].Value = (item.IssuaOn != null) ? item.IssuaOn : "";
                    workSheet.Cells[string.Format("G{0}", row)].Value = (item.PlaceOfIssue != null) ? item.PlaceOfIssue : "";
                    workSheet.Cells[string.Format("H{0}", row)].Value = (item.BankAccountNumber != null) ? item.BankAccountNumber : "";
                    workSheet.Cells[string.Format("I{0}", row)].Value = (item.BankName != null) ? item.BankName : "";
                    workSheet.Cells[string.Format("j{0}", row)].Value = (item.BankAccountBrand != null) ? item.BankAccountBrand : "";
                    workSheet.Cells[string.Format("K{0}", row)].Value = (item.Address != null) ? item.Address : "";
                    workSheet.Cells[string.Format("L{0}", row)].Value = (item.NumberPhone != null) ? item.NumberPhone : "";
                    workSheet.Cells[string.Format("M{0}", row)].Value = (item.DeskPhone != null) ? item.DeskPhone : "";
                    workSheet.Cells[string.Format("N{0}", row)].Value = (item.Email != null) ? item.Email : "";
                    workSheet.Cells[string.Format("O{0}", row)].Value = (item.IsEmployee == true) ? "X" : "";
                    workSheet.Cells[string.Format("P{0}", row)].Value = (item.IsSuppiler == true) ? "X" : "";
                    workSheet.Cells[string.Format("Q{0}", row)].Value = (item.DepartmentName != null) ? item.DepartmentName : "";
                    workSheet.Cells[string.Format("R{0}", row)].Value = (item.PositionName != null) ? item.PositionName : "";
                    row++;
                }

                // border cho dữ liệu
                for (var i = 0; i <= result.Count; i++)
                {
                    for (var j = 1; j <= listTitle.Count; j++)
                    {
                        workSheet.Cells[i + 1, j].Style.Font.Size = 13;
                        workSheet.Cells[i + 1, j].Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                        workSheet.Cells[i + 1, j].Style.Border.Top.Style = ExcelBorderStyle.Thin;
                        workSheet.Cells[i + 1, j].Style.Border.Right.Style = ExcelBorderStyle.Thin;
                        workSheet.Cells[i + 1, j].Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    }
                }

                workSheet.Cells["A:R"].AutoFitColumns();

                fileContents = Ep.GetAsByteArray();

                return fileContents;
            }
            return null;
        }
        #endregion
    }
}
