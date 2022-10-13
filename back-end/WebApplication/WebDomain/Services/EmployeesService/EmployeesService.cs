using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebCommon;
using WebInfrastructure;

namespace WebDomain
{
    public class EmployeesService : BaseService<Employees>, IEmployeesService
    {

        private readonly IEmployeesRepository _employee;
        public EmployeesService(IEmployeesRepository employee):base(employee)
        {
            _employee = employee;
        }
    }
}
