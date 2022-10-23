<template>
  <div class="form">
    <div class="form-container" ref="formContainer">
      <!-- start header -->
      <div class="form-header">
        <div class="form-header-left">
          <div class="form-header-left-title">
            {{title}}
          </div>
            <!-- start Check box kiểm tra khách hàng -->
            <m-input-checkbox 
              :value="currentEmployee.isEmployee"
              :checked="currentEmployee.isEmployee" 
              text="Là khách hàng" 
              id="khach-hang"
              @value="currentEmployee.isEmployee = $event"
            >
            </m-input-checkbox>
            <!-- end Check box kiểm tra khách hàng -->

            <!-- start Check box kiểm tra nhà cung cấp -->
            <m-input-checkbox
              :value="currentEmployee.isSuppiler"
              :checked="currentEmployee.isSuppiler" 
              text="Là nhà cung cấp"
              id="nha-cung-cap"
              @value="currentEmployee.isSuppiler = $event"
            ></m-input-checkbox>
            <!-- end Check box kiểm tra nhà cung cấp -->
        </div>
        <div class="form-header-right">
            <m-button>
              <span class="background-icon-question icon-24"></span>
            </m-button>
            <m-button @click="handlerCloseForm">
              <span class="background-icon-close icon-24"></span>
            </m-button>
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
            <m-input-text
              nameRef="firstFocus"
              class="w-40 p-r-6"
              :value="currentEmployee.employeeId"
              fieldLabel="Mã"
              :iconRed="true"
              ></m-input-text>
            <!-- end mã -->

            <!-- start Tên -->
            <m-input-text class="w-60" :value="currentEmployee.name" fieldLabel="Tên" :iconRed="true"></m-input-text>
            <!-- end tên-->

            <!-- start đơn vị -->
            <m-combobox
              :value="{id: currentEmployee.departmentId, name:currentEmployee.departmentName}" 
              @checkLoadDataCombobox="loadDepartments" 
              comboboxField="Đơn vị" :listValues="departments"
              position="top" :iconRed="true">
            </m-combobox>
            <!-- end đơn vị -->

            <!-- start chức vụ -->
            <m-combobox
              :value="{id: currentEmployee.positionId, name:currentEmployee.positionName}"
              @checkLoadDataCombobox="loadPositions"
              comboboxField="Chức vụ" 
              :listValues="positions" position="top">
            </m-combobox>
            <!-- end chức vụ -->

          </div>
          <!-- end content top left -->

          <!-- start content right -->
          <div class="form-content-top-right">
            <!-- start ngày sinh -->
            <m-input-text
              :value="currentEmployee.birthDay"
              type="date"
              fieldLabel="Ngày sinh"
              class="w-40 p-r-6">
            </m-input-text>
            <!-- end ngày sinh  -->

            <!-- start giới tính -->
            <!-- nam -->
            <div class="form-gender">
              <div class="form-gender-title">Giới tính</div>
              <div class="flex flex-grow-1">
                <m-input-radio
                 v-for="(gender,index) in genders"
                  :key="gender.id"
                  :valueGender="currentEmployee.gender"
                  :value="gender.id"
                  :checked="(index == 0)?true:false"
                  :text="gender.name" name="gender" :id="gender.field">
                </m-input-radio>
              </div>
            </div>
           
            <!-- end giới tính -->

            <!-- Start Số chứng minh nhân dân -->
            <m-input-text
              class="w-60 p-r-6"
              fieldLabel="Số CMND"
              :value="currentEmployee.idNo"
            ></m-input-text>
            <!-- End Số chứng minh nhân dân  -->

            <!-- start ngày cấp -->
            <m-input-text
              type="date"
              fieldLabel="Ngày cấp"
              class="flex-grow-1"
              :value="currentEmployee.issuaOn"
              >
            </m-input-text>
            <!-- end ngày cấp  -->

             <!-- Start Số chứng minh nhân dân -->
             <m-input-text
                :value="currentEmployee.placeOfIssue"
                fieldLabel="Nơi cấp" 
                class="w-100"
              ></m-input-text>
            <!-- End Số chứng minh nhân dân  -->

          </div>
          <!-- end content right -->
        </div>
        <!-- end content top -->
      </div>
        <!-- start content top -->
        <div class="form-content-cennter">

          <!-- Start địa chỉ -->
          <m-input-text
            :value="currentEmployee.address"
            fieldLabel="Địa chỉ"
            class="w-100"
            ></m-input-text>
          <!-- End địa chỉ -->

          <!-- Start điện thoại di động -->
          <m-input-text 
            :value="currentEmployee.numberPhone"
            fieldLabel="ĐT di động" 
            class="w-25 p-r-6"
          ></m-input-text>
          <!-- End điện thoại di động -->

          <!-- Start điện cố định -->
          <m-input-text 
            :value="currentEmployee.deskPhone"
            fieldLabel="ĐT cố định" 
            class="w-25 p-r-6"
          ></m-input-text>
          <!-- End điện cố định -->

          <!-- Start email -->
          <m-input-text 
            :value="currentEmployee.email"
            fieldLabel="Email" 
            class="w-25 p-r-6" 
            style="margin-right:20%;"
          ></m-input-text>
          <!-- End email -->

          <!-- Start tài khoản ngân hàng -->
          <m-input-text
            :value="currentEmployee.bankAccountNumber"
            fieldLabel="Tài khoản ngân hàng"
            class="w-25 p-r-6"
            ></m-input-text>
          <!-- End tài khoản ngân hàng -->

          <!-- Start tên ngân hàng -->
          <m-input-text
            :value="currentEmployee.bankName"
            fieldLabel="Tên ngân hàng" 
            class="w-25 p-r-6"
            >
          </m-input-text>
          <!-- End tên ngân hàng -->

          <!-- Start chi nhánh -->
          <m-input-text 
            :value="currentEmployee.bankAccountBrand"
            fieldLabel="Chi nhánh" 
            class="w-25 p-r-6"
           ></m-input-text>
          <!-- End chi nhánh -->

        </div>
        <!-- end content top -->

        <!-- start bottom -->
        <div class="form-bottom">
          <div class="form-buttom-left">
            <m-button class="button-white" @click="$emit('closeForm',false)">
              <span>Hủy</span>
            </m-button>
          </div>
          <div class=form-bottom-right>
            <m-button class="button-white" style="margin:0 0.75rem;">
              <span>Cất</span>
            </m-button>
            <m-button>
              <span>Cất và thêm</span>
            </m-button>
          </div>
          
        </div>
        <!-- end bottom -->

      </div>
      <!-- end content -->


      <!-- start thông báo -->
      <m-notify
       @closeForm="($event == false)?$emit('closeForm',false):''" 
       @checkShowNotify="checkNotify.isShow=$event" 
       v-if="checkNotify.isShow" 
       :type="checkNotify.type" 
       :text="checkNotify.text"
      ></m-notify>
      <!-- end thông báo -->
     
  </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: nhúng các các hằng số
 */
import {GENDERS,NOTIFY_LIST,NOTIFY_TEXT} from '../../../constants'

import {departments} from '../../../js/Controllers/DepartmentsController.js'

import {positions} from '../../../js/Controllers/PositionsController.js'

export default {
  name: 'TheForm',
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
      currentEmployee: {}
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
          text: this.NOTIFY_LIST.Question.text(this.NOTIFY_TEXT.changeData),
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
    this.$refs.formContainer.focus();

  }
}
</script>

<style scoped>
  @import url(TheForm.css);
</style>
