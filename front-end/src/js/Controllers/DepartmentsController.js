import {END_POINTS} from '../axios/endPoint';
import { GetAll } from '../Controllers/BaseController'
import {STATUS_CODES} from '../../constants'

// end point của employees
const endPoint = END_POINTS.Departments;

/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: class xử lý các nghiệp vụ phòng ban
 */
class Departments{
    
    /**
     * @param {Field} data 
     */
    constructor(data){
        this.data = data;
    }

    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Xử lý lấy các bản ghi đầu tiên trong bảng phòng ban
     */
    async GetRecords(){
        let res =  await GetAll(endPoint);
        if(res.statusCode == STATUS_CODES.Code200){
            this.data = res.data;
        }else{
            console.log(res)
        }
    }
}

/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: khởi tạo đối tượng xử lý phòng ban
 */
export let departments = new Departments();
