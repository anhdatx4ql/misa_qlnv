<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Basecombobox
 -->

<template>
  <div class="combobox-field" v-show="comboboxField != null">
    {{ comboboxField }}
    <span v-show="iconRed" style="color: red"> *</span>
  </div>
  <div
    class="combobox"
    @click="selectListValueCombobox"
    v-click-away="handlerHideDropdown"
    @focusout="checkRequiredValue"
  >
    <div
      class="combobox-container"
      :class="{ 'combobox-error': currentErrorText != null }"
      :style="'width: ' + width + 'px'"
    >
      <div class="combobox-container-input" v-show="icon">
        <input
          v-if="input"
          type="text"
          @focusout="checkShowDropDown = false"
          :disabled="disabled ? '' : disabled"
          :placeholder="placeholder"
          @input="handlerInput"
          ref="input"
          :value="cbxValue.name"
          style="width: 156px"
        />
      </div>
      <div class="combobox-actions" :class="position">
        <button
          class="combobox-actions-button"
          @click="checkShowDropDown = !checkShowDropDown"
        >
          <span
            class="background-icon-arrow-bottom icon-16"
            :class="{
              'background-icon-arrow-bottom-active': checkShowDropDown,
            }"
          >
          </span>
        </button>
      </div>

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
    <div
      class="dropdown-container"
      v-show="checkShowDropDown"
      :style="position + ': 34px'"
    >
      <div class="dropdown-items">
        <div
          class="dropdown-item loading"
          v-if="this.cbxListValues.length == 0"
        >
          <div>
            <div class="spiner"></div>
            <div>Đang lấy dữ liệu</div>
          </div>
        </div>
        <div class="dropdown-item" v-else>
          <base-button
            v-for="(cbxListValue, index) in cbxListValues"
            :key="cbxListValue.id"
            @clickButton="selectValueCombobox(cbxListValue)"
            listClass="button-combobox btn-pri"
            :tabindex="index"
            :value="cbxListValue.id"
            :class="{
              'button-active':
                checkFocusItemSearch == cbxListValue.id ||
                cbxListValue.id == cbxValue.id
                  ? true
                  : false,
            }"
            :text="cbxListValue.name"
          >
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NOTIFY_TEXT } from "../../js/constants";
export default {
  name: "BaseCombobox",
  emits: {
    // kiểm tra focus
    checkFocus: Boolean,

    // kiểm tra load dữ liệu
    checkLoadDataCombobox: Boolean,

    // lỗi trả về
    errorText: String,

    // giá trị id mới
    newValueId: String,

    // giá trị tên mới
    newValueName: String,
  },
  props: {
    // hiển thị input
    input: {
      Type: Boolean,
      default: true,
    },

    // Các giá trị có thể có
    listValues: Array[Object],

    // giá trị hiện tại
    value: {
      Type: Object,
      default: {
        id: null,
        name: null,
      },
    },

    // chiều rộng
    width: {
      Type: Number,
      default: 200,
    },

    // input có nhập được hay không
    disabled: Boolean,

    // top | bottom
    position: String,

    icon: {
      Type: Boolean,
      default: true,
    },

    //comboboxField
    comboboxField: {
      Type: String,
      default: null,
    },

    // kiểm tra có dấu * hay không
    iconRed: {
      Type: String,
      default: false,
    },

    // lỗi hiển thị
    errorText: String,

    // kiểm tra check required
    isRequired: Boolean,

    isValidate: Boolean,

    // kiểm tra có focus hay không
    checkFocus: Boolean,

    placeholder: {
      Type: String,
      default: null,
    },
  },
  data() {
    return {
      // danh sách giá trị hiển thị
      cbxListValues: [],

      // giá trị hiện tại
      cbxValue: {
        id: null,
        name: null,
      },

      // kiểm tra xem drop down có hiển thị hay không
      checkShowDropDown: false,

      // lấy 1 giá trị để focus đúng với giá trị gần nhất
      checkFocusItemSearch: -1,

      // checkload dữ liệu
      checkload: false,

      // lưu text lỗi
      currentErrorText: null,
    };
  },
  created() {
    // khởi tạo giá trị danh sách dropdown
    this.cbxListValues = this.listValues;

    // khởi tạo giá trị hiện tại
    this.cbxValue = this.value;
  },
  mounted() {
    /**
     * Author: Phạm Văn Đạt(31/10/2022)
     * Function: kiểm tra focus
     */
    if (this.checkFocus == true) {
      this.handlerFocus();
    }
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(31/10/2022)
     * Function: focus input
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
     * Author: Phạm Văn Đạt(20/10/2022)
     * Function: Xử lý lấy giá trị khi click item dropdown
     * @param {} el : element button
     */
    selectValueCombobox(el) {
      try {
        this.checkRequiredValue();

        this.cbxValue = el;
        // cập nhật lại item tìm kiếm
        this.checkFocusItemSearch = el.id;
        this.checkShowDropDown = false;

        this.$emit("newValueId", this.cbxValue.id);
        this.$emit("newValueName", this.cbxValue.name);
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * Author: Phạm Văn Đạt(20/10/2022)
     * Function: Xử lý ẩn DropDown
     */
    handlerHideDropdown() {
      this.checkShowDropDown = false;
    },

    /**
     * Author: Phạm Văn Đạt(20/10/2022)
     * Function: Xử lý tìm kiếm dữ liệu trong combobox
     * @param {*} event : lấy event khi bắt sự kiện
     */
    async handlerInput(event) {
      try {
        // lấy giá trị text trong input
        let text = event.target.value;
        this.$emit("newValueName", text);
        // khi tìm kiếm thì xóa dữ liệu cũ đi
        this.cbxValue = {
          id: null,
          name: text,
        };

        // xử lý lấy dữ liệu
        this.handlerFocusInput();

        this.hanlderSelectItemSearch(this, text);

        this.checkRequiredValue();
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đat(30/10/2022)
     * Funtction: Xử lý tìm kiếm dữ liệu khi nhập giá trị vào ô input
     */
    hanlderSelectItemSearch(me, text) {
      try {
        let currentIndexItem = -1;
        let numberCheck = -1;

        if (!text) {
          me.checkFocusItemSearch = -1;
        } else {
          //tìm kiếm giá trị gần nhất
          me.listValues.forEach((value) => {
            if (value) {
              // lấy vị trí xuất hiện đầu tiên của chuỗi con trong chuỗi cha
              let startNumber = value.name
                .toLowerCase()
                .indexOf(text.toLowerCase());
              let endNumber = value.name
                .toLowerCase()
                .lastIndexOf(text.toLowerCase());
              if (
                endNumber - startNumber > numberCheck &&
                startNumber != -1 &&
                endNumber != -1
              ) {
                numberCheck = endNumber - startNumber;
                currentIndexItem = value.id;
              }
            }
          });

          // cập nhật lại giá trị item hiện tại tìm thấy
          me.checkFocusItemSearch = currentIndexItem;
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Xử lý click lấy dữ liệu
     */
    selectListValueCombobox() {
      try {
        if (this.checkload == false) {
          this.$emit("checkLoadDataCombobox");
          this.checkload = true;
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(24/10/2022)
     * Function: Xử lý hiển thị dropdown khi focus vào input
     */
    handlerFocusInput() {
      try {
        this.checkShowDropDown = true;
        this.selectListValueCombobox();
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(30/10/2022)
     * Function: Xử lý lấy item dựa trên id truyền vào
     */
    selectItemById(id) {
      try {
        this.listValues.forEach((value) => {
          if (value?.id == id) {
            return value;
          }
        });
        return null;
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(30/10/2022)
     * Function: Xử lý validate dữ liệu
     */
    checkRequiredValue() {
      try {
        if (this.isValidate == true) {
          let check = true;

          // nếu tên không = null, kiểm tra nếu id không trùng giá trị => báo lỗi
          this.listValues.forEach((value) => {
            if (
              (value?.id == this.cbxValue.id &&
                value?.name == this.cbxValue.name) ||
              (!this.cbxValue.name && !this.cbxValue.id)
            ) {
              this.currentErrorText = null;
              this.$emit("errorText", null);
              check = false;
            }
          });
          if (check == true) {
            // nếu không có lỗi thì lấy lỗi dữ liệu không thỏa mãn
            this.currentErrorText = NOTIFY_TEXT.dataFail(this.comboboxField);
            this.$emit("errorText", this.currentErrorText);
          }
        }

        if (this.isRequired == true) {
          // nếu id và name rỗng thì hiển thị lỗi không được bỏ trống
          if (!this.cbxValue.id && !this.cbxValue.name) {
            this.currentErrorText = NOTIFY_TEXT.requiredField(
              this.comboboxField
            );

            this.$emit("errorText", this.currentErrorText);
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    /**
     * Author:  Phạm Văn Đạt(05/11/2022)
     * Function: Theo dõi thay đổi giá trị id combobox
     */
    value(value) {
      this.cbxValue = {id: value.id, name:value.name};
    },
    /**
     * Author: Phạm Văn Đạt(31/10/2022)
     * Function: Xử lý focus input
     */
    checkFocus(value) {
      if (value == true) {
        this.handlerFocus();
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
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Xử lý load dữ liệu
     */
    listValues(value) {
      this.cbxListValues = value;
    },
  },
};
</script>

<style>
@import url(BaseCombobox.css);
</style>
