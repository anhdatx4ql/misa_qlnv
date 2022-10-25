<template>
    <div class="content-top">
        <!-- start content top left -->
        <div class="content-top-left">
            <span class="content-top-left-title">Nhân viên</span>
        </div>
        <div class="content-top-right">
            <base-button @click="HandlerClickShowForm" :disable="disableButtonIndsert"><span>Thêm mới nhân viên</span></base-button>
        </div>
        <!-- end content top left -->
    </div>

     <!-- start  content center top -->
     <div class="content-center-top">

        <!-- start custom tooltip -->
        <div v-tooltip="{global: true,theme: {placement: 'bottom',},}"></div>
        <!-- end custom tooltip -->

        <base-input-text placeholder="Tìm theo mã, tên nhân viên"
            classIcon="input-icon-search">
        </base-input-text>

        <base-button v-tooltip="'Lấy lại dữ liệu'" class="content-center-button-left icon-ml-10">
            <span class="background-icon-reload icon-24 background-flex"></span>
        </base-button>

        <base-button v-tooltip="'Xuất ra Excel'" class="content-center-button-left">
            <span class="background-icon-excel icon-24 background-flex"></span>
        </base-button>
        
    </div>
    <!-- end content center top -->

    <div class="content-table">
        <!-- start table -->
        <base-table 
        @employeeDetail="employeeDetail = $event, checkShowForm = true, title='Sửa nhân viên'"
        :listEmployees="listData"
        >
        </base-table>
        <!-- end table -->
    </div>

    <div class="content-bottom">
        <!-- start paging -->
        <base-paging
         :totalCount="totalCount"
          @pageSize="pageSize = $event"
          @currentPage="currentPage = $event"
          ></base-paging>
        <!-- end paging -->
    </div>

    <!-- start form -->
    <employee-detail
     v-if="checkShowForm"
      :title="title"
       @closeForm="checkShowForm = $event"
       :employeeDetail="employeeDetail"
       ></employee-detail>
    <!-- end form -->
</template>
   
<script>
/**
 * Author: Phạm Văn Đạt (19/10/2022)
 */
import {PAGING_ITEMS} from '../../../constants'

import {FormatDate} from "../../../js/FomatData.js"

import EmployeeDetail from '../employees-detail/EmployeeDetail.vue'

import {employees, employeeModel} from  "../../../js/Controllers/EmployeesController"

export default {
    name: 'EmployeeList',
    components:{
        EmployeeDetail
    },
    props: {
    },
    data(){
        return{
            // các item của paging
            pagingItems:[],

            // kiểm tra hiển thị form
            checkShowForm:false,

            // dữ liệu khách hàng
            employeesList: [],

            // title form
            title: "Thêm mới nhân viên",

            // danh sách khách hàng truyền vào table để hiển thị
            listData: [],

            // tổng số lượng bản ghi trả về
            totalCount: 0,

            // số bản ghi / trang
            pageSize:10,
            
            // trang hiện tại đang đứng
            currentPage:1,

            // khai báo thông tin chi tiết khách hàng
            employeeDetail: employeeModel,

            // disable nút button khi click 1 lần
            disableButtonIndsert: false
        }
    },
    created(){

        this.pagingItems = PAGING_ITEMS;

            
        /**
         * Author: Phạm Văn Đạt(21/10/2022)
         * Function: load dữ liệu
         */
        this.LoadData();
    },
    watch:{
        /**
         * Author: Phạm Văn Đạt(21/10/2022)
         * Function: Xử lý xem chi tiết khách hàng
         */
         employeeDetail(value){
            console.log(value)
        },

        /**
         * Author: Phạm Văn Đạt(21/10/2022)
         * Function: Xử lý thay đổi số bản ghi/ trang => load lại dữ liệu
         */
        async pageSize(value){
            employees.pageSize= value;

            // khi thay đổi số bản ghi trên trang thì load lại về trang đầu tiên
            employees.currentPageNumber =1;

            // gọi hàm load dữ liệu
            await this.LoadData();
        },

         /**
         * Author: Phạm Văn Đạt(21/10/2022)
         * Function: Xử lý thay đổi số trang => load lại dữ liệu
         */
        async currentPage(value){
            employees.currentPageNumber = value;
            await this.LoadData();
        },

        /**
         * Author: Phạm Văn Đạt(23/10/2022)
         * Function: Xử lý click hiển thị form thêm mới nhân viên
         */
        checkShowForm(value){
            if(value == false){
                this.employeeDetail =  employeeModel;
            }else{
                // nếu hiển thị form, format ngày tháng năm
                this.employeeDetail.birthDay = FormatDate(this.employeeDetail.birthDay,"YYYY-MM-DD")
                this.employeeDetail.birthDay = FormatDate(this.employeeDetail.issuaOn,"YYYY-MM-DD")
            }
        }
    },
    methods:{
        
        /**
         * Author: Phạm Văn Đạt(19/10/2022)
         * Function: Load dữ liệu
        */
        async LoadData(){
            try{
                 // gọi api phân trang
                await employees.PagingEmployee();

                // khởi tạo giá trị list dữ liệu
                this.listData = employees.data;
                this.totalCount = employees.totalCount;
                console.log(employees);
            }catch(e){
                console.log(e);
            }           
        },

        /**
         * Author: Phạm Văn Đạt(23/10/2022)
         * Function: Xử lý click hiển thị form thêm mới nhân viên
         */
        async HandlerClickShowForm(){
            try{
                this.disableButtonIndsert = true;
                let newCode = await employees.GetMaxCode();
                if(newCode){
                    this.employeeDetail.employeeId = newCode;
                }
                console.log(this.employeeDetail)
                this.checkShowForm = true;
                this.title='Thêm mới nhân viên';
                this.disableButtonIndsert = false;
            }catch(e){
                console.log(e);
            }
           
        }
    }
}
</script>
   
<style scoped>
@import url(EmployeeList.css);
</style>
   