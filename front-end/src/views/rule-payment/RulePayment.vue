
<!-- 
  Author: Phạm Văn Đạt
  Function: màn hình thu, chi tiền
 -->

<template>
 <div class="form-supplier-group from">
    <div class="form-container form-supplier-group-container">
      <!-- start header form -->
      <div class="form-header">
        <div class="form-header-left">
          <div class="form-header-left-title">
            {{ title }}
          </div>
        </div>
        <div class="form-header-right">
          <div v-tooltip="{ global: true, theme: { placement: 'bottom' } }">
            <base-button
              classButtonIcon="background-icon-close icon-24"
              @clickButton="handlerCloseForm"
              v-tooltip="'Đóng (ESC)'"
            >
            </base-button>
          </div>
        </div>
      </div>
      <!-- end header form -->

      <!-- start content-form -->
      <div class="from-content">
        <!-- start mã nhóm nhà cung cấp, khách hàng -->
        <base-input-text
          class="w-1/3 p-r-12 box-sizing-b"
          fieldLabel="Mã"
          :iconRed="true"
          :isRequired="true"
          :isFormatText="false"
        ></base-input-text>
        <!-- end mã nhóm nhà cung cấp, khách hàng -->

        <!-- start mã nhóm nhà cung cấp, khách hàng -->
        <base-input-text
          class="w-2/3"
          fieldLabel="Tên"
          :iconRed="true"
          :isRequired="true"
          :isFormatText="false"
        ></base-input-text>
        <!-- end mã nhóm nhà cung cấp, khách hàng -->

         <!-- start số ngày được nợ -->
         <base-input-text
          class="w-1/3 p-r-12 box-sizing-b"
          fieldLabel="Số ngày được nợ"
          :isFormatText="false"
          :isNumber="true"
        ></base-input-text>
        <!-- end số ngày được nợ -->

        <div class="w-1/6 p-t-30">
          Ngày
        </div>

         <!-- start Thời hạn hưởng chiết khấu -->
         <base-input-text
          class="w-1/3 p-r-12 box-sizing-b"
          fieldLabel="Thời hạn hưởng chiết khấu"
          :isFormatText="false"
          :isNumber="true"
        ></base-input-text>
        <!-- end Thời hạn hưởng chiết khấu -->

        <div class="w-1/6 p-t-30">
          Ngày
        </div>

         <!-- start Tỉ lệ chiết khấu -->
         <base-input-text
          class="w-1/3 p-r-12 box-sizing-b"
          fieldLabel="Tỉ lệ chiết khấu"
          :isFormatText="false"
          :isNumber="true"
        ></base-input-text>
        <!-- end Tỉ lệ chiết khấu -->

        <div class="w-1/6 p-t-30">
          %
        </div>

        <div class="divide"></div>
      </div>
      <!-- end content-form -->

      <!-- start bottom -->
      <div class="form-bottom">
        <div class="form-bottom-right">
          <base-button
            v-tooltip="'Cất và thêm(Ctrl + Shift +S)'"
            text="Cất và thêm"
          >
          </base-button>
          <base-button
            classButton="button-white"
            v-tooltip="'Cất(Ctrl + S)'"
            style="margin: 0 0.75rem"
            text="Cất"
          >
          </base-button>
        </div>

        <div class="form-buttom-left">
          <base-button classButton="button-white" text="Hủy"> </base-button>
        </div>
      </div>
      <!-- end bottom -->
    </div>
  </div>
</template>

<script>

export default {
  name: "RulePayment",
  props: {
     // title form
     title: {
      Type: String,
      default: "Thêm Điều khoản thanh toán",
    },
  },
  data() {
    return {
      
    };
  },
  methods:{
    
    /**
     * Author: Phạm Văn Đạt(14/12/2022)
     * Function: Xử lý close Form
     */
     handlerCloseForm(){
      try{
        this.$emit('closeForm',false);
      }catch(e){
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
@import url(RulePayment.css); 
</style>
