using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Security.Policy;


namespace WebCommon
{
    public class TableName
    {

        /// <summary>
        /// Lấy tên bảng ánh xạ tới db
        /// </summary>
        /// <typeparam name="T">entity</typeparam>
        /// <returns>tên bảng</returns>
        public static string GetTableName<T>()
        {
            // lấy tên class
            var tableName = typeof(T).Name;

            // lấy tên của bảng ánh xạ tới
            var tableAttributes = typeof(T).GetTypeInfo().GetCustomAttributes<TableAttribute>();

            if(tableAttributes.Count() > 0)
            {
                tableName = tableAttributes.First().Name;
            }

            return tableName;
        }
    }
}
