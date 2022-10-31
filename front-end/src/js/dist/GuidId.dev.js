"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateGuid = CreateGuid;

/**
 * Author: Phạm Văn Đạt(31/10/2022)
 * Function: Xử lý tạo mới chuỗi guid 36 kí tự
 */
function CreateGuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}