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
          ref="firstFocus"
          :isRequired="true"
          :isFormatText="false"
          v-model="currentGroupSupplier.groupSupplierCode"
          :errorText="
            listErrors.has('groupSupplierCode')
              ? listErrors.get('groupSupplierCode')
              : null
          "
          @errorText="
            $event
              ? !listErrors.has('groupSupplierCode')
                ? listErrors.set('groupSupplierCode', $event)
                : ''
              : listErrors.delete('groupSupplierCode')
          "
          :checkFocus="fieldFocusValidate.groupSupplierCode"
          @checkFocus.prevent="fieldFocusValidate.groupSupplierCode = false"
        ></base-input-text>
        <!-- end mã nhóm nhà cung cấp, khách hàng -->

        <!-- start tên nhóm nhà cung cấp, khách hàng -->
        <base-input-text
          class="w-2/3"
          fieldLabel="Tên"
          :iconRed="true"
          :isRequired="true"
          :isFormatText="true"
          v-model="currentGroupSupplier.groupSupplierName"
          :errorText="
            listErrors.has('groupSupplierName')
              ? listErrors.get('groupSupplierName')
              : null
          "
          @errorText="
            $event
              ? !listErrors.has('groupSupplierName')
                ? listErrors.set('groupSupplierName', $event)
                : ''
              : listErrors.delete('groupSupplierName')
          "
          :checkFocus="fieldFocusValidate.groupSupplierName"
          @checkFocus="fieldFocusValidate.groupSupplierName = false"
        ></base-input-text>
        <!-- end tên nhóm nhà cung cấp, khách hàng -->

        <!-- start nhóm nhà cung cấp -->
        <base-combobox-multiple
          class="w-100 p-b-12"
          classText="input-container-field-label"
          fieldName="Thuộc"
          :iconSum="false"
          :isMultiple="true"
          v-model="currentGroupSupplier.parentGroupSupplierId"
          :errorText="
            listErrors.has('parentGroupSupplierId')
              ? listErrors.get('parentGroupSupplierId')
              : null
          "
          @errorText="
            $event
              ? !listErrors.has('parentGroupSupplierId')
                ? listErrors.set('parentGroupSupplierId', $event)
                : ''
              : listErrors.delete('parentGroupSupplierId')
          "
          :checkFocus="fieldFocusValidate.parentGroupSupplierId"
          @checkFocus="fieldFocusValidate.parentGroupSupplierId = false"
        >
        </base-combobox-multiple>
        <!-- end nhóm nhà cung cấp -->

        <!-- start diễn giải -->
        <base-textarea
          class="w-100"
          text="Diễn giải"
          :height="56"
          v-model="currentGroupSupplier.groupSupplierDescription"
          :errorText="
            listErrors.has('groupSupplierDescription')
              ? listErrors.get('groupSupplierDescription')
              : null
          "
          @errorText="
            $event
              ? !listErrors.has('groupSupplierDescription')
                ? listErrors.set('groupSupplierDescription', $event)
                : ''
              : listErrors.delete('groupSupplierDescription')
          "
          :checkFocus="fieldFocusValidate.groupSupplierDescription"
          @checkFocus="fieldFocusValidate.groupSupplierDescription = false"
        ></base-textarea>
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
            @clickButton="handlerUploadData(functionUpload.SaveAndInsert)"
          >
          </base-button>
          <base-button
            classButton="button-white"
            v-tooltip="'Cất(Ctrl + S)'"
            style="margin: 0 0.75rem"
            text="Cất"
            @clickButton="handlerUploadData(functionUpload.Save)"
          >
          </base-button>
        </div>

        <div class="form-buttom-left">
          <base-button classButton="button-white" text="Hủy" @focusout="handlerFocusForm()"> </base-button>
        </div>
      </div>
      <!-- end bottom -->
    </div>

    <!-- start thông báo -->
    <base-notify
      @closeForm="handlerCloseNotifi"
      @checkShowNotify="checkNotify.isShow = $event"
      v-if="checkNotify.isShow"
      :type="checkNotify.type"
      :text="checkNotify.text"
      :fieldNameFocus="firstFocus"
      @checkFocusCloseNotify="checkFocusCloseNotify($event)"
      @sayYes="$event == true ? handlerUpdateData(FUNCTION_UPLOAD.Save) : ''"
    ></base-notify>
    <!-- end thông báo -->
  </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(14/12/2022)
 * Function: nhúng các các hằng số
 */
import {
  groupSupplierModel,
} from "../../js/Controllers/GroupSuppliersController.js";

import { FUNCTION_UPLOAD, NOTIFY_LIST, TEXT_TOAST_MESSAGE } from "../../js/constants"

export default {
  components: {},
  name: "GroupSupplier",
  props: {
    // title form
    title: {
      Type: String,
      default: "Tên Nhóm khách hàng, nhà cung cấp",
    },
  },
  data() {
    return {

      // kiểm tra notify
      checkNotify: {
        isShow: false,
        type: null,
        text: null,
      },

      // mảng lưu các lỗi đã có: { field: String, message: String} : chứa object này
      listErrors: new Map(),

      NOTIFY_LIST,
      //  các chức năng cất form: cất, cất và thêm
      FUNCTION_UPLOAD,

      // khởi tạo đối tượng lưu giá trị của nhóm nhà cung cấp
      currentGroupSupplier: groupSupplierModel,

      // các trường check focus
      fieldFocusValidate: {
        // mã nhóm nhà cung cấp
        groupSupplierCode: true,

        // tên nhóm nhà cung cấp
        groupSupplierName: false,

        // thông tin chi tiết nhà cung cáp
        groupSupplierDescription: false,

        // id nhóm cha
        parentGroupSupplierId: false,
      },

      // thứ tự hiển thị lỗi
      numericalOrder: [
        "employeeCode",
        "employeeName",
        "departmentId",
        "positionId",
        "employeeBirthDay",
        "issuaOn",
        "employeeNumberPhone",
        "employeeDeskPhone",
        "employeeEmail",
      ],

      // name field focus
      firstFocus: null
    };
  },
  created() {},
  methods: {

    /**
     * Author: Phạm Văn Đạt(23/12/2022)
     * Function: Xử lý focus out button hủy xoay vòng
     */
    handlerFocusForm(){
      try{
        this.fieldFocusValidate.groupSupplierCode = true;

        console.log(this.fieldFocusValidate.groupSupplierCode)

      }catch(e){
        console.log(e);
      }
    },
    /**
     * Author: Phạm Văn Đạt(28/10/2022)
     * Function: Xử lý upload dữ liệu
     */
    async handlerUploadData(functionUpload) {
      try {
        console.log(functionUpload);
        //xử lý validate
        this.valiDateRequired();

        // nếu không có lỗi => thực hiện thêm hoặc update
        if (this.listErrors.size == 0) {

          // xử lý cất
          if(functionUpload == FUNCTION_UPLOAD.Save){
            console.log("cất");
          }else{
            // xử lý cất và thêm
            console.log("cất và thêm");
          }
        } else {
          // xử lý hiển thị lỗi

          // chuyển map về dạng value, lấy phân tử đầu tiên hiển thị lên thông báo
          let valueText = this.selectErrorTextFirst();
          // hiển thị lỗi đầu tiên lên thông báo lỗi
          // gán lại giá trị notifi
          if (valueText != null) {
            this.checkNotify = {
              isShow: true,
              type: NOTIFY_LIST.ErrorValidate.type,
              text: NOTIFY_LIST.ErrorValidate.text(valueText),
            };
          }
        }
      } catch (e) {
        this.$emit("textToastMessage", TEXT_TOAST_MESSAGE.Error.text);
        this.$emit("typeToastMessage", TEXT_TOAST_MESSAGE.Error.type);
      }
    },

    /**
     * Author: Phạm Văn Đạt(23/12/2022)
     * Function: Xử lý lấy lỗi đầu tiên trong mảng lỗi
     */
     selectErrorTextFirst() {
      // lấy lỗi theo thứ tự: mã, tên, phòng ban
      for (let i = 0; i < this.numericalOrder.length; i++) {
        if (this.listErrors.has(this.numericalOrder[i])) {
          // lấy tên trường đầu tiên có lỗi
          this.firstFocus = this.numericalOrder[i];

          return this.listErrors.get(this.numericalOrder[i]);
        }
      }
      return null;
    },

    /**
     * Author: Phạm Văn Đạt(14/12/2022)
     * Function: Xử lý close Form
     */
    handlerCloseForm() {
      try {
        this.$emit("closeForm", false);
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    "fieldFocusValidate.groupSupplierCode"(value){
        console.log(value)
    }
  },
};
</script>

<style scoped>
@import url(GroupSupplier.css);
</style>
