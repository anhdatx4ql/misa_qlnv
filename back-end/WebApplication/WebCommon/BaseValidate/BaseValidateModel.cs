using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.AMIS.Common
{

    /// <summary>
    /// Author: Phạm Văn Đạt(13/10/2022)
    /// Function: required attribute
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributeUserId : Attribute
    {
        #region Fields
        public string ErrorMessage;
        #endregion

        #region Constructor
        public AttributeUserId(string message)
        {
            ErrorMessage = message;
        }
        #endregion
    }

    /// <summary>
    /// Author: Phạm Văn Đạt(13/10/2022)
    /// Function: required attribute
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributeRequired:Attribute
    {
        #region Fields
        public string ErrorMessage;
        #endregion
        
        #region Constructor
        public AttributeRequired(string message)
        {
            ErrorMessage = message;
        }
        #endregion
    }

    /// <summary>
    /// Author: Phạm Văn Đạt(13/10/2022)
    /// Function: required attribute
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributeGender:Attribute
    {
        #region Fields
        public string ErrorMessage;
        #endregion

        #region Constructor
        public AttributeGender(string message)
        {
            ErrorMessage = message;
        }
        #endregion
    }


    /// <summary>
    /// Author: Phạm Văn Đạt(13/10/2022)
    /// Function: kiểm tra email
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributeEmail:Attribute
    {
        #region Fields
        public string ErrorMessage;
        #endregion

        #region Constructor
        public AttributeEmail(string message)
        {
            ErrorMessage = message;
        }
        #endregion
    }

    /// <summary>
    /// Author: Phạm Văn Đạt(13/10/2022)
    /// Function: kiểm tra số điện thoại
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributePhone:Attribute
    {
        #region Fields
        public string ErrorMessage;
        #endregion

        #region Constructor
        public AttributePhone(string message)
        {
            ErrorMessage = message;
        }
        #endregion
    }

    /// <summary>
    /// Author: Phạm Văn Đạt(09/12/2022)
    /// Function: attribute taxcode
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributeTaxCode:Attribute
    {
        #region Fields
        public string ErrorMessage;
        #endregion

        #region Constructor
        public AttributeTaxCode(string message)
        {
            ErrorMessage = message;
        }
        #endregion
    }

    /// <summary>
    /// Author: Phạm Văn Đạt(13/10/2022)
    /// Function: attribute check trùng
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributeExists:Attribute
    {
        #region Fields
        public string ErrorMessage;
        #endregion

        #region Constructor
        public AttributeExists(string message)
        {
            ErrorMessage = message;
        }
        #endregion
    }

    /// <summary>
    /// Author: Phạm Văn Đạt(13/10/2022)
    /// Function: kiểm tra khóa chính
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributePrimarykey:Attribute
    {
        #region Fields
        public string ErrorMessage { get; }
        #endregion

        #region Constructor
        public AttributePrimarykey(string message)
        {
            ErrorMessage = message;
        }
        #endregion
    }

    /// <summary>
    /// Author: Phạm Văn Đạt(29/10/2022)
    /// Function: kiểm tra ngày tháng không vượt quá ngày tháng hiện tại
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributeDateTime : Attribute
    {
        #region Fields
        public string ErrorMessage { get; }
        #endregion

        #region Constructor
        public AttributeDateTime(string message)
        {
            ErrorMessage = message;
        }
        #endregion
    }

    /// <summary>
    /// Author: Phạm Văn Đạt(29/10/2022)
    /// Function: kiểm tra ngày tháng không vượt quá ngày tháng hiện tại
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributePost : Attribute
    {
        #region Fields
        public string ErrorMessage { get; }
        #endregion

        #region Constructor
        public AttributePost(string message)
        {
            ErrorMessage = message;
        }
        #endregion
    }

    /// <summary>
    /// Author: Phạm Văn Đạt(23/11/2022)
    /// FUnction: Xử lý thêm \ trước các ký tự đặc biệt
    /// </summary>
    public static class CheckSpecialCharacters
    {
        #region Fields
        public static readonly List<String> SpecialCharacters = new List<string> { "/", "*", "--", "+", "@", "&", "$", "#", "%" };
        #endregion

        #region Methods
        /// <summary>
        /// Xử lý thêm \ trước các ký tự đặc biệt trên mảng trên
        /// </summary>
        /// <param name="text">chuỗi string truyền vào</param>
        /// <returns></returns>
        public static string CheckSpecial(string text)
        {
            for(var i = 0; i < SpecialCharacters.Count(); i++)
            {
                if(text != null || text != "") {
                    if (text.Contains(SpecialCharacters[i]))
                    {
                        text = text.Replace(SpecialCharacters[i], "\\" + SpecialCharacters[i]);
                    }
                }
            }
                
            return text;
        }
        #endregion
    }

}
