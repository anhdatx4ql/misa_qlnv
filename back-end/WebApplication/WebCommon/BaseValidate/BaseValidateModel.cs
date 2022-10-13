using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebCommon

{
    /// <summary>
    /// Author: Phạm Văn Đạt
    /// Function: required attribute
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributeRequired:Attribute
    {
        public string ErrorMessage;
        public AttributeRequired(string message)
        {
            ErrorMessage = message;
        }
    }

    /// <summary>
    /// Author: Phạm Văn Đạt
    /// Function: required attribute
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributeGender:Attribute
    {
        public string ErrorMessage;
        public AttributeGender(string message)
        {
            ErrorMessage = message;
        }
    }
    
    
    /// <summary>
    /// Author: Phạm Văn Đạt
    /// Function: kiểm tra email
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributeEmail:Attribute
    {
        public string ErrorMessage;
        public AttributeEmail(string message)
        {
            ErrorMessage = message;
        }
    }
    
    /// <summary>
    /// Author: Phạm Văn Đạt
    /// Function: kiểm tra số điện thoại
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributePhone:Attribute
    {
        public string ErrorMessage;
        public AttributePhone(string message)
        {
            ErrorMessage = message;
        }
    }
    
    /// <summary>
    /// Author: Phạm Văn Đạt
    /// Function: attribute check trùng
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributeExists:Attribute
    {
        public string ErrorMessage;
        public AttributeExists(string message)
        {
            ErrorMessage = message;
        }
    }
    
    /// <summary>
    /// Author: Phạm Văn Đạt
    /// Function: kiểm tra khóa chính
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class AttributePrimarykey:Attribute
    {
        public string ErrorMessage { get; }
        public AttributePrimarykey(string message)
        {
            ErrorMessage = message;
        }
    }
}
