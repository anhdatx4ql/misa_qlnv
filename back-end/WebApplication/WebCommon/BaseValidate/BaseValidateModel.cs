﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebCommon

{
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
}
