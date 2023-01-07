
<!-- 
  Author: Phạm Văn Đạt(12/12/2022)
  Function: Basecombobox chọn nhiều
 -->

<template>
  <div
    class="combobox-multiple-container"
    :class="{ 'no-field-name': fieldName == null }"
    v-click-away="handlerHideDropdown"
  >
    <!-- start field name -->
    <div v-if="fieldName != null" class="input-container-field-label">
      {{ fieldName }}
    </div>
    <!-- end field name -->

    <!-- start content -->
    <div
      class="combobox-multiple-container-content"
      :class="{ 'input-container-content-error': currentErrorText }"
    >
      <!-- start input combobox -->
      <div class="combobox-multiple-container-content-input">
        <div
          v-for="item in currentItemValue"
          :key="item"
          class="combobox-multiple-container-content-item"
          :class="{ 'select-item-multiple': isMultiple }"
        >
          <!-- nếu chọn nhiều -->
          <span v-for="field in listField" :key="field">
            {{ field.view && isMultiple ? item[field.fieldName] : "" }}</span
          >
          <span
            v-if="isMultiple"
            class="background-icon-close-small w-h-16 flex"
            @click="deleteItemData(item)"
          ></span>
        </div>

        <!-- input chọn ít -->
        <base-input-text
          v-if="isMultiple"
          :placeholder="placeholder"
          v-model="valueInputMultiple"
          @focusout="handlerFocusOutInputMultiple"
          :checkFocus="focusInputMultiple"
          @checkFocus="focusInputMultiple = false"
        ></base-input-text>

        <!-- input chọn ít -->
        <base-input-text
          v-else
          ref="input"
          :placeholder="placeholder"
          v-model="valueInput"
          @focusout="handlerFocusOutInputOne"
          :checkFocus="focusInputOne"
          @checkFocus="focusInputOne = false"
        ></base-input-text>
      </div>
      <!-- end input combobox -->

      <!-- start input button -->
      <div
        class="combobox-multiple-container-content-actions"
        :class="position"
      >
        <base-button
          v-if="iconSum"
          @clickButton="clickIconSum"
          :height="height"
          listClass="button-white"
          classButtonIcon="background-icon-sum w-24 h-24 flex"
        ></base-button>

        <base-button
          :height="height"
          :class="{ 'dropdown-active': showDropDown }"
          @clickButton="loadData"
          listClass="button-white"
          classButtonIcon="background-icon-arrow-bottom w-24 h-24 flex"
        ></base-button>
      </div>
      <!-- end input combobox -->
    </div>
    <!-- end content -->

    <!-- start hiển thị lỗi nếu có -->
    <div class="input-container-error" v-show="currentErrorText ? true : false">
      <div></div>
      <div>
        <span>{{ currentErrorText }}</span>
      </div>
    </div>
    <!-- end hiển thị lỗi nếu có -->

    <!-- start dropdown -->
    <div
      v-show="showDropDown"
      @scroll="handlerscrollDropDown"
      class="combobox-multiple-dropdown"
      :class="position"
      :style="fieldName == null ? 'transform: translateY(-21px)' : ''"
    >
      <table>
        <thead v-show="isTHead">
          <tr>
            <th
              v-for="field in listField"
              :key="field"
              :class="field.class"
              :style="'width:' + field.width + 'px;' + field.style"
            >
              {{ field.name }}
            </th>
            <th style="width: 36px"></th>
          </tr>
        </thead>

        <!-- start hiển thị dữ liệu -->
        <tbody v-if="currentListData.length > 0 && !isNullData">
          <tr
            v-for="item in currentListData"
            :key="item"
            @click="itemDropdownTable(item, false)"
          >
            <td
              v-for="field in listField"
              :key="field.name"
              :style="'width:' + field.width + 'px;' + field.style"
            >
              {{ item[field.fieldName] }}
            </td>
            <td style="width: 36px">
              <span
                v-show="checkExistItemData(item)"
                class="background-checked flex w-h-16"
              ></span>
            </td>
          </tr>
        </tbody>
        <!-- end hiển thị dữ liệu -->

        <!-- start hiển thị loading -->
        <tbody v-else-if="!isNullData">
          <tr>
            <td rowspan="3" :colspan="listField.length">
              <div class="loading-combobox">
                <base-loading></base-loading>
              </div>
            </td>
          </tr>
        </tbody>
        <!-- end hiển thị loading -->

        <!-- hiển thị không có dữ liệu -->
        <tbody v-else>
          <tr>
            <td :rowspan="listField.length" :colspan="listField.length">
              <div class="table-null">
                <p>Không có dữ liệu hiển thị.</p>
              </div>
            </td>
          </tr>
        </tbody>
        <!-- end hiển thị không có dữ liệu -->
      </table>
      <!-- end dropdown -->
    </div>
  </div>
</template>

<script>
import { FIELDS_POSITION, NOTIFY_TEXT } from "../../js/constants";

export default {
  name: "BaseComboboxMultiple",
  props: {

    // xóa text input chọn 1
    deleteValueInput: {
      Type: Boolean,
      default: false
    },

    // kiểm tra có focus hay không
    checkFocus: {
      Type: Boolean,
      default: false,
    },

    // hiển thị thead
    isTHead: {
      Type: Boolean,
      default: true,
    },

    // nhắc nhở trong input
    placeholder: {
      Type: String,
      default: null,
    },

    // tên trường truyền vào
    fieldName: {
      Type: String,
      default: null,
    },

    // check hiển thị icon +
    iconSum: {
      Type: Boolean,
      default: false,
    },

    // các trường hiển thị trong combobox drop down
    listField: {
      Type: Array,
      default: [],
    },

    // dữ liệu gửi vào
    listData: {
      Type: Array,
      default: [],
    },

    // listDataFocus
    modelValue: {
      Type: Array,
      default: [],
    },

    // đưuọc chọn nhiều
    isMultiple: {
      Type: Boolean,
      default: true,
    },

    // chiều cao combobox mặc định
    height: {
      Type: Number,
      default: 32,
    },

    // vị trí hiển thị
    position: {
      Type: String,
      default: FIELDS_POSITION.Bottom,
    },
  },
  data() {
    return {
      // kiểm tra xóa item
      checkDeleteItem: false,

      // focus input chọn nhiều
      focusInputMultiple: false,

      // focus input chọn 1
      focusInputOne: false,

      // hiển thị lỗi
      currentErrorText: null,

      NOTIFY_TEXT,

      // hiển thị null dữ liệu
      isNullData: false,

      //  kiểm tra load lại dữ liệu sau khi thay đổi giá trị input
      checkLoadEmit: false,

      // tên trường hiển thị
      fieldNameView: null,

      // hien thi dropdown
      showDropDown: false,

      // value input chọn ít
      valueInput: null,

      // value input chọn nhiều
      valueInputMultiple: null,

      // giá trị hiển thị
      currentListData: [],

      //  mảng hiển thị dữ liệu
      currentModelValue: [],

      // item hiện tại hiển thị
      currentItemValue: [],

      // tên trường id
      fieldNameModel: null,

      // cho phép load lại dữ liệu chọn nhiều
      checkLoadDataMultiple: true,
    };
  },
  created() {
    // khởi tạo giá trị ban đầu
    this.currentListData = this.listData;

    // lấy tên trường dữ liệu id
    this.selectFieldNameModel();

    //lấy tên trường hiển thị
    this.selectFieldNameView();

    // lấy field hiển thị
    this.selectCurrentData(this.currentModelValue, false);

    //  cho phép tìm kiếm khi giá trị đưa vào đầu tiên khác null
    if (!this.modelValue) {
      this.checkLoadEmit = true;
    }
  },
  mounted() {
    /**
     * Author: Phạm Văn Đạt(23/12/2022)
     * Function: kiểm tra focus input chon
     */
    if (this.checkFocus == true) {
      this.handlerFocus();
    }
  },
  watch: {
    /**
     * Author: Phạm Văn Đạt(05/01/2022)
     * Function: Xử lý tìm kiếm combobox chọn nhiều
     * @param value: giá trị tìm kiếm input chọn nhiều
     */
    valueInputMultiple(value) {
      try {
        if (this.checkLoadDataMultiple == true) {
          // load lại data
          this.$emit("loadData", {
            checkLoad: true,
            keyword: value ? value : null,
          });

          // hiển thị dropdown
          this.showDropDown = true;

        }

        this.checkLoadDataMultiple = true;
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(31/10/2022)
     * Function: Xử lý focus input
     */
    checkFocus(value) {
      try {
        console.log("check focus: ", value);
        if (value == true) {
          this.handlerFocus();
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * Author: Phạm Văn Đạt(13/12/2022)
     * Function: Xử lý tìm kiếm giá trị
     */
    valueInput() {
      try {

        if (this.checkLoadEmit == true) {
          // load lại data
          this.$emit("loadData", {
            checkLoad: true,
            keyword: this.valueInput ? this.valueInput : null,
          });

          // nếu load lại data và giá trị input thay đổi => emit null nếu chọn it
          if (!this.isMultiple) {
            this.$emit("update:modelValue", null);
          }

          // hiển thị dropdown
          this.showDropDown = true;
        } else {
          this.checkLoadEmit = true;
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(18/12/2022)
     * Function: theo dõi giá trị mới đưa vào
     * @param {*} value :giá trị data truyền vào
     */
    listData(value) {
      try {
        this.currentListData = [...value];

        this.currentListData = [...new Set(this.currentListData)];
        // lấy item hiển thị
        if (value?.length > 0 && value?.length != undefined) {
          this.selectCurrentData(this.currentModelValue, this.checkLoadEmit);
          this.isNullData = false;
        } else {
          this.isNullData = true;
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(20/12/2022)
     * Function: theo dõi giá trị mới đưa vào
     * @param {*} value :giá trị data truyền vào
     */
    modelValue: {
      handler(value) {
        this.currentModelValue = value;
        this.selectCurrentData(value, false);
      },
      deep: true,
    },
  },
  methods: {
    /**
     * Author: Phạm văn Đạt(05/01/2022)
     * Function: Xử lý focus out input chọn nhiều
     */
    handlerFocusOutInputMultiple() {
      try {
        console.log("focus out input select multiple!");

        // nếu tồn tại text => trả về lỗi
        if (this.valueInputMultiple) {
          let nameError = this.fieldName ? this.fieldName : this.placeholder;
          this.currentErrorText = NOTIFY_TEXT.dataFail(nameError);
          this.$emit("errorText", this.currentErrorText);
          console.log(this.currentErrorText);
        } else {
          this.currentErrorText = null;
          this.$emit("errorText", this.currentErrorText);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(31/12/2022)
     * Function: xử lý focus out input chọn 1
     */
    handlerFocusOutInputOne() {
      try {
        // nếu như giá trị đưa vào là rỗng và giá trị input còn thì trả về lỗi
        if (
          (this.modelValue == null || this.modelValue?.length == 0) &&
          this.valueInput
        ) {
          // lây tên trường
          let nameError = this.fieldName ? this.fieldName : this.placeholder;
          this.currentErrorText = NOTIFY_TEXT.dataFail(nameError);
          this.$emit("errorText", this.currentErrorText);
          console.log(this.currentErrorText);
        } else {
          this.currentErrorText = null;
          this.$emit("errorText", this.currentErrorText);
        }

        // gửi focus false
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(23/12/2022)
     * Function: focus input
     */
    handlerFocus() {
      try {
        if (this.isMultiple) {
          this.focusInputMultiple = true;
        } else {
          this.focusInputOne = true;
        }

        this.$emit("checkFocus", false);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/12/2022)
     * Function: Lấy item hiển thị
     * @param {*} currentModelValue :  danh sách item hiện tại
     */
    selectCurrentData(currentModelValue, checkLoadEmit = true) {
      try {
        let arr = [];

        // // gán giá trị hiển thị
        if (this.isMultiple) {
          currentModelValue = [...this.modelValue];
        } else {
          currentModelValue = this.modelValue ? [this.modelValue] : [];
        }

        let arrOldcurrentItemValue = [];

        if (currentModelValue.length > 0) {
          arrOldcurrentItemValue = this.currentItemValue;
        }

        // lấy item hiển thị lên input
        // currentModelValue: mảng hiển thị dữ liệu
        // this.currentListData: dữ liệu đưa vào
        for (let i = 0; i < currentModelValue.length; i++) {
          for (let j = 0; j < this.currentListData.length; j++) {
            if (
              currentModelValue[i] ==
              this.currentListData[j][this.fieldNameModel]
            ) {
              arr = [...arr, this.currentListData[j]];
            }
          }
        }

        console.log(arr)

          // gán giá trị hiển thị
          if (this.checkDeleteItem == true) {
            this.currentItemValue = [...arr];
            this.checkDeleteItem = false;
          } else {

            if(this.isMultiple){
              // xử lý chọn nhiều
              this.currentItemValue = [...arr, ...arrOldcurrentItemValue];
            }else{

              // xử lý chọn 1
              this.currentItemValue = [...arr];
              console.log(this.deleteValueInput)
              if(this.deleteValueInput){
                this.valueInput = null;
                this.checkLoadEmit = false;
                this.$emit("deleteValueInput",false);
              } 
              
            }

            // xóa bỏ các phần tử trùng nhau
            this.currentItemValue = [...new Set(this.currentItemValue)];
          }
       

        // cho phép gửi emit load data hoặc không
        this.checkLoadEmit = checkLoadEmit;

        //  kiểm tra xem mảng đưa vào có giá trị không
        // kiểm tra load dữ liệu item
        // nếu măng lưu giá trị hiện tại tồn tại và dữ liệu ban đầu rỗng hoặc không
        //tìm thấy item trong listDAta => load lại dữ liệu
        if (currentModelValue.length > 0 && this.listData.length == 0) {
          if (this.checkLoadDataMultiple) {
            this.$emit("loadData", {
              checkLoad: true,
              keyword: null,
            });
          }
        }

        // xử lý lấy input chọn 1
        if (!this.isMultiple) {
          // lấy input hiển thị
          if (
            this.currentItemValue != [] &&
            this.currentItemValue[0] != undefined
          ) {
            // lấy input hiển thị
            this.valueInput = this.currentItemValue[0]
              ? this.currentItemValue[0][this.fieldNameView]
              : null;

            // không hiển thị dropdown
            this.checkLoadEmit = false;
          }
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(20/12/2022)
     * Function: lấy tên trường id
     */
    selectFieldNameModel() {
      try {
        let fieldName = this.listField.filter((l) => l.model == true);

        if (fieldName != []) {
          this.fieldNameModel = fieldName[0]?.fieldName;
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(20/12/2022)
     * Function: lấy tên trường hiển thị
     */
    selectFieldNameView() {
      try {
        let fieldName = this.listField.filter((l) => l.view == true);

        if (fieldName != []) {
          this.fieldNameView = fieldName[0]?.fieldName;
          console.log(this.fieldNameView);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(18/12/2022)
     * Function: Xử lý load dữ liệu
     */
    loadData() {
      try {
        this.showDropDown = !this.showDropDown;

        if (this.listData.length == 0) {
          this.$emit("loadData", {
            checkLoad: true,
            keyword: null,
          });
        } else {
          this.$emit("loadData", {
            checkLoad: false,
            keyword: null,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(17/12/2022)
     * Function: Xử lý load dữ liệu khi cuộn đến cuối trang
     * @param {*} event : Sự kiện scroll
     */
    handlerscrollDropDown(event) {
      try {
        let scrollHeight = event.target.scrollHeight;
        let scrollTop = event.target.scrollTop;
        let clientHeight = event.target.clientHeight;

        if (clientHeight + scrollTop >= scrollHeight) {
          this.$emit("loadData", {
            checkLoad: true,
            keyword: null,
          });
        } else {
          this.$emit("loadData", {
            checkLoad: false,
            keyword: null,
          });
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(14/12/2022)
     * Function: Xử lý click icon sum
     * @param {*} e : Sự kiện click
     */
    clickIconSum() {
      try {
        this.$emit("clickIconSum");
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(13/12/2022)
     * Function: Xử lý ẩn DropDown
     */
    handlerHideDropdown() {
      this.showDropDown = false;
    },

    /**
     * Author: Phạm Văn Đạt(12/12/2022)
     * Function: Xử lý click item
     * @param {*} item : thông tin dữ liệu vừa click
     */
    itemDropdownTable(item, checkLoadData) {
      try {
        //  tạo mảng lưu giá trị
        let arr = [];

        // xử lý chọn nhiều
        if (this.isMultiple == true) {
          // kiểm tra xem item vừa chọn đã chọn trước đó hay chưa
          let checkExistsItem = this.checkExistItemData(item);

          // nếu chưa chọn thì thêm vào
          if (checkExistsItem == false) {
            arr = [...this.modelValue, item[this.fieldNameModel]];
          } else {
            // nếu chọn rồi thì xóa đi

            this.deleteItemData(item);
            arr = [...this.modelValue];
          }

          this.checkLoadDataMultiple = false;
        } else {
          arr = item[this.fieldNameModel];

          // xử lý chọn 1
          this.showDropDown = false;
          this.checkLoadEmit = false;

          // lấy text hiển thị
          const result = this.listField.filter((l) => l.view == true);

          if (result) {
            this.valueInput = item[result[0].fieldName];
          }
        }

        console.log(arr)

        // lấy giá trị hiển thị
        this.selectCurrentData(arr, checkLoadData);

        if (this.isMultiple) {
          // chuyển input chọn nhiều thành null
          this.valueInputMultiple = null;

          // chặn loading chọn nhiều
          this.checkLoadDataMultiple = false;
        }

        this.$emit("update:modelValue", arr);

        // xóa lỗi
        this.currentErrorText = null;
        this.$emit("errorText", this.currentErrorText);

        console.log(arr);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(12/12/2022)
     * Function: Xử lý xóa item truyền vào
     * @param {*} item : giá trị item đưa vào
     */
    deleteItemData(item) {
      try {
        // chọn nhiều mới có chức năng này
        if (this.isMultiple == true) {
          let index = null;

          // kiểm tra phần tử nằm ở vị trí nào
          for (let i = 0; i < this.modelValue.length; i++) {
            if (item[this.fieldNameModel] == this.modelValue[i]) {
              index = i;
              break;
            }
          }

          console.log(index);

          // nếu tồn tại index tương tự với item thì xóa đi
          if (index != null) {
            let arrCurent = this.modelValue;

            // không thể thao tác trực tiếp với biến v-model => tạo biến trung gian
            arrCurent.splice(index, 1);

            this.checkDeleteItem = true;

            console.log(arrCurent);

            this.$emit("update:modelValue", arrCurent);
          }
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(12/12/2022)
     * Function: Xử lý kiểm tra item vừa click đã có trong list chưa
     * @param {*} item : giá trị item đưa vào
     */
    checkExistItemData(item) {
      try {
        if (this.modelValue) {
          let arr = [];
          if (typeof this.modelValue == "string") {
            arr = [this.modelValue];
          } else {
            arr = [...this.modelValue];
          }

          for (let i = 0; i < arr.length; i++) {
            if (item[this.fieldNameModel] == arr[i]) {
              return true;
            }
          }
        }

        return false;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
@import url(BaseComboboxMultiple.css);
</style>
