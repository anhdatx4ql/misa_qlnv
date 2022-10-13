using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebInfrastructure;

namespace WebDomain
{
    public class DependencyContainer
    {
        /// <summary>
        /// Author: Phạm Văn Đạt
        /// Function: Xử lý tiêm service, static ở bên ngoài vẫn gọi được
        /// </summary>
        /// <param name="service"></param>
        public static void RegisterServices(IServiceCollection service)
        {
            service.AddScoped(typeof(IBaseRepository<>), typeof(IBaseRepository<>));
            service.AddScoped(typeof(IBaseService<>), typeof(IBaseService<>));

            service.AddScoped<IDepartmentsRepository, DepartmentsRepository>();
            service.AddScoped<IEmployeesRepository, EmployeesRepository>();
            service.AddScoped<IPositionsRepository, PositionsRepository>();
            service.AddScoped<IEmployeesService, EmployeesService>();
            service.AddScoped<IDepartmentsService, DepartmentsService>();
            service.AddScoped<IPositionsService, IPositionsService>();
        }
    }
}
