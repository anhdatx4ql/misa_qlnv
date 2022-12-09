using MISA.AMIS.Common;
using MISA.AMIS.DL;

/// <summary>
/// Author: Phạm Văn Đạt(09/12/2022)
/// Function: xử lý nghiệp vụ địa chỉ giao hàng
/// </summary>

namespace MISA.AMIS.BL
{
    public class DeliveryAddressService:BaseService<DeliveryAddress>, IDeliveryAddressService
    {
        #region Fields
        private readonly IDeliveryAddressRepository _deliAddress;
        #endregion

        #region Constructor
        public DeliveryAddressService(IDeliveryAddressRepository deliAddress) : base(deliAddress)
        {
            _deliAddress = deliAddress;
        }
        #endregion
    }
}
