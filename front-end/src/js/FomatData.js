import moment from 'moment'

/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: Xử lý format ngày tháng năm
 * @param {*} value ngày tháng năm đưa vào
 * @returns 
 */
export function FormatDate(value, type='DD/MM/YYYY'){
    return moment(value).format(type);
}