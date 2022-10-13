using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebCommon;
using WebInfrastructure;

namespace WebDomain
{
    public class DepartmentsService: BaseService<Departments>,IDepartmentsService
    {
        private readonly IDepartmentsRepository _departments;
        public DepartmentsService(IDepartmentsRepository departments):base(departments)
        {
            _departments = departments;
        }
    }
}
