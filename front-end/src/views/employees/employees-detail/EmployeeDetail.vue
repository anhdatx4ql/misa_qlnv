<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Thông tin chi tiết khách hàng
 -->
<template>

  <div class="form">

    <el-color-picker v-model="color" show-alpha />
    <div class="form-container" ref="formContainer">
      <!-- start header -->
      <div class="form-header">
        <div class="form-header-left">
          <div class="form-header-left-title">
            {{title}}
          </div>
            <!-- start Check box kiểm tra khách hàng -->
            <base-input-checkbox 
              :value="currentEmployee.isEmployee"
              :checked="currentEmployee.isEmployee" 
              text="Là khách hàng" 
              id="khach-hang"
              @value="currentEmployee.isEmployee = $event"
            >
            </base-input-checkbox>
            <!-- end Check box kiểm tra khách hàng -->

            <!-- start Check box kiểm tra nhà cung cấp -->
            <base-input-checkbox
              :value="currentEmployee.isSuppiler"
              :checked="currentEmployee.isSuppiler" 
              text="Là nhà cung cấp"
              id="nha-cung-cap"
              @value="currentEmployee.isSuppiler = $event"
            ></base-input-checkbox>
            <!-- end Check box kiểm tra nhà cung cấp -->
        </div>
        <div class="form-header-right">

          <div v-tooltip="{global: true,theme: {placement: 'bottom',},}">
             <base-button @click="handlerCloseForm" v-tooltip="'Đóng (ESC)'">
              <span class="background-icon-close icon-24"></span>
            </base-button>
          </div>
          
          </div>
      </div>
      <!-- end header -->

      <!-- start content -->
      <div class="form-content">
        <!-- start content top -->
        <div class="form-content-top">
          <!-- start content top left -->
          <div class="form-content-top-left">
            <!-- start mã -->
            <base-input-text
              class="w-40 p-r-6"
              :value="currentEmployee.employeeId"
              fieldLabel="Mã"
              :iconRed="true"
              :isRequired="true"
              :checkFocus="checkFocus"
              @checkFocus="checkFocus = false"
              ></base-input-text>
            <!-- end mã -->

            <!-- start Tên -->
            <base-input-text
              class="w-60"
              :value="currentEmployee.name"
              fieldLabel="Tên"
              :iconRed="true"
              :isRequired="true"
            ></base-input-text>
            <!-- end tên-->

            <!-- start đơn vị -->
            <base-combobox
              :value="{id: currentEmployee.departmentId, name:currentEmployee.departmentName}" 
              @checkLoadDataCombobox="loadDepartments" 
              comboboxField="Đơn vị" :listValues="departments"
              position="top" :iconRed="true">
            </base-combobox>
            <!-- end đơn vị -->

            <!-- start chức vụ -->
            <base-combobox
              :value="{id: currentEmployee.positionId, name:currentEmployee.positionName}"
              @checkLoadDataCombobox="loadPositions"
              comboboxField="Chức vụ" 
              :listValues="positions" position="top">
            </base-combobox>
            <!-- end chức vụ -->

          </div>
          <!-- end content top left -->

          <!-- start content right -->
          <div class="form-content-top-right">
            <!-- start ngày sinh -->
            <div class="w-40 p-r-6 input-date">
              <span>Ngày sinh</span>
              <el-config-provider :locale="locale">
                <el-date-picker
                  v-model="currentEmployee.birthDay"
                  type="date"
                  placeholder="DD/MM/YYY"
                  format="DD/MM/YYYY"
                />
              </el-config-provider>
            </div>

            <!-- start giới tính -->
            <!-- nam -->
            <div class="form-gender">
              <div class="form-gender-title">Giới tính</div>
              <div class="flex flex-grow-1">
                <base-input-radio
                 v-for="(gender,index) in genders"
                  :key="gender.id"
                  :valueGender="currentEmployee.gender"
                  :value="gender.id"
                  :checked="(index == 0)?true:false"
                  :text="gender.name" name="gender" :id="gender.field">
                </base-input-radio>
              </div>
            </div>
           
            <!-- end giới tính -->

            <!-- Start Số chứng minh nhân dân -->
              <base-input-text tooltip="Số chứng minh nhân dân"
                class="w-60 p-r-6"
                fieldLabel="Số CMND"
                :value="currentEmployee.idNo"
              ></base-input-text>
            
            <!-- End Số chứng minh nhân dân  -->

            <!-- start ngày cấp -->
            <div class="w-40 input-date">
              <span>Ngày cấp</span>
              <el-config-provider :locale="locale">
                <el-date-picker
                  v-model="currentEmployee.issuaOn"
                  type="date"
                  placeholder="DD/MM/YYY"
                  format="DD/MM/YYYY"
                />
              </el-config-provider>
            </div>
            <!-- end ngày cấp  -->

             <!-- Start Số chứng minh nhân dân -->
             <base-input-text
                :value="currentEmployee.placeOfIssue"
                fieldLabel="Nơi cấp" 
                class="w-100"
              ></base-input-text>
            <!-- End Số chứng minh nhân dân  -->

          </div>
          <!-- end content right -->
        </div>
        <!-- end content top -->
      </div>
        <!-- start content top -->
        <div class="form-content-cennter">

          <!-- Start địa chỉ -->
          <base-input-text
            :value="currentEmployee.address"
            fieldLabel="Địa chỉ"
            class="w-100"
            ></base-input-text>
          <!-- End địa chỉ -->

          <!-- Start điện thoại di động -->
          <base-input-text 
            :value="currentEmployee.numberPhone"
            fieldLabel="ĐT di động" 
            tooltip="Điện thoại di động"
            class="w-25 p-r-6"
          ></base-input-text>
          <!-- End điện thoại di động -->

          <!-- Start điện cố định -->
          <base-input-text 
            :value="currentEmployee.deskPhone"
            fieldLabel="ĐT cố định" 
            tooltip="Điện thoại cố định"
            class="w-25 p-r-6"
          ></base-input-text>
          <!-- End điện cố định -->

          <!-- Start email -->
          <base-input-text 
            :value="currentEmployee.email"
            fieldLabel="Email" 
            class="w-25 p-r-6" 
            style="margin-right:20%;"
          ></base-input-text>
          <!-- End email -->

          <!-- Start tài khoản ngân hàng -->
          <base-input-text
            :value="currentEmployee.bankAccountNumber"
            fieldLabel="Tài khoản ngân hàng"
            class="w-25 p-r-6"
            ></base-input-text>
          <!-- End tài khoản ngân hàng -->

          <!-- Start tên ngân hàng -->
          <base-input-text
            :value="currentEmployee.bankName"
            fieldLabel="Tên ngân hàng" 
            class="w-25 p-r-6"
            >
          </base-input-text>
          <!-- End tên ngân hàng -->

          <!-- Start chi nhánh -->
          <base-input-text 
            :value="currentEmployee.bankAccountBrand"
            fieldLabel="Chi nhánh" 
            class="w-25 p-r-6"
           ></base-input-text>
          <!-- End chi nhánh -->

        </div>
        <!-- end content top -->

        <!-- start bottom -->
        <div class="form-bottom">
          
          <div class=form-bottom-right>
            <base-button v-tooltip="'Cất và thêm(Ctrl + Shift +S)'">
              <span>Cất và thêm</span>
            </base-button>
            <base-button class="button-white" v-tooltip="'Cất(Ctrl + S)'" style="margin:0 0.75rem;">
              <span>Cất</span>
            </base-button>
          </div>

          <div class="form-buttom-left">
            <base-button @keydown.tab.prevent="checkFocus = true" class="button-white" @click="$emit('closeForm',false)">
              <span>Hủy</span>
            </base-button>
          </div>
          
        </div>
        <!-- end bottom -->

      </div>
      <!-- end content -->
     
  </div>

    <!-- start thông báo -->
    <base-notify
       @closeForm="($event == false)?$emit('closeForm',false):''" 
       @checkShowNotify="checkNotify.isShow=$event" 
       v-if="checkNotify.isShow" 
       :type="checkNotify.type" 
       :text="checkNotify.text"
      ></base-notify>
      <!-- end thông báo -->
</template>

<script>
/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: nhúng các các hằng số
 */
import {GENDERS,NOTIFY_LIST,NOTIFY_TEXT} from '../../../constants'

import {departments} from '../../../js/Controllers/DepartmentsController'

import {positions} from '../../../js/Controllers/PositionsController.js'

import vi from "../../../../node_modules/element-plus/es/locale/lang/vi";


export default {
  name: 'EmployeeDetail',
  
  setup() {
    return {
      locale: vi,
    };
  },
  props: {
    title: String,
    employeeDetail: Object
  },
  data(){
    return{
      // danh sách chức vụ
      positions: [],

      // dannh sách phòng ban
      departments: [],

      // các giá trị giới tính
      genders:{},

      // kiểm tra notify
      checkNotify:{
        isShow: false,
        type: null,
        text:null
      },

      // danh sách các kiểu thông báo
      NOTIFY_LIST:{},

      // text dùng trong thông báo
      NOTIFY_TEXT:{},

      // nhân viên hiện tại
      currentEmployee: {},

      // khởi tạo focus input đầu tiên của form
      checkFocus:true
    }
  },
  created(){

    // lấy danh sách giưới tính
    this.genders = GENDERS;

    // lấy danh sách thông báo
    this.NOTIFY_LIST = NOTIFY_LIST;

    // các text có thể có trong thông báo
    this.NOTIFY_TEXT = NOTIFY_TEXT;

    // khởi tạo giá trị employee
    this.currentEmployee = this.employeeDetail;

  },

  methods:{
    /**
     * Author: Phạm Văn Đạt (18/10/2022)
     * Function: Xử lý click ẩn form
     */
    handlerCloseForm(){
      try{
         // gán lại giá trị notifi
        this.checkNotify = {
          isShow: true,
          type: this.NOTIFY_LIST.Question.type,
          text: this.NOTIFY_LIST.Question.text(this.NOTIFY_TEXT?.changeData),
        };
      }catch(e){
        console.log(e);
      }
     
   
    },

    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Xử lý load dữ liệu phòng ban
     */
    async loadDepartments(){
      try{
        await departments.GetRecords();
        this.departments = departments.data;
      }catch(e){
        console.log(e);
      }

      console.log(this.departments);
    },

     /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Xử lý load dữ liệu Chức vụ
     */
    async loadPositions(){
      try{
        await positions.GetRecords();
        this.positions = positions.data;
      }catch(e){
        console.log(e);
      }

      console.log(this.positions);
    },

    /**
     * Author: Phạm Văn Đạt(27/10/2022)
     * Function: Xử lý các nút phím tắt
     */
    HandlerKeyDown(event){
      if(event.code == "Escape"){
        this.handlerCloseForm();
      }else if(event.code == "KeyS"){
        console.log("Xử lý nút cất")
      }
      // xuwr lys caats vaf theem
      // if(event.code == "KeyS"){
      //   console.log("Xử lý nút cất")
      // }

      
      console.log(event)
    }
  },
  watch:{
    /**
     * Author: Phạm Văn Đạt(22/10/2022)
     * Function: THeo dõi thay đổi thông tin khách hàng
     */
     employeeDetail(value){
      this.currentEmployee = value;
      console.log(this.currentEmployee);
    },
  },
  mounted(){
  }
}
</script>

<style scoped>
  @import url(EmployeeDetail.css);
</style>
