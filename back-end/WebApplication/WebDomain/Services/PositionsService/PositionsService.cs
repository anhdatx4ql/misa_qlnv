using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebCommon;
using WebInfrastructure;

namespace WebDomain
{
    public class PositionsService:BaseService<Positions>,IPositionsService
    {
        private readonly IPositionsRepository _position;
        public PositionsService(IPositionsRepository position):base(position)
        {
            _position = position;
        }
    }
}
