using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebCommon;
using WebDomain;

namespace WebApplication
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController:BaseController<Departments>
    {
        private readonly IDepartmentsService _departments;
        public DepartmentsController(IDepartmentsService departments):base(departments)
        {
            _departments = departments;
        }
    }
}
