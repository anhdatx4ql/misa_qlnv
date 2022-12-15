"use strict";

var _vue = require("vue");

var _App = _interopRequireDefault(require("./App.vue"));

var _elementPlus = _interopRequireDefault(require("element-plus"));

require("element-plus/dist/index.css");

var _vue3ClickAway = _interopRequireDefault(require("vue3-click-away"));

var _clickOutsideVue = _interopRequireDefault(require("click-outside-vue3"));

var _tooltip = _interopRequireDefault(require("./directives/tooltip.js"));

require("@/assets/tooltip.css");

var _vueRouter = require("vue-router");

var _TheNotFound = _interopRequireDefault(require("/src/views/not-found/TheNotFound.vue"));

var _EmployeeList = _interopRequireDefault(require("/src/views/employees/employees-list/EmployeeList.vue"));

var _BaseButton = _interopRequireDefault(require("/src/components/button/BaseButton.vue"));

var _BaseCombobox = _interopRequireDefault(require("/src/components/combobox/BaseCombobox.vue"));

var _BaseInputText = _interopRequireDefault(require("/src/components/Input/BaseInputText.vue"));

var _BaseInputRadio = _interopRequireDefault(require("/src/components/Input/BaseInputRadio.vue"));

var _BaseInputCheckbox = _interopRequireDefault(require("/src/components/Input/BaseInputCheckbox.vue"));

var _BaseNotify = _interopRequireDefault(require("/src/components/notify/BaseNotify.vue"));

var _BaseToastMessage = _interopRequireDefault(require("/src/components/toastMessage/BaseToastMessage.vue"));

var _BaseTable = _interopRequireDefault(require("/src/components/table/BaseTable.vue"));

var _BasePaging = _interopRequireDefault(require("/src/components/paging/BasePaging.vue"));

var _TheCash = _interopRequireDefault(require("/src/views/cash/TheCash.vue"));

var _MSProcess = _interopRequireDefault(require("/src/views/cash/process/MSProcess.vue"));

var _MSReceipt = _interopRequireDefault(require("/src/views/cash/receipt/MSReceipt.vue"));

var _SupplierList = _interopRequireDefault(require("/src/views/suppliers/supplier-list/SupplierList.vue"));

var _BaseTextarea = _interopRequireDefault(require("/src/components/textarea/BaseTextarea.vue"));

var _BaseComboboxMultiple = _interopRequireDefault(require("/src/components/combobox-multiple/BaseComboboxMultiple.vue"));

var _BaseTabs = _interopRequireDefault(require("/src/components/tabs/BaseTabs.vue"));

var _BaseTab = _interopRequireDefault(require("/src/components/tab/BaseTab.vue"));

var _BaseBankAccount = _interopRequireDefault(require("/src/components/bank-account/BaseBankAccount.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _vue.createApp)(_App["default"]);
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: Các trường trong table
 */

var routers = [{
  path: '/',
  redirect: {
    path: 'tien-mat'
  },
  name: "/"
}, {
  path: '',
  redirect: {
    path: 'tien-mat'
  },
  name: ""
}, {
  path: '/tien-mat',
  component: _TheCash["default"],
  redirect: {
    path: '/quy-trinh'
  },
  children: [{
    path: '/quy-trinh',
    component: _MSProcess["default"]
  }, {
    name: "/thu-chi-tien",
    path: '/thu-chi-tien',
    component: _MSReceipt["default"]
  }]
}, {
  path: '/nha-cung-cap',
  component: _SupplierList["default"],
  name: "/nha-cung-cap"
}, {
  path: '/nhan-vien',
  component: _EmployeeList["default"],
  name: "/nhan-vien"
}, {
  path: '/tong-quan',
  component: _TheNotFound["default"],
  name: "tong-quan"
}, {
  path: '/tien-gui',
  component: _TheNotFound["default"],
  name: "tien-gui"
}, {
  path: '/mua-hang',
  component: _TheNotFound["default"],
  name: "mua-hang"
}, {
  path: '/ban-hang',
  component: _TheNotFound["default"],
  name: "ban-hang"
}, {
  path: '/quan-ly-hoa-don',
  component: _TheNotFound["default"],
  name: "quan-ly-hoa-don"
}, {
  path: '/kho',
  component: _TheNotFound["default"],
  name: "kho"
}, {
  path: '/cong-cu-dung-cu',
  component: _TheNotFound["default"],
  name: "cong-cu-dung-cu"
}, {
  path: '/tai-san-co-dinh',
  component: _TheNotFound["default"],
  name: "tai-san-co-dinh"
}, {
  path: '/thue',
  component: _TheNotFound["default"],
  name: "thue"
}, {
  path: '/gia-thanh',
  component: _TheNotFound["default"],
  name: "gia-thanh"
}, {
  path: '/tong-hop',
  component: _TheNotFound["default"],
  name: "tong-hop"
}, {
  path: '/ngan-sach',
  component: _TheNotFound["default"],
  name: "ngan-sach"
}, {
  path: '/bao-cao',
  component: _TheNotFound["default"],
  name: "bao-cao"
}, {
  path: '/phan-tich-tai-chinh',
  component: _TheNotFound["default"],
  name: "phan-tich-tai-chinh"
}];
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: khởi tạo router
 */

var router = (0, _vueRouter.createRouter)({
  history: (0, _vueRouter.createWebHistory)(),
  routes: routers,
  linkActiveClass: 'active-item-menu'
});
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: nhúng các component dùng chung
 */

app.component('BaseButton', _BaseButton["default"]);
app.component('BaseCombobox', _BaseCombobox["default"]);
app.component('BaseInputText', _BaseInputText["default"]);
app.component('BaseInputRadio', _BaseInputRadio["default"]);
app.component('BaseInputCheckbox', _BaseInputCheckbox["default"]);
app.component('BaseNotify', _BaseNotify["default"]);
app.component('BaseTextarea', _BaseTextarea["default"]);
app.component('BaseToastMessage', _BaseToastMessage["default"]);
app.component('BaseTable', _BaseTable["default"]);
app.component('BasePaging', _BasePaging["default"]);
app.component('BaseComboboxMultiple', _BaseComboboxMultiple["default"]);
app.component('BaseTabs', _BaseTabs["default"]);
app.component('BaseTab', _BaseTab["default"]);
app.component('BaseBankAccount', _BaseBankAccount["default"]); // nhúng router

app.use(router); // nhúng click ra ngoài

app.use(_vue3ClickAway["default"]);
app.use(_clickOutsideVue["default"]); // nhúng element plus

app.use(_elementPlus["default"]); // nhúng tooltip

app.directive("tooltip", _tooltip["default"]);
app.mount("#app");