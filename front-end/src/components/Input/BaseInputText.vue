<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Base input field
 -->
<template>
  <div class="input-container">
    <div
      class="input-container-field-label"
      v-if="fieldLabel != null ? true : false"
    >
      <span v-if="tooltip == null">{{ fieldLabel }}</span>
      <span v-else v-tooltip="`${tooltip}`">{{ fieldLabel }}</span>
      <span v-show="iconRed" style="color: red"> *</span>
    </div>

    <div
      class="input-container-content"
      :class="{ 'input-container-content-error': currentErrorText != null }"
      :style="'height: ' + height + ';width: ' + width + 'px'"
    >
      <input
        :type="type"
        :value="currentValue"
        ref="input"
        :style="'height: ' + height"
        :placeholder="placeholder"
        :name="name"
        @focusout="HandlerValidate"
        @input="HandlerInput"
      />
      <button
        class="input-container-content-icon icon-20 icon-mr-10"
        :class="classIcon"
        v-if="classIcon == null ? false : true"
      ></button>
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

import { NOTIFY_TEXT, RULE_FORMAT_DATA } from "../../constants";

import { TitleCase } from "../../js/FomatData";

export default {
  name: "BaseInput",

  props: {

    modelValue:String,
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

    // text lỗi
    errorText: String,

    // kiểm tra là số điện thoại
    isPhoneNumber: Boolean,

    // kiểm tra là email
    isEmail: Boolean,

    isFormatText: {
      Type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      // khai báo biến chứa chuỗi lỗi
      currentErrorText: null,

      // giá trị hiện tại
      currentValue:null
    };
  },
  created() {
    this.currentValue = this.modelValue;
  },
  mounted() {
    /**
     * Author: Phạm Văn Đạt(25/10/2022)
     * Function: Focus nếu nameRef là first Focus
     */
    if (this.checkFocus == true) {
      this.HandlerFocus();
    }
  },
  watch: {

    /**
     * Author: Phạm Văn Đạt(05/11/2022)
     * Function: Xử lý lấy giá trị truyền vào
     * @param {*} value : giá trị truyền vào
     */
    modelValue(value){
      this.currentValue = value;
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
      if (value == true) {
        this.HandlerFocus();
      }
    },
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(26/10/2022)
     * Function: Xử lý lấy dữ liệu khi input nhận thay đổi với debounce dùng để nhóm nhiều hành động thành 1 hành động
     * @param {} event
     */
    HandlerInput(event) {
      try {
        // validate dữ liệu khi thay đổi giá trị input
        this.currentValue = event.target.value;

        if (this.isFormatText == true) {
          this.currentValue = TitleCase(this.currentValue);
        }

        // gọi đến hàm xử lý validate
        this.HandlerValidate(event);

        // nhóm 1 nhiều hành động giống nhau thành 1 hành dodojngj cụ thể. Xử lý trả về dữ liệu sau 1s.
        //Ứng dụng cụ thể vào input tìm kiếm khách hàng
        this.HandlerChangeValueInput(event);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(27/10/2022)
     * Function: Xử lý trả về dữ liệu sau 500ms
     */
    HandlerChangeValueInput: _.debounce(function (event) {
      try {
        // truyền lại dữ liệu cho cha gọi đến nó
        this.$emit('update:modelValue', event.target?.value?.trim());
      } catch (e) {
        console.log(e);
      }
    }, 500),

    /**
     * Author: Phạm Văn Đạt(25/10/2022)
     * Function: Focus vào input
     */
    HandlerFocus() {
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
    HandlerValidate(event) {
      try {
        // nếu tồn tại isRequired thì xử lý validate required
        if (this.isRequired == true) {
          if (!event.target.value) {
            this.currentErrorText = NOTIFY_TEXT.requiredField(this.fieldLabel);
            this.$emit("errorText", this.currentErrorText);
          } else {
            this.currentErrorText = null;
            this.$emit("errorText", this.currentErrorText);
          }
        }

        if (this.isPhoneNumber == true) {
          this.HandlerFormatData(
            event.target.value,
            this.tooltip,
            RULE_FORMAT_DATA.PhoneNumber
          );
        }

        if (this.isEmail == true && event.target.value) {
          this.HandlerFormatData(
            event.target.value,
            this.fieldLabel,
            RULE_FORMAT_DATA.Email
          );
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(04/11/2022)
     * Function: Xử lý lỗi format dữ liệu
     */
    HandlerFormatData(value, textError, typeCheck) {
      if (value) {
        let check;
        if (typeCheck == RULE_FORMAT_DATA.PhoneNumber) {
          check = this.CheckPhoneNumber(value);
        }

        if (typeCheck == RULE_FORMAT_DATA.Email) {
          check = this.CheckEmail(value);
        }
        if (check == false) {
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
    CheckPhoneNumber(phoneNumber) {
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
    CheckEmail(email) {
      let regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let _email = email.match(regExp);
      if (_email) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
@import url(BaseInputText.css);
</style>
