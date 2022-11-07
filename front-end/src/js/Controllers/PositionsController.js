import {END_POINTS} from '../axios/endPoint';
import { getRecords } from '../Controllers/BaseController'
import {STATUS_CODES} from '../../constants'

// end point của employees
const endPoint = END_POINTS.Positions;

/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: class xử lý các nghiệp vụ phòng ban
 */
class Positions{
    
    /**
     * @param {Field} data 
     */
    constructor(data){
        this.data = data;
    }

    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Xử lý lấy các bản ghi đầu tiên trong bảng chức danh
     */
    async getRecords(){
        let res =  await getRecords(endPoint);
        if(res.statusCode == STATUS_CODES.Code200){
            this.data = res.data;
        }else{
            console.log(res)
        }
    }
}

/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: khởi tạo đối tượng xử lý vị trí
 */
export let positions = new Positions();
