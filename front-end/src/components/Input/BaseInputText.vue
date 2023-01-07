<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Base input field
 -->
<template>
  <div class="input-container" :class="{ 'input-taxcode': isTaxCode }">
    <div
      class="input-container-field-label"
      v-if="fieldLabel != null ? true : false"
    >
      <div>
        <span v-if="tooltip == null">{{ fieldLabel }}</span>
        <span v-else v-tooltip="`${tooltip}`">{{ fieldLabel }}</span>
        <span v-show="iconRed" style="color: red"> *</span>
      </div>

      <span
        class="background-icon-warning"
        v-tooltip="`${currentErrorText}`"
        v-show="currentErrorText != null && isTaxCode"
      ></span>
    </div>

    <div
      class="input-container-content quantity"
      :class="{ 'input-container-content-error': currentErrorText != null }"
      :style="'height: ' + height + ';width: ' + width + 'px'"
    >
      <input
        :maxlength="maxlength"
        :type="type"
        :value="currentValue"
        :disabled="disabled"
        :class="{ 'text-right': isNumber || type == 'number' }"
        ref="input"
        :min="type == 'number' ? 0 : ''"
        :style="'height: ' + height"
        :max="99999999999999"
        :placeholder="placeholder"
        :name="name"
        @keypress="isNumber ? isNumberKey($event) : ''"
        @focusout="handlerValidate"
        @input="handlerInput"
      />

      <button
        class="input-container-content-icon icon-20 icon-mr-10"
        :class="classIcon"
        v-if="classIcon == null ? false : true"
      ></button>

      <!-- start hiển thị nút tăng giảm với kiểu số -->
      <div class="spin" v-if="type == 'number'">
        <div
          class="background-icon-arrow-bottom icon-16"
          @click="upValue"
        ></div>
        <div
          class="background-icon-arrow-bottom icon-16"
          @click="reduceValue"
        ></div>
      </div>
      <!-- end hiển thị nút tăng giảm với kiểu số -->

      <!-- start hiển thị lỗi nếu có -->
      <div
        class="input-container-error"
        v-show="currentErrorText != null ? true : false"
      >
        <div></div>
        <div>
          <span>{{ currentErrorText }}</span>
        </div>
      </div>
      <!-- end hiển thị lỗi nếu có -->
    </div>
  </div>
</template>

<script>
/**
 * Author: Phạm Văn Đạt(18/10/2022)
 */

// import thư viện này dùng để nhóm nhiều hành động giống
// nhau trong thời gian đang xử lý thành 1 hành động cuối cùng
import _ from "lodash";

import { NOTIFY_TEXT, RULE_FORMAT_DATA } from "../../js/constants";

import {FormatCash, TitleCase, Decimal } from "../../js/FomatData";

export default {
  name: "BaseInput",

  props: {
    // format tiền tệ
    isCash: {
      Type: Boolean,
      default: false
    },

    // kiểm tra input có được nhập không
    disabled: {
      Type: Boolean,
      default: false,
    },

    modelValue: String,
    // field hiển thị
    fieldLabel: String,

    // kiểu input
    type: String,

    // icon nếu có
    classIcon: {
      Type: String,
      default: null,
    },

    // chiều cao
    height: {
      Type: String,
      default: "32px",
    },

    // nhắc nhở nhập
    placeholder: String,

    // kích thước
    width: {
      Type: Number,
      default: 240,
    },

    // tên input
    name: {
      Type: String,
      default: null,
    },

    // icon sao nếu required
    iconRed: {
      Type: Boolean,
      default: false,
    },

    // check focus input
    checkFocus: {
      Type: String,
      default: false,
    },

    // text hiển thị tooltip
    tooltip: {
      Type: String,
      default: null,
    },

    // check null giá trị
    isRequired: {
      Type: Boolean,
      default: false,
    },

    // check mã số thuế
    isTaxCode: {
      Type: Boolean,
      default: false,
    },

    // text lỗi
    errorText: String,

    // kiểm tra là số điện thoại
    isPhoneNumber: Boolean,

    // kiểm tra là email
    isEmail: Boolean,

    // format dữ liệu
    isFormatText: {
      Type: Boolean,
      default: true,
    },

    // kiểu nhập số
    isNumber: {
      Type: Boolean,
      default: false,
    },

    // số kí tự được phép nhập
    maxlength: {
      Type: Number,
      default: 255,
    },

    // cho phép format số
    isFormatNumber: {
      Type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // khai báo biến chứa chuỗi lỗi
      currentErrorText: null,

      // giá trị hiện tại
      currentValue: null,
    };
  },
  created() {
    this.currentValue =
      this.isFormatNumber == true ? Decimal(this.modelValue) : (this.isCash)? FormatCash(this.modelValue):this.modelValue;

    },
  mounted() {
    /**
     * Author: Phạm Văn Đạt(25/10/2022)
     * Function: Focus nếu nameRef là first Focus
     */
    if (this.checkFocus == true) {
      this.handlerFocus();
    }

  },
  watch: {
    /**
     * Author: Phạm Văn Đạt(19/11/2022)
     * Function: Theo dõi disable
     * @param {*} value : giá trị true false nhận vào
     */
    disabled(value) {
      try {
        if (value) {
          this.$emit("update:modelValue", null);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(05/11/2022)
     * Function: Xử lý lấy giá trị truyền vào
     * @param {*} value : giá trị truyền vào
     */
    modelValue(value) {
      if (this.isFormatNumber == true) {
        this.currentValue = Decimal(value);
      }else if(this.isCash == true){
        this.currentValue = FormatCash(this.modelValue);
      } else {
        this.currentValue = value;
      }
    },

    /**
     * Author: Phạm Văn Đạt(30/10/2022)
     * Function: Xử lý lấy text validate
     */
    errorText(value) {
      this.currentErrorText = value;
    },
    /**
     * Author: Phạm Văn Đạt(25/10/2022)
     * Function: Xử lý focus input
     */
    checkFocus(value) {
      try{
        if (value == true) {
          this.handlerFocus();
        }
      }catch(e){
        console.log(e);
      }
      
    },
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(15/12/2022)
     * Function: Xử lý click tăng giá trị input type = number
     */
    upValue() {
      try {
        this.currentValue++;
        this.$emit("update:modelValue", this.currentValue);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(15/12/2022)
     * Function: Xử lý click giảm giá trị input type = number
     */
    reduceValue() {
      try {
        this.currentValue =
          this.currentValue > 0 ? this.currentValue - 1 : this.currentValue;
        this.$emit("update:modelValue", this.currentValue);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Auhtor: Phạm Văn Đạt(15/12/2022)
     * Function: Xử lý input chỉ được nhập số
     * @param {*} evt : sự kiện khi nhập số
     */
    isNumberKey: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },

    /**
     * Author: Phạm Văn Đạt(26/10/2022)
     * Function: Xử lý lấy dữ liệu khi input nhận thay đổi với debounce dùng để nhóm nhiều hành động thành 1 hành động
     * @param {} event
     */
    handlerInput(event) {
      try {
        // validate dữ liệu khi thay đổi giá trị input
        this.currentValue = event.target.value;

        if (this.isFormatText == true) {
          this.currentValue = TitleCase(this.currentValue);
        }

        this.handlerFormat();

        // gọi đến hàm xử lý validate
        this.handlerValidate(event);

        // nhóm 1 nhiều hành động giống nhau thành 1 hành dodojngj cụ thể. Xử lý trả về dữ liệu sau 1s.
        //Ứng dụng cụ thể vào input tìm kiếm khách hàng
        this.handlerChangeValueInput(event);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(27/10/2022)
     * Function: Xử lý trả về dữ liệu sau 500ms
     */
    handlerFormat: _.debounce(function () {
      if (this.isFormatNumber) {
        this.currentValue = Decimal(this.currentValue);
      }
    }, 400),

    /**
     * Author: Phạm Văn Đạt(27/10/2022)
     * Function: Xử lý trả về dữ liệu sau 500ms
     */
    handlerChangeValueInput: _.debounce(function (event) {
      try {
        let value = event.target?.value?.trim();
        // truyền lại dữ liệu cho cha gọi đến nó
        this.$emit("update:modelValue", value ? value : null);
      } catch (e) {
        console.log(e);
      }
    }, 500),

    /**
     * Author: Phạm Văn Đạt(25/10/2022)
     * Function: Focus vào input
     */
    handlerFocus() {
      try {
        this.$refs.input?.focus();
        this.$emit("checkFocus", false);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(27/10/2022)
     * Function: Focus out input kiểm tra check null
     */
    handlerValidate(event) {
      try {

       
        //  lấy tên hiển thị lỗi
        let nameError = this.fieldLabel
          ? this.fieldLabel
          : this.tooltip
          ? this.tooltip
          : this.placeholder;

        let valueInput = event.target.value;

        // nếu tồn tại isRequired thì xử lý validate required
        if (this.isRequired == true) {
          if (!valueInput) {
            this.currentErrorText = NOTIFY_TEXT.requiredField(nameError);
            this.$emit("errorText", this.currentErrorText);
          } else {
            this.currentErrorText = null;
            this.$emit("errorText", this.currentErrorText);
          }
        }

        // xử lý validate phone number
        if (this.isPhoneNumber == true) {
          if (valueInput) {
            this.handlerFormatData(
              valueInput,
              nameError,
              RULE_FORMAT_DATA.PhoneNumber
            );
          } else {
            this.currentErrorText = null;
            this.$emit("errorText", this.currentErrorText);
          }
        }
        // xử lý validate email
        else if (this.isEmail == true) {
          if (valueInput) {
            this.handlerFormatData(
              valueInput,
              nameError,
              RULE_FORMAT_DATA.Email
            );
          } else {
            this.currentErrorText = null;
            this.$emit("errorText", this.currentErrorText);
          }
        }

        // xử lý validate mã số thuế
        else if (this.isTaxCode == true) {
          if (valueInput) {
            this.handlerFormatData(
              valueInput,
              nameError,
              RULE_FORMAT_DATA.TaxCode
            );
          } else {
            this.currentErrorText = null;
            this.$emit("errorText", this.currentErrorText);
          }
        }

        //emit giá trị ra bên ngoài
        this.$emit("update:modelValue", this.currentValue);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(04/11/2022)
     * Function: Xử lý lỗi format dữ liệu
     */
    handlerFormatData(value, textError, typeCheck) {
      if (value != null && value != "") {
        let check;
        let checkTaxCode = false;

        if (typeCheck == RULE_FORMAT_DATA.PhoneNumber) {
          check = this.checkPhoneNumber(value);
        }

        if (typeCheck == RULE_FORMAT_DATA.Email) {
          check = this.checkEmail(value);
        }

        if (typeCheck == RULE_FORMAT_DATA.TaxCode) {
          check = this.checkTaxCode(value);
          checkTaxCode = true;
        }

        if (check == false) {
          if (checkTaxCode == true) {
            this.currentErrorText = NOTIFY_TEXT.formatTaxCode(textError);
          }

          this.currentErrorText = NOTIFY_TEXT.formatError(textError);
          this.$emit("errorText", this.currentErrorText);
        } else {
          this.currentErrorText = null;
          this.$emit("errorText", this.currentErrorText);
        }
      } else {
        this.currentErrorText = null;
        this.$emit("errorText", this.currentErrorText);
      }
    },

    /**
     * Author: Phạm Văn Đạt(04/11/2022)
     * Function: Xử lý kiểm tra sđt
     */
    checkPhoneNumber(phoneNumber) {
      let regExp = /(09|03|07|08|05)+([0-9]{8})/;
      let phone = phoneNumber.match(regExp);
      if (phone) {
        return true;
      }
      return false;
    },

    /**
     * Author: Phạm Văn Đạt(04/11/2022)
     * Function: Xử lý kiểm tra sđt
     */
    checkEmail(email) {
      let regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let _email = email.match(regExp);
      if (_email) {
        return true;
      }
      return false;
    },

    /**
     * Author: Phạm Văn Đạt(29/12/2022)
     * Function: Xử lý kiểm tra mã số thuế
     */
    checkTaxCode(value) {
      const regexTaxCode = "^[0-6]{1}[0-9]{9}$|^[0-6]{1}[0-9]{9}-[0-9]{3}$";

      return value.match(regexTaxCode) ? true : false;
    },
  },
};
</script>

<style>
@import url(BaseInputText.css);
</style>
