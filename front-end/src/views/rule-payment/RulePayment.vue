
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
          v-model="currentRulePayment.rulePaymentCode"
          :errorText="
            listErrors.has('rulePaymentCode')
              ? listErrors.get('rulePaymentCode')
              : null
          "
          @errorText="
            $event
              ? !listErrors.has('rulePaymentCode')
                ? listErrors.set('rulePaymentCode', $event)
                : ''
              : listErrors.delete('rulePaymentCode')
          "
          :checkFocus="fieldFocusValidate.rulePaymentCode"
          @checkFocus="fieldFocusValidate.rulePaymentCode = false"
        ></base-input-text>
        <!-- end mã nhóm nhà cung cấp, khách hàng -->

        <!-- start mã nhóm nhà cung cấp, khách hàng -->
        <base-input-text
          class="w-2/3"
          fieldLabel="Tên"
          :iconRed="true"
          :isRequired="true"
          :isFormatText="false"
          v-model="currentRulePayment.rulePaymentName"
          :errorText="
            listErrors.has('rulePaymentName')
              ? listErrors.get('rulePaymentName')
              : null
          "
          @errorText="
            $event
              ? !listErrors.has('rulePaymentName')
                ? listErrors.set('rulePaymentName', $event)
                : ''
              : listErrors.delete('rulePaymentName')
          "
          :checkFocus="fieldFocusValidate.rulePaymentName"
          @checkFocus="fieldFocusValidate.rulePaymentName = false"
        ></base-input-text>
        <!-- end mã nhóm nhà cung cấp, khách hàng -->

        <!-- start số ngày được nợ -->
        <base-input-text
          class="w-1/3 p-r-12 box-sizing-b"
          fieldLabel="Số ngày được nợ"
          :isFormatText="false"
          :isNumber="true"
          v-model="currentRulePayment.dayOwed"
        ></base-input-text>
        <!-- end số ngày được nợ -->

        <div class="w-1/6 p-t-30">Ngày</div>

        <!-- start Thời hạn hưởng chiết khấu -->
        <base-input-text
          class="w-1/3 p-r-12 box-sizing-b"
          fieldLabel="Thời hạn hưởng chiết khấu"
          :isFormatText="false"
          :isNumber="true"
          v-model="currentRulePayment.awardDeadline"
        ></base-input-text>
        <!-- end Thời hạn hưởng chiết khấu -->

        <div class="w-1/6 p-t-30">Ngày</div>

        <!-- start Tỉ lệ chiết khấu -->
        <base-input-text
          class="w-1/3 p-r-12 box-sizing-b"
          fieldLabel="Tỉ lệ chiết khấu"
          :isFormatText="false"
          :isNumber="true"
          v-model="currentRulePayment.depreciationRate"
        ></base-input-text>
        <!-- end Tỉ lệ chiết khấu -->

        <div class="w-1/6 p-t-30">%</div>

        <div class="divide"></div>
      </div>
      <!-- end content-form -->

      <!-- start bottom -->
      <div class="form-bottom">
        <div class="form-bottom-right">
          <base-button
            v-tooltip="'Cất và thêm(Ctrl + Shift +S)'"
            @clickButton="handlerUpdateData(FUNCTION_UPLOAD.SaveAndInsert)"
            text="Cất và thêm"
          >
          </base-button>
          <base-button
            classButton="button-white"
            v-tooltip="'Cất(Ctrl + S)'"
            @clickButton="handlerUpdateData(FUNCTION_UPLOAD.Save)"
            style="margin: 0 0.75rem"
            text="Cất"
          >
          </base-button>
        </div>

        <div class="form-buttom-left">
          <base-button classButton="button-white"
           text="Hủy"
           @clickButton="$emit('closeForm', false)"
           @keydown.tab.prevent="fieldFocusValidate.rulePaymentCode = true"
           > </base-button>
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

     <!-- start loading -->
  <base-loading v-show="isLoading"></base-loading>
  <!-- end loading -->

  </div>
</template>

<script>
import {
  TEXT_TOAST_MESSAGE,
  FIELDS_RULE_PAYMENTS_REQUIRED,
  NOTIFY_TEXT,
  FUNCTION_UPLOAD,
  NOTIFY_LIST,
  STATUS_CODES
} from "../../js/constants.js";

import { createGuid } from "../../js/GuidId.js";

import { lowerCaseFirst } from "../../js/FomatData.js";

import {
  rulePaymentModel,
  reluPayments,
} from "../../js/Controllers/RulePaymentsController.js";

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

      //hiển thị loading
      isLoading: false,

      // lấy tên trường đầu tiên có lỗi
      firstFocus: null,

      // kiểm tra notify
      checkNotify: {
        isShow: false,
        type: null,
        text: null,
      },

      FUNCTION_UPLOAD,

      // các trường check focus
      fieldFocusValidate: {
        // mã số điều khoản thanh toán
        rulePaymentCode: true,

        // tên điều khoản thanh toán
        rulePaymentName: false,
      },

      // thứ tự hiển thị lỗi
      numericalOrder: ["rulePaymentCode", "rulePaymentName"],

      // mảng lưu các lỗi đã có: { field: String, message: String} : chứa object này
      listErrors: new Map(),

      // điều khoản thanh toán hiên tại
      currentRulePayment: rulePaymentModel,
    };
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(26/12/2022)
     * Function: XỬ lý focus vào lỗi đầu tiên nếu như có lỗi
     */
    checkFocusCloseNotify(value) {

      Object.keys(this.fieldFocusValidate).forEach((key) => {
        if (
          this.fieldFocusValidate[key] !=
          this.fieldFocusValidate[value]
        ) {
          this.fieldFocusValidate[key] = false;
        }
      });

      // chuyển trạng thái focus true ở lỗi đầu tiên
      this.fieldFocusValidate[value] = true;
    },

    /**
     * Author: Phạm Văn Đạt)(26/12/2022)
     * Funtion: Xử lý upload dữ liệu
     * @param {*} functionUpload : thêm | thêm hoặc xóa
     */
    async handlerUpdateData(functionUpload) {
      try {
        console.log(functionUpload);

        // xử lý validate dữ liệu
        this.valiDateRequired();

        console.log(this.listErrors);

        if (this.listErrors.size == 0) {
          // không có lỗi
          this.currentRulePayment.rulePaymentID = createGuid();

          // hiển thị loading
          this.isLoading = true;

          //gọi api thêm dữ liệu
          const result = await reluPayments.insertRulePayments(
            this.currentRulePayment
          );

          // ẩn loading
          this.isLoading = false;

          // thêm mới || cập nhật thất bại
          if (result?.statusCode == STATUS_CODES.Code400) {
            if (result?.data) {
              this.handlerErrorUploadForm(result.data);
            }
          } else if (result?.statusCode == STATUS_CODES.Code201) {
            // hiển thị loading
            // thêm phần tử vào đầu mảng
            reluPayments.currentData = [
              this.currentRulePayment,
              ...reluPayments.currentData,
            ];
            reluPayments.totalCount++;

            const item = this.currentRulePayment.rulePaymentID;

            this.$emit("newItem", item);

            // hiển thị thông báo thêm mới thành công| cập nhật thành công
            if (functionUpload == FUNCTION_UPLOAD.Save) {
              // ẩn form
              this.$emit("closeForm", false);
            } else {
              // cất và thêm
              this.resetData();
            }
            // thêm mới thành công
            this.$emit("toastMessage", {
              textToastMessage: TEXT_TOAST_MESSAGE.CreateSuccess.text,
              typeToastMessage: TEXT_TOAST_MESSAGE.CreateSuccess.type,
            });

            // ẩn loading
          }
        } else {
          // nếu có lỗi => xử lý hiển thị lỗi

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
        console.log(e);
        this.$emit("textToastMessage", TEXT_TOAST_MESSAGE.Error.text);
        this.$emit("typeToastMessage", TEXT_TOAST_MESSAGE.Error.type);
      }
    },

    

    /**
     * Author: Phạm Văn Đạt(26/12/2022)
     * Function: Xử lý lỗi khi click upload form
     */
     handlerErrorUploadForm(data) {
      try {
        for (const keyResult in data) {
          for (let key in data[keyResult]) {
            let fieldName = lowerCaseFirst(key);
            // xử lý focus lỗi đầu tiên
            if (keyResult == 0) {
              this.fieldFocusValidate[fieldName] = true;
              console.log(this.fieldFocusValidate[fieldName]);
            }

            // lấy lỗi đưa vào list lỗi
            this.listErrors.set(fieldName, data[keyResult][key]);

            // emit lỗi ra cho supplierDetial nhận
            this.$emit("textToastMessage", data[keyResult][key]);
            this.$emit("typeToastMessage", TEXT_TOAST_MESSAGE.Error.type);
          }
        }
      } catch (e) {
        // hiển thị lỗi
        this.$emit("toastMessage", {
          textToastMessage: TEXT_TOAST_MESSAGE.Error.text,
          typeToastMessage: TEXT_TOAST_MESSAGE.Error.type,
        });
      }
    },

    /**
     * Author: Phạm Văn Đạt(26/12/2022)
     * Function: Xử lý reset dữ liệu
     */
     resetData() {
      this.currentRulePayment = {
        rulePaymentID: null,
        rulePaymentCode: null,
        rulePaymentName: null,
        dayOwed: 0,
        awardDeadline: 0,
        depreciationRate: null
      }
    },

    /**
     * Author: Phạm Văn Đạt(26/12/2022)
     * Function: Xử lý lấy lỗi đầu tiên trong mảng lỗi
     */
    selectErrorTextFirst() {
      // lấy lỗi theo thứ tự: mã, tên, phòng ban
      for (let i = 0; i < this.numericalOrder.length; i++) {
        if (this.listErrors.has(this.numericalOrder[i])) {
          // lấy tên trường đầu tiên có lỗi
          this.firstFocus = this.numericalOrder[i];

          console.log(this.listErrors.get(this.numericalOrder[i]));

          return this.listErrors.get(this.numericalOrder[i]);
        }
      }
      return null;
    },

    /**
     * Author: Phạm Văn Đạt(26/12/2022)
     * Function: Xử lý validate dữ liệu khi click nút cất, cất và thêm
     */
    valiDateRequired() {
      try {
        // xử lý bấm nút cất, cất và thêm validate các lỗi required
        FIELDS_RULE_PAYMENTS_REQUIRED.forEach((value) => {
          // kiểm tra giá trị có null không
          if (!this.currentRulePayment[value.fielName]) {
            // thêm tên trường và message lỗi vào danh sách lỗi nếu chưa có lỗi đó
            if (!this.listErrors.has(value.fielName)) {
              this.listErrors.set(
                value.fielName,
                NOTIFY_TEXT.requiredField(value.fieldText)
              );
            }

            // nếu chưa lấy trường nào thì mới nhận dữ liệu
            this.firstFocus = value.fielName;
          }
        });
      } catch (e) {
        this.$emit("textToastMessage", TEXT_TOAST_MESSAGE.Error.text);
        this.$emit("typeToastMessage", TEXT_TOAST_MESSAGE.Error.type);
      }
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
};
</script>

<style scoped>
@import url(RulePayment.css);
</style>
