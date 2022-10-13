using Microsoft.AspNetCore.Mvc;
using WebCommon;
using WebDomain;

namespace WebApplication
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : BaseController<Employees>
    {
        private readonly IEmployeesService _employeeService;
        public EmployeesController(IEmployeesService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }
    }
}
