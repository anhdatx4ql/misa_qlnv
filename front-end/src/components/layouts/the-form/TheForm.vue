<template>
  <div class="form">
    <div class="form-container">
      <!-- start header -->
      <div class="form-header">
        <div class="form-header-left">
          <div class="form-header-left-title">
            Thông tin nhân viên
          </div>
            <!-- start Check box kiểm tra khách hàng -->
            <m-input-checkbox text="Là khách hàng" id="khach-hang"></m-input-checkbox>
            <!-- end Check box kiểm tra khách hàng -->

            <!-- start Check box kiểm tra nhà cung cấp -->
            <m-input-checkbox text="Là nhà cung cấp" id="nha-cung-cap"></m-input-checkbox>
            <!-- end Check box kiểm tra nhà cung cấp -->
        </div>
        <div class="form-header-right">
            <m-button><span class="background-icon-question icon-24"></span></m-button>
            <m-button @click="handlerCloseForm"><span class="background-icon-close icon-24"></span></m-button>
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
            <m-input-text class="w-40 p-r-6" fieldLabel="Mã" :iconRed="true"></m-input-text>
            <!-- end mã -->

            <!-- start Tên -->
            <m-input-text class="w-60" fieldLabel="Tên" :iconRed="true"></m-input-text>
            <!-- end tên-->

            <!-- start đơn vị -->
            <m-combobox comboboxField="Đơn vị" :listValues="positions"
             position="top" :iconRed="true">
            </m-combobox>
            <!-- end đơn vị -->

            <!-- start chức vụ -->
            <m-combobox comboboxField="Chức vụ" :listValues="positions" position="top">
            </m-combobox>
            <!-- end chức vụ -->

          </div>
          <!-- end content top left -->

          <!-- start content right -->
          <div class="form-content-top-right">
            <!-- start ngày sinh -->
            <m-input-text type="date" fieldLabel="Ngày sinh" class="w-40 p-r-6">
            </m-input-text>
            <!-- end ngày sinh  -->

            <!-- start giới tính -->
            <!-- nam -->
            <div class="form-gender">
              <div class="form-gender-title">Giới tính</div>
              <div class="flex flex-grow-1">
                <m-input-radio :value="genders.Male" checked="checked" text="Nam" name="gender" id="male">
                </m-input-radio>

                <!-- nữ -->
                <m-input-radio :value="genders.Female" text="Nữ" name="gender" id="female">
                </m-input-radio>

                <!-- Khác -->
                <m-input-radio :value="genders.Other" text="Khác" name="gender" id="other">
                </m-input-radio>
              </div>
            </div>
           
            <!-- end giới tính -->

            <!-- Start Số chứng minh nhân dân -->
            <m-input-text class="w-60 p-r-6" fieldLabel="Số CMND"></m-input-text>
            <!-- End Số chứng minh nhân dân  -->

            <!-- start ngày cấp -->
            <m-input-text type="date" fieldLabel="Ngày cấp" class="flex-grow-1">
            </m-input-text>
            <!-- end ngày cấp  -->

             <!-- Start Số chứng minh nhân dân -->
             <m-input-text fieldLabel="Nơi" class="w-100"></m-input-text>
            <!-- End Số chứng minh nhân dân  -->

          </div>
          <!-- end content right -->
        </div>
        <!-- end content top -->
      </div>
        <!-- start content top -->
        <div class="form-content-cennter">

          <!-- Start địa chỉ -->
          <m-input-text fieldLabel="Địa chỉ" class="w-100"></m-input-text>
          <!-- End địa chỉ -->

          <!-- Start điện thoại di động -->
          <m-input-text fieldLabel="ĐT di động" class="w-25 p-r-6"></m-input-text>
          <!-- End điện thoại di động -->

          <!-- Start điện cố định -->
          <m-input-text fieldLabel="ĐT cố định" class="w-25 p-r-6"></m-input-text>
          <!-- End điện cố định -->

          <!-- Start email -->
          <m-input-text fieldLabel="Email" class="w-25 p-r-6" style="margin-right:20%;"></m-input-text>
          <!-- End email -->

          <!-- Start tài khoản ngân hàng -->
          <m-input-text fieldLabel="Tài khoản ngân hàng" class="w-25 p-r-6"></m-input-text>
          <!-- End tài khoản ngân hàng -->

          <!-- Start tên ngân hàng -->
          <m-input-text fieldLabel="Tên ngân hàng" class="w-25 p-r-6"></m-input-text>
          <!-- End tên ngân hàng -->

          <!-- Start chi nhánh -->
          <m-input-text fieldLabel="Chi nhánh" class="w-25 p-r-6"></m-input-text>
          <!-- End chi nhánh -->

        </div>
        <!-- end content top -->

        <!-- start bottom -->
        <div class="form-bottom">
          <div class="form-buttom-left">
            <m-button class="button-white">
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
import MInputCheckbox from '@/components/bases/MInput/MInputCheckbox.vue'
import {POSITIONS_LIST,GENDERS,NOTIFY_LIST,NOTIFY_TEXT} from '../../../constants'
import MInputRadio from '@/components/bases/MInput/MInputRadio.vue';
export default {
  components: { MInputCheckbox, MInputRadio },
  name: 'TheForm',
  props: {
  },
  data(){
    return{
      // danh sách chức vụ
      positions: [],

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
      NOTIFY_TEXT:{}
    }
  },
  created(){
    // lấy danh sách vị trí
    this.positions = POSITIONS_LIST;

    // lấy danh sách giưới tính
    this.genders = GENDERS;

    // lấy danh sách thông báo
    this.NOTIFY_LIST = NOTIFY_LIST;

    // các text có thể có trong thông báo
    this.NOTIFY_TEXT = NOTIFY_TEXT;
  },
  methods:{
    /**
     * Author: Phạm Văn Đạt (18/10/2022)
     * Function: Xử lý click ẩn form
     */
    handlerCloseForm(){
      // gán lại giá trị notifi
      this.checkNotify = {
        isShow: true,
        type: this.NOTIFY_LIST.Question.type,
        text: this.NOTIFY_LIST.Question.text(this.NOTIFY_TEXT.changeData),
      };
   
    }
  }
}
</script>

<style scoped>
  @import url(TheForm.css);
</style>
