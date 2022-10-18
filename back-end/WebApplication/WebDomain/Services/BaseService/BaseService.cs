﻿using Dapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebCommon;
using WebCommon.Resources;
using WebInfrastructure;
namespace WebDomain
{
    public class BaseService<T> : IBaseService<T>
    {

        #region Field
        private readonly IBaseRepository<T> _baseRepository;
        #endregion

        #region Contructor

        public BaseService(IBaseRepository<T> baseRepository)
        {
            _baseRepository = baseRepository;
        }
        #endregion

        #region Method

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Lấy tất cả bản ghi trong bảng
        /// </summary>
        /// <returns>danh sách dữ liệu</returns>
        public async Task<ReponsitoryModel> GetAll()
        {
            List<string> message = new List<string>();
            try
            {
                var result = await _baseRepository.GetAllAsync();
                message.Add(MessageSuccess.GetSuccess);
                return new ReponsitoryModel(result, CodeSuccess.Code200, message);
            }
            catch(Exception ex)
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
        public async Task<ReponsitoryModel> InsertRecord(T entity)
        {
            List<string> message = new List<string>();

            try
            {
                // lấy tên table
                var tableName = TableName.GetTableName<T>();

                // lấy các thuộc tính của entity
                var properties = typeof(T).GetProperties();

                // validate
                var errValidate = this.Validate(entity,properties);

                if(errValidate != null)
                {
                    return new ReponsitoryModel(null, CodeErrors.Code400, errValidate);
                }

                // nếu validate thành công
                var storeName = $"Proc_{tableName}_Insert";

                var parameters = new DynamicParameters();

                // lấy giá trị thuộc tính
                foreach (PropertyInfo property in properties)
                {
                    if(property.Name != "CreatedAt" || property.Name != "UpdatedAt")
                        parameters.Add($"@_{property.Name}", property.GetValue(entity));
                }

                parameters.Add($"@_CreatedAt", DateTime.Now);

                parameters.Add($"@_UpdateaAt", null);

                // gọi hàm thêm dữ liệu vào db
                var result = await _baseRepository.InsertRecord(storeName, parameters);

                if(result == 0)
                {
                    message.Add(MessageErrors.CreatedFail);

                    return new ReponsitoryModel(null, CodeErrors.Code400, message);
                }

                message.Add(MessageSuccess.CreatedSuccess);

                return new ReponsitoryModel(result, CodeSuccess.Code201, message);
 
                
            }
            catch(Exception ex)
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
        public async Task<ReponsitoryModel> UpdateRecord(T entity)
        {
            List<string> message = new List<string>();
            try
            {
                // validate dữ liệu
                var validateErrors = this.Validate(entity);
                if (validateErrors != null)
                {
                    return new ReponsitoryModel(null, CodeErrors.Code400, validateErrors);
                }

                // lấy tên bảng
                var tableName = TableName.GetTableName<T>();

                // lấy các thuộc tính public của entity
                var properties = typeof(T).GetProperties();

                var id = (Guid)this.GetIdByRecord(entity, properties);

                if (id == Guid.Empty)
                {
                    message.Add(MessageErrors.DuplicateExists);
                    return new ReponsitoryModel(null, CodeErrors.Code400, message);
                }

                // lấy ra id, lấy dữ liệu cũ theo Id
                var oldEntity = await _baseRepository.GetById(id, tableName);

                // những dữ liệu nào khác với dữ liệu cũ => cập nhật, nếu không khác thì không cập nhật
                message.Add(MessageSuccess.UpdatedSuccess);
                return new ReponsitoryModel(oldEntity, CodeSuccess.Code200, message);

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
        public async Task<ReponsitoryModel> DeleteRecords(List<Guid> ids)
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

                // Thực hiện viết câu lệnh xóa
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
        private List<string> Validate(T entity, PropertyInfo[] properties = null)
        {
            // lấy tên các thuộc tính public của lớp
            if (properties == null)
                properties = typeof(T).GetProperties();

            // khởi tạo message hứng lỗi
            var messageError = new List<string>();

            foreach(var property in properties)
            {

                messageError = this.HandlerValidate(property, entity, messageError);
            }

            if(messageError.Count > 0)
            {
                return messageError;
            }

            return null;

        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Xử lý validate dữ liệu
        /// </summary>
        /// <param name="property">thuộc tính</param>
        /// <param name="entity">bảng</param>
        /// <param name="messageError">mảng chứa lỗi</param>
        /// <returns></returns>
        private List<string> HandlerValidate(PropertyInfo property, T entity, List<string> messageError)
        {

            // lấy tên thuộc tính
            var propertyName = property.Name;

            // lấy giá trị của thuộc tính theo tên từ entity truyền vào
            var propertyValue = property.GetValue(entity);

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

            // xử lý validate
            if (attributePrimarykey != null)
            {
                
                if((Guid)propertyValue == Guid.Empty)
                {
                    // nếu tồn tại attribute và giá trị của nó là null => thêm vào mảng lỗi lỗi
                    messageError.Add(attributePrimarykey.ErrorMessage);
                }
            }
            else if (attributeRequired != null && string.IsNullOrEmpty(propertyValue?.ToString()))
            {
                // nếu tồn tại attribute AttributeRequired và giá trị null => thêm vào mảng lỗi
                messageError.Add(attributeRequired.ErrorMessage);
            }
            else if (attributeGender != null && ((int?)propertyValue < (int?)Gender.Male || (int?)propertyValue > (int?)Gender.Other))
            {
                // nếu tồn tại attribute AttributeRequired và giới tính nằm ngoài 3 giá trị 0,1,2
                messageError.Add(attributeGender.ErrorMessage);
            }
            else if (attributeEmail != null && this.CheckRegex(propertyValue?.ToString(),"email") == false)
            {

                // nếu không phải dạng biểu thức email => lỗi
                messageError.Add(attributeEmail.ErrorMessage);

            }
            else if (attributePhone != null && this.CheckRegex(propertyValue?.ToString(),"phone") == false)
            {

                // nếu không phải dạng biểu thức email => lỗi
                messageError.Add(attributePhone.ErrorMessage);
            }
            else if (attributeExists != null)
            {
                // truyền tên table, tên trường cần check, id khách hàng cần check
                messageError.Add($"Xử lý check trùng {propertyName}");
            }

            return messageError;
        }

        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: kiểm tra định dạng theo biểu thức chính quy số điện thoại & email
        /// </summary>
        /// <param name="value">chuỗi cần kiểm tra</param>
        /// <returns>true- đúng, false- sai</returns>
        private bool CheckRegex(string value, string type=null)
        {
            // check email
            string valiPattenrn = "";
            if( type.ToLower() == "email")
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
            return  rgx.IsMatch(value);
        }

        private Guid GetIdByRecord(T entity,PropertyInfo[] properties = null)
        {
            if(properties == null)
            {
                properties = typeof(T).GetProperties();
            }
            Guid id = Guid.Empty;
            foreach (var property in properties)
            {
                if (property.Name == "Id")
                {
                    id = (Guid)property.GetValue(entity);
                }
            }
            return id;
        }
        #endregion

    }
}
