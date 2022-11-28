using Dapper;
using MISA.AMIS.Common;
using MISA.AMIS.DL;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebCommon.Resources;
namespace MISA.AMIS.BL
{
    /// <summary>
    /// Author: Phạm Văn Đạt(14/10/2022)
    /// Function: base xử lý nghiệp vụ
    /// </summary>
    public class BaseService<T> : IBaseService<T>
    {

        #region Field
        private readonly IBaseRepository<T> _baseRepository;
        #endregion

        #region Constructor

        public BaseService(IBaseRepository<T> baseRepository)
        {
            _baseRepository = baseRepository;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Lấy tất cả bản ghi trong bảng
        /// </summary>
        /// <returns>danh sách dữ liệu</returns>
        public virtual async Task<ReponsitoryModel> GetAll()
        {
            List<string> message = new List<string>();
            try
            {
                string tableName = TableName.GetTableName<T>();

                if (tableName == null)
                    return null;
                var sql = $"SELECT * FROM View_{tableName} LIMIT 100";
                var result = await _baseRepository.GetAllAsync<T>(sql);
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
        /// Author: Phạm Văn Đạt
        /// Function: Thêm mới 1 bản ghi vào bảng
        /// </summary>
        /// <param name="entity">dữ liệu truyển vào T</param>
        /// <returns></returns>
        public virtual async Task<ReponsitoryModel> InsertRecord(T entity)
        {
            List<string> message = new List<string>();

            try
            {
                // lấy tên table
                var tableName = TableName.GetTableName<T>();

                // lấy các thuộc tính của entity
                var properties = typeof(T).GetProperties();

                var id = (Guid)this.GetIdByRecord(entity, properties);

                // validate
                var errValidate = await this.Validate(entity, properties, id, tableName);

                if (errValidate.FieldsDupcaty.Count >0)
                {
                    return new ReponsitoryModel(errValidate.FieldsDupcaty, CodeErrors.Code400, errValidate.Message);
                }

                var parameters = new DynamicParameters();

                // lấy giá trị thuộc tính
                foreach (PropertyInfo property in properties)
                {
                    var propertyValue = property.GetValue(entity);

                    if (property.Name != "CreatedAt" || property.Name != "UpdatedAt")
                    {
                        parameters.Add($"@_{property.Name}", propertyValue);
                    }
                        
                }

                parameters.Add($"@_CreatedAt", DateTime.Now);
                parameters.Add($"@_UpdatedAt", DateTime.Now);

                // nếu validate thành công
                var storeName = $"Proc_{tableName}_Insert";

                // gọi hàm thêm dữ liệu vào db
                var result = await _baseRepository.InsertRecord(storeName, parameters);

                if (result == 0)
                {
                    message.Add(MessageErrors.CreatedFail);

                    return new ReponsitoryModel(null, CodeErrors.Code400, message);
                }

                message.Add(MessageSuccess.CreatedSuccess);

                return new ReponsitoryModel(result, CodeSuccess.Code201, message);


            }
            catch (Exception ex)
            {
                message.Add(ex.Message);
                return new ReponsitoryModel(null, CodeErrors.Code500, message);
            }


        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Update 1 bản ghi (chưa test)
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public virtual async Task<ReponsitoryModel> UpdateRecord(T entity)
        {
            List<string> message = new List<string>();
            try
            {

                // lấy tên bảng
                var tableName = TableName.GetTableName<T>();

                // lấy các thuộc tính public của entity
                var properties = typeof(T).GetProperties();

                var id = (Guid)this.GetIdByRecord(entity, properties);

                // validate dữ liệu
                var validateErrors = await this.Validate(entity, properties, id, tableName);

                if (validateErrors.FieldsDupcaty.Count > 0)
                {
                    return new ReponsitoryModel(validateErrors.FieldsDupcaty, CodeErrors.Code400, validateErrors.Message);
                }

                if (id == Guid.Empty)
                {
                    message.Add(MessageErrors.DuplicateExists);
                    return new ReponsitoryModel(null, CodeErrors.Code400, message);
                }

                // lấy ra id, lấy dữ liệu cũ theo Id
                var oldEntity = await _baseRepository.GetById(id, tableName);

                // nếu tồn tại bản ghi thì mới update
                if (oldEntity != null)
                {
                    var parameters = new DynamicParameters();
                    // truyền các giá trị mới vào parameters
                    foreach (var property in properties)
                    {
                        var propertyValue = property.GetValue(entity);
                        var value = (propertyValue?.ToString() != "" && propertyValue?.ToString() != null) ? propertyValue : null;
                        if (property.Name != "UpdatedAt")
                            parameters.Add($"@_{property.Name}", value);
                    }

                    // thêm thời gian hiện tại 
                    parameters.Add($"@_UpdatedAt", DateTime.Now);

                    // lấy tên proceduce update
                    var sql = $"Proc_{tableName}_Update";

                    // thao tác với csdl
                    var result = await _baseRepository.UpdateRecord(sql, parameters);

                    if (result > 0)
                    {
                        message.Add(MessageSuccess.UpdatedSuccess);
                        return new ReponsitoryModel(result, CodeSuccess.Code200, message);
                    }

                    message.Add(MessageErrors.UpdatedFail);
                    return new ReponsitoryModel(result, CodeErrors.Code400, message);
                }

                // nếu không tồn tại bản ghi trả về thông báo
                message.Add(MessageErrors.DuplicateExists);
                return new ReponsitoryModel(null, CodeErrors.Code400, message);

            }
            catch (Exception ex)
            {
                message.Add(ex.Message);
                return new ReponsitoryModel(null, CodeErrors.Code500, message);
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Xóa 1 hoặc nhiều bản ghi (chưa test)
        /// </summary>
        /// <param name="ids"></param>
        /// <returns></returns>
        public virtual async Task<ReponsitoryModel> DeleteRecords(List<Guid> ids)
        {
            var messages = new List<string>();
            try
            {
                // kiểm tra xem mảng id truyền vào có tồn tại không
                if (ids.Count == 0)
                {
                    messages.Add(MessageErrors.DuplicateExists);
                    return new ReponsitoryModel(null, CodeErrors.Code400, messages);
                }

                var tableName = TableName.GetTableName<T>();

                var sql = $"DELETE FROM {tableName} WHERE Id IN @ids;";
                var parameter = new DynamicParameters();
                parameter.Add("ids", ids);

                var result = await _baseRepository.DeleteRecord(query: sql, parameter);

                if (result == 0)
                {
                    messages.Add(MessageErrors.DeleteFail);
                    return new ReponsitoryModel(null, CodeErrors.Code400, messages);
                }

                messages.Add(MessageSuccess.DeletedSuccess);
                return new ReponsitoryModel(result, CodeSuccess.Code200, messages);

            }
            catch (Exception ex)
            {
                messages.Add(ex.Message);
                return new ReponsitoryModel(null, CodeErrors.Code500, messages);
            }
        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Xử lý validate base
        /// </summary>
        /// <param name="entity">table</param>
        /// <returns>lỗi validate nếu có</returns>
        private async Task<CheckDupcatyModel> Validate(T entity, PropertyInfo[] properties, Guid id, string tableName)
        {

            // khởi tạo message hứng lỗi
            var fieldsDupcaty = new List<Dictionary<String, String>>();
            var message = new List<string>();

            foreach (var property in properties)
            {

                await this.HandlerValidate(property, entity, id, tableName, fieldsDupcaty, message);
            }

            return new CheckDupcatyModel(message, fieldsDupcaty);

        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Xử lý validate dữ liệu
        /// </summary>
        /// <param name="property">thuộc tính</param>
        /// <param name="entity">bảng</param>
        /// <param name="messageError">mảng chứa lỗi</param>
        /// <returns></returns>
        private async Task HandlerValidate(PropertyInfo property, T entity, Guid id, string tableName, List<Dictionary<string, string>> checkValidateFields, List<string> messageValidateFields)
        {
            // lấy tên thuộc tính
            var propertyName = property.Name;

            // lấy giá trị của thuộc tính theo tên từ entity truyền vào
            var propertyValue = property.GetValue(entity, null);

            // nếu không có attribute required => trả về null
            var attributeRequired = (AttributeRequired)Attribute.GetCustomAttribute(property, typeof(AttributeRequired));

            // nếu không có attribute gender=> trả về null
            var attributeGender = (AttributeGender)Attribute.GetCustomAttribute(property, typeof(AttributeGender));

            // nếu không có attribute email => trả về null
            var attributeEmail = (AttributeEmail)Attribute.GetCustomAttribute(property, typeof(AttributeEmail));

            // nếu không có attribute phone => trả về null
            var attributePhone = (AttributePhone)Attribute.GetCustomAttribute(property, typeof(AttributePhone));

            // nếu không có thuộc tính attribute Exists => trả về null
            var attributeExists = (AttributeExists)Attribute.GetCustomAttribute(property, typeof(AttributeExists));

            // nếu không có thuộc tính attribute Exists => trả về null
            var attributePrimarykey = (AttributePrimarykey)Attribute.GetCustomAttribute(property, typeof(AttributePrimarykey));

            // nếu không có thuộc tính attribute Exists => trả về null
            var attributeDateTime = (AttributeDateTime)Attribute.GetCustomAttribute(property, typeof(AttributeDateTime));

            // kiểm tra nếu có add message thì thêm field vào list trong trường hợp field đó chưa có trong list
            var checkSelectMessage = false;

            // xử lý validate
            if (attributePrimarykey != null)
            {

                // nếu id rỗng thì hiển thị thông báo lỗi
                if ((Guid)propertyValue == Guid.Empty)
                {
                    // nếu tồn tại attribute và giá trị của nó là null => thêm vào mảng lỗi lỗi
                    messageValidateFields.Add(attributePrimarykey.ErrorMessage);
                    checkSelectMessage = true;
                }


            }
            else if (attributeRequired != null && propertyValue == null)
            {
                // nếu tồn tại attribute AttributeRequired và giá trị null => thêm vào mảng lỗi
                messageValidateFields.Add(attributeRequired.ErrorMessage);
                checkSelectMessage = true;
            }
            else if (attributeGender != null && propertyValue != null && ((int?)propertyValue < (int?)Gender.Male || (int?)propertyValue > (int?)Gender.Other))
            {
                // nếu tồn tại attribute AttributeRequired và giới tính nằm ngoài 3 giá trị 0,1,2
                messageValidateFields.Add(attributeGender.ErrorMessage);

                checkSelectMessage = true;

            }
            else if (attributeEmail != null && propertyValue != null && propertyValue != "" && this.CheckRegex(propertyValue?.ToString(), "email") == false)
            {

                // nếu không phải dạng biểu thức email => lỗi
                messageValidateFields.Add(attributeEmail.ErrorMessage);

                checkSelectMessage = true;

            }
            else if (attributePhone != null && propertyValue != null && propertyValue != "" && this.CheckRegex(propertyValue?.ToString(), "phone") == false)
            {

                // nếu không phải dạng biểu thức email => lỗi
                messageValidateFields.Add(attributePhone.ErrorMessage);

                checkSelectMessage = true;

            }
            else if (attributeDateTime != null && propertyValue != null && DateTime.Compare((DateTime)propertyValue, DateTime.Now) > 0)
            {
                // nếu không phải dạng biểu thức email => lỗi
                messageValidateFields.Add(attributeDateTime.ErrorMessage);

                checkSelectMessage = true;
            }

            if (attributeExists != null && propertyValue != null)
            {
                // truyền tên table, tên trường cần check, giá trị của trường cần check, id khách hàng cần check
                var sql = $"SELECT {propertyName} FROM {tableName} WHERE {propertyName} = @propertyValue and Id Not IN (@id) LIMIT 1";
                var parameters = new DynamicParameters();
                parameters.Add("@propertyValue", propertyValue.ToString().Trim());
                parameters.Add("@id", id);

                var result = await _baseRepository.CheckExists(sql, parameters);

                if (result != null)
                {

                    messageValidateFields.Add(attributeExists.ErrorMessage + " <" + propertyValue + "> đã tồn tại!");

                    checkSelectMessage = true;

                }

            }

            if (checkSelectMessage == true)
            {
                // khởi tạo giá trị mới để add vào
                var newValue = new Dictionary<string, string>();

                // lấy field name và message cuối cùng vừa được add vào
                newValue.Add(propertyName, messageValidateFields.Last());
                checkValidateFields.Add(newValue);
            }


        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: kiểm tra định dạng theo biểu thức chính quy số điện thoại & email
        /// </summary>
        /// <param name="value">chuỗi cần kiểm tra</param>
        /// <returns>true- đúng, false- sai</returns>
        private bool CheckRegex(string value, string type = null)
        {
            // check email
            string valiPattenrn;
            if (type.ToLower() == "email")
            {
                valiPattenrn = @"^(?!\.)(""([^""\r\\]|\\[""\r\\])*""|"
                   + @"([-a-z0-9!#$%&'*+/=?^_`{|}~]|(?<!\.)\.)*)(?<!\.)"
                   + @"@[a-z0-9][\w\.-]*[a-z0-9]\.[a-z][a-z\.]*[a-z]$";
            }
            else
            {
                valiPattenrn = @"(09|03|07|08|05)+([0-9]{8})";
            }

            var rgx = new Regex(valiPattenrn, RegexOptions.IgnoreCase);
            return rgx.IsMatch(value);
        }

        /// <summary>
        /// Author: Phạm Văn Đạt(26/10/2022)
        /// Function: XỬ lý lấy id của bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="properties"></param>
        /// <returns></returns>
        private Guid GetIdByRecord(T entity, PropertyInfo[] properties = null)
        {
            if (properties == null)
            {
                properties = typeof(T).GetProperties();
            }
            // tạo mới guid
            Guid id = Guid.NewGuid();
            foreach (var property in properties)
            {
                if (property.Name == "Id" && (Guid)property.GetValue(entity) != Guid.Empty)
                {
                    id = (Guid)property.GetValue(entity);
                    break;
                }
            }
            return id;
        }
        #endregion

    }
}
