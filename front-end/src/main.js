import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueClickAway from "vue3-click-away"
import vClickOutside from "click-outside-vue3"
import tooltip from "./directives/tooltip.js"
import "@/assets/tooltip.css"
import { createRouter, createWebHistory } from "vue-router"
import BaseNotFound from '/src/views/not-found/TheNotFound.vue'
import EmployeeList from '/src/views/employees/employees-list/EmployeeList.vue'
import BaseButton from '/src/components/button/BaseButton.vue'
import BaseCombobox from '/src/components/combobox/BaseCombobox.vue'
import BaseInputText from '/src/components/Input/BaseInputText.vue'
import BaseInputRadio from '/src/components/Input/BaseInputRadio.vue'
import BaseInputCheckbox from '/src/components/Input/BaseInputCheckbox.vue'
import BaseNotify from '/src/components/notify/BaseNotify.vue'
import BaseToastMessage from '/src/components/toastMessage/BaseToastMessage.vue'
import BaseTable from '/src/components/table/BaseTable.vue'
import BasePaging from '/src/components/paging/BasePaging.vue' 
import TheCash from '/src/views/cash/TheCash.vue'
import MSProcess from '/src/views/cash/process/MSProcess.vue'
import MSReceipt from '/src/views/cash/receipt/MSReceipt.vue'
import SupplierList from '/src/views/suppliers/supplier-list/SupplierList.vue'
import BaseTextarea from '/src/components/textarea/BaseTextarea.vue'
import BaseComboboxMultiple from '/src/components/combobox-multiple/BaseComboboxMultiple.vue'
import BaseTabs from '/src/components/tabs/BaseTabs.vue'
import BaseTab from '/src/components/tab/BaseTab.vue'
import BaseBankAccount from '/src/components/bank-account/BaseBankAccount.vue'

const app = createApp(App);

/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: Các trường trong table
 */
const routers = [
    {
        path: '/',
        redirect: { path: 'tien-mat' },
        name:"/"
    },
    {
        path: '',
        redirect: { path: 'tien-mat' },
        name:""
    },
    {
        path: '/tien-mat',
        component: TheCash,
        redirect: { path: '/quy-trinh' },
        children: [
            {
              path: '/quy-trinh',
              component: MSProcess,
            },
            {
                name:"/thu-chi-tien",
                path: '/thu-chi-tien',
                component: MSReceipt,
              }
          ],
    },
    {
        path: '/nha-cung-cap',
        component: SupplierList,
        name:"/nha-cung-cap"
    },
    {
        path: '/nhan-vien',
        component: EmployeeList,
        name:"/nhan-vien"
    },
    {
        path: '/tong-quan',
        component: BaseNotFound,
        name:"tong-quan"
    },
    {
        path: '/tien-gui',
        component: BaseNotFound,
        name:"tien-gui"
    },
    {
        path: '/mua-hang',
        component: BaseNotFound,
        name:"mua-hang"
    },
    {
        path: '/ban-hang',
        component: BaseNotFound,
        name:"ban-hang"
    },
    {
        path: '/quan-ly-hoa-don',
        component: BaseNotFound,
        name:"quan-ly-hoa-don"
    },
    {
        path: '/kho',
        component: BaseNotFound,
        name:"kho"
    },
    {
        path: '/cong-cu-dung-cu',
        component: BaseNotFound,
        name:"cong-cu-dung-cu"
    },
    {
        path: '/tai-san-co-dinh',
        component: BaseNotFound,
        name:"tai-san-co-dinh"
    },
    {
        path: '/thue',
        component: BaseNotFound,
        name:"thue"
    },
    {
        path: '/gia-thanh',
        component: BaseNotFound,
        name:"gia-thanh"
    },
    {
        path: '/tong-hop',
        component: BaseNotFound,
        name:"tong-hop"
    },
    {
        path: '/ngan-sach',
        component: BaseNotFound,
        name:"ngan-sach"
    },
    {
        path: '/bao-cao',
        component: BaseNotFound,
        name:"bao-cao"
    },
    {
        path: '/phan-tich-tai-chinh',
        component: BaseNotFound,
        name:"phan-tich-tai-chinh"
    }
];


/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: khởi tạo router
 */
const router = createRouter({
    history: createWebHistory(),
    routes: routers,
    linkActiveClass: 'active-item-menu'
});

/**
 * Author: Phạm Văn Đạt(18/10/2022)
 * Function: nhúng các component dùng chung
 */
app.component('BaseButton',BaseButton);
app.component('BaseCombobox',BaseCombobox);
app.component('BaseInputText',BaseInputText);
app.component('BaseInputRadio',BaseInputRadio);
app.component('BaseInputCheckbox',BaseInputCheckbox);
app.component('BaseNotify',BaseNotify);
app.component('BaseTextarea',BaseTextarea);
app.component('BaseToastMessage',BaseToastMessage);
app.component('BaseTable',BaseTable);
app.component('BasePaging',BasePaging);
app.component('BaseComboboxMultiple',BaseComboboxMultiple);
app.component('BaseTabs',BaseTabs);
app.component('BaseTab',BaseTab);
app.component('BaseBankAccount',BaseBankAccount);

// nhúng router
app.use(router);

// nhúng click ra ngoài
app.use(VueClickAway);

app.use(vClickOutside);

// nhúng element plus
app.use(ElementPlus);

// nhúng tooltip
app.directive("tooltip", tooltip);

app.mount("#app");