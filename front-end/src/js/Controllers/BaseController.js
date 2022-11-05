import {ROOT_API} from '../axios/endPoint';
import axios from 'axios';

// Khai báo header để đưa dữ liệu vào api
const headers = {
  "Content-Type": "application/json",
};

/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Lấy tất cả dữ liệu nằm trong bảng
 * @param {*} endPoint: điểm cuối truyền vào 
 * @returns : respose hoặc lỗi nếu có
 */
export const GetAll = async function(endPoint){
  let result = {};
    await axios.get(ROOT_API+endPoint)
    .then(response => {
      result = response.data;
    })
    .catch(e => {
      result = e;
    });

    return result;
};


/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: base xử lý paging
 * @param {*} endPoint : điểm cuối api
 * @param {*} keyword : text tìm kiếm
 * @param {*} currentPageNumber : trang hiện tại
 * @param {*} pageSize : số bản ghi trên 1 trang
 * @returns : respose hoặc lỗi nếu có
 */
export const Paging = async function(endPoint, keyword, currentPageNumber, pageSize) {
  let result = {};

  // khai báo chuỗi nối để phân trang
  let endPointLast = "";

  if(keyword == null){
    endPointLast = "pageSize="+pageSize+"&currentPageNumber="+currentPageNumber;
  }
  else{
    endPointLast = "keyword="+keyword+"&pageSize="+pageSize+"&currentPageNumber="+currentPageNumber;
  }
  await axios.get(ROOT_API+endPoint+endPointLast)
  .then(res=>{
    result = res.data;
  })
  .catch(e=>{
    result = e;
  })
  return result;
}

/**

 */
/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Xử lý xóa 1 hoặc nhiều bản ghi
 * @param {*} endPoint : điểm cuối api
 * @param {*} ids : danh sách id khách hàng muốn xóa
 * @returns : response hoặc lỗi nếu có
 */
export const DeleteRecords = async function(endPoint, ids){
  let result = {};
  await axios.post(ROOT_API+endPoint, ids)
    .then(response =>{
      result= response;
    })
    .catch(e =>{
      result = e;
    });
    return result;
}

/**
 * Author: Phạm Văn Đạt(19/10/2022)
 * Function: Xứ lý update bản ghi
 * @param {A} endPoint: đầu cuối api
 * @param {*} data: dữ liệu update 
 * @returns:  trả về response hoặc lỗi 
 */
export const UpdateRecord = async function(endPoint, data){
  let result = {};
  await axios.put(ROOT_API+endPoint, data, {header: headers})
    .then(response=>{
      result = response;
    })
    .catch(e=>{
      result = e;
    });
    return result;
}

/**
 * 
 * @param {*} endPoint : Điểm cuối api
 * @param {*} data : dữ liệu truyền vào
 * @returns : trả về response hoặc lỗi 
 */
export const InsertRecord = async function(endPoint, data){
  let result = {};
  await axios.post(ROOT_API+endPoint, data,{header: headers})
    .then(response=>{
      result = response;
    })
    .catch(e=>{
      result = e;
    });
    return result;
}

/**
 * Author: Phạm Văn Đạt(23/10/2022)
 * Function: Lấy tất cả dữ liệu nằm trong bảng
 * @param {*} endPoint: điểm cuối truyền vào 
 */
 export const GetMaxCode = async function(endPoint){
  let result = {};
    await axios.get(ROOT_API+endPoint)
    .then(response => {
      result = response.data;
    })
    .catch(e => {
      result = e;
    });

    return result;
};


