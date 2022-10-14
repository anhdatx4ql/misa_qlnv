import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import MNotFound from '/src/components/not-found/MNotFound.vue'
import EmployeeList from '/src/components/pages/EmployeeList.vue'
import MButton from '/src/components/bases/MButton/MButton.vue'
import MCombobox from '/src/components/bases/MCombobox/MCombobox.vue'
import MInputText from '/src/components/bases/MInput/MInputText.vue'
import MInputRadio from '/src/components/bases/MInput/MInputRadio.vue'
import MInputCheckbox from '/src/components/bases/MInput/MInputCheckbox.vue'
import MNotify from '/src/components/bases/MNotify/MNotify.vue'
import MToastMessage from '/src/components/bases/MToastMessage/MToastMessage.vue'
import MToolTip from '/src/components/bases/MToolTip/MToolTip.vue'
import MTable from '/src/components/bases/MTable/MTable.vue'
import MPaging from '/src/components/bases/MPaging/MPaging.vue' 

import VueClickAway from "vue3-click-away";

const app = createApp(App);

/**
 * Author: Phạm Văn Đạt
 * Function: Các trường trong table
 */
const routers = [
    {
        path: '/',
        component: EmployeeList,
        name:"/tien-mat"
    },
    {
        path: '',
        component: EmployeeList,
        name:""
    },
    {
        path: '/tien-mat',
        component: EmployeeList,
        name:"/tien-mat"
    },
    
    {
        path: '/nhan-vien',
        component: EmployeeList,
        name:"/nhan-vien"
    },
    {
        path: '/tong-quan',
        component: MNotFound,
        name:"tong-quan"
    },
    {
        path: '/tien-gui',
        component: MNotFound,
        name:"tien-gui"
    },
    {
        path: '/mua-hang',
        component: MNotFound,
        name:"mua-hang"
    },
    {
        path: '/ban-hang',
        component: MNotFound,
        name:"ban-hang"
    },
    {
        path: '/quan-ly-hoa-don',
        component: MNotFound,
        name:"quan-ly-hoa-don"
    },
    {
        path: '/kho',
        component: MNotFound,
        name:"kho"
    },
    {
        path: '/cong-cu-dung-cu',
        component: MNotFound,
        name:"cong-cu-dung-cu"
    },
    {
        path: '/tai-san-co-dinh',
        component: MNotFound,
        name:"tai-san-co-dinh"
    },
    {
        path: '/thue',
        component: MNotFound,
        name:"thue"
    },
    {
        path: '/gia-thanh',
        component: MNotFound,
        name:"gia-thanh"
    },
    {
        path: '/tong-hop',
        component: MNotFound,
        name:"tong-hop"
    },
    {
        path: '/ngan-sach',
        component: MNotFound,
        name:"ngan-sach"
    },
    {
        path: '/bao-cao',
        component: MNotFound,
        name:"bao-cao"
    },
    {
        path: '/phan-tich-tai-chinh',
        component: MNotFound,
        name:"phan-tich-tai-chinh"
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routers,
});

/**
 * Author: Phạm Văn Đạt
 * Function: nhúng các component dùng chung
 */
app.component('MButton',MButton);
app.component('MCombobox',MCombobox);
app.component('MInputText',MInputText);
app.component('MInputRadio',MInputRadio);
app.component('MInputCheckbox',MInputCheckbox);
app.component('MNotify',MNotify);
app.component('MToastMessage',MToastMessage);
app.component('MToolTip',MToolTip);
app.component('MTable',MTable);
app.component('MPaging',MPaging);

app.use(router);
app.use(VueClickAway);
app.mount("#app");