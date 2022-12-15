<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Thông tin chi tiết khách hàng
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

        <!-- start nhóm nhà cung cấp -->
        <base-combobox-multiple
          class="w-100 p-b-12"
          classText="input-container-field-label"
          fieldName="Thuộc"
          :iconSum="false"
          :isMultiple="true"
        >
        </base-combobox-multiple>
        <!-- end nhóm nhà cung cấp -->

        <!-- start diễn giải -->
        <base-textarea class="w-100" text="Diễn giải" :height="56"></base-textarea>
        <!-- start diễn giải -->

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
/**
 * Author: Phạm Văn Đạt(14/12/2022)
 * Function: nhúng các các hằng số
 */

export default {
  components: {},
  name: "GroupSupplier",
  props: {
    title: {
      Type: String,
      default: "Tên Nhóm khách hàng, nhà cung cấp",
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {

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

  },
  watch: {},
};
</script>

<style scoped>
@import url(GroupSupplier.css);
</style>
