 <!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: base table hiển thị thông tin
  -->
<template>
  <div class="table-content">
    <table>
      <!-- start header table -->
      <thead>
        <tr>
          <th
            v-for="field in fieldsTHead"
            :key="field.fieldName"
            :class="field.class"
            :style="'width:' + field.width + 'px;' + field.style"
          >
            <div class="th-container">
              <div v-if="field.type == 'checkbox'">
                <base-input-checkbox :id="idCheckbox"></base-input-checkbox>
              </div>
              <div v-else-if="!field.title">
                {{ field.name }}
              </div>

              <el-tooltip
                v-else
                :content="field.title"
                effect="light"
                placement="bottom"
              >
                {{ field.name }}
              </el-tooltip>

              <div
                class="table-filter"
                v-if="isFilter && field.isField"
                @click="
                  handlerClickTableFilter(field.fieldName, field.typeFilter)
                "
                v-click-out-side="handlerClickAwayFilter"
              >
                <!-- start xử lý lọc theo dạng văn bản -->
                <div
                  v-if="field.typeFilter == TYPE_FILTER.Text"
                  class="filter-container"
                >
                  <div class="filter-icon">
                    <span class="background-icon-combobox-black w-14"></span>
                  </div>

                  <div
                    class="filter-content"
                    v-show="fieldNameFilter == field.fieldName"
                    :ref="field.fieldName"
                  >
                    <div class="filter-content-top">
                      <el-tooltip
                        v-if="field.title"
                        :content="field.title"
                        effect="light"
                        placement="bottom"
                      >
                        {{ field.nameFilter }}
                      </el-tooltip>
                      <span v-else>Lọc {{ field.nameFilter }}</span>

                      <base-combobox
                        :value="{
                          id: 5,
                          name: 'Chứa',
                        }"
                        :listValues="FIELDS_FILTER.Text"
                        @newValueId="
                          handlerCheckDisableInputFilter(
                            $event,
                            TYPE_FILTER.Text
                          )
                        "
                        @newValueName="itemFilter.name = $event"
                        position="top"
                      >
                      </base-combobox>
                    </div>

                    <div class="filter-content-center">
                      <base-input-text
                        :isFormatText="false"
                        :disabled="checkDisableInputFilter"
                        placeholder="Nhập giá trị lọc"
                        v-model="itemFilter.value"
                      ></base-input-text>
                    </div>
                    <div class="filter-content-bottom">
                      <base-button class="button-white">
                        <span>Bỏ lọc</span>
                      </base-button>
                      <base-button @click="handlerFilter">
                        <span>Lọc</span>
                      </base-button>
                    </div>
                  </div>
                </div>
                <!-- end xử lý lọc theo dạng văn bản -->

                <!-- start xử lý lọc theo dạng đúng sai -->
                <div v-else-if="field.typeFilter == TYPE_FILTER.Boolean"></div>
                <!-- end xử lý lọc theo dạng đúng sai -->

                <!-- start xử lý lọc theo dạng ngày tháng -->
                <div v-else-if="field.typeFilter == TYPE_FILTER.Datetime"></div>
                <!-- end xử lý lọc theo dạng ngày tháng -->

                <!-- start xử lý lọc theo dạng giới itnhs -->
                <div v-else-if="field.typeFilter == TYPE_FILTER.Gender"></div>
                <!-- end xử lý lọc theo dạng giới itnhs -->
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <!-- end header table -->

      <!-- start body table -->
      <tbody v-show="!currentShowFormLoad">
        <tr
          v-for="data in listData"
          :key="data.id"
          @dblclick="handlerUpdate(data)"
        >
          <td
            class="table-hover"
            v-for="field in fieldsTHead"
            :key="field.fieldName"
            :style="'width:' + field.width + 'px;' + field.style"
            :class="field.class"
          >
            <base-button
              v-if="field.button == 'Sửa'"
              @click="handlerUpdate(data)"
              ><span>{{ field.button }}</span></base-button
            >
            <base-combobox
              v-if="!!field.combobox"
              :listValues="field.combobox"
              :input="field.inputCombobox"
              :icon="field.iconCombobox"
              :position="field.positionCombobox"
              :width="120"
              @newValueId="handlerFunctionTable($event, data)"
            >
            </base-combobox>

            <!-- hiển thị checkbox có thể sửa -->
            <!-- start hiển thị ô checkbox không thể sửa -->
            <div v-if="field.checkBox == true">
              <base-input-checkbox
                :value="data.id"
                :checked="data[field.fieldName]"
                :disabled="field.disabled"
              >
              </base-input-checkbox>
            </div>
            <!-- end hiển thị ô checkbox -->

            <!-- start hiển thị các dữ liệu còn lại -->
            <div v-else>
              {{
                data[field.fieldName] || data[field.fieldName] == 0
                  ? field.formatDate
                    ? field.formatDate(data[field.fieldName])
                    : field.formatGender
                    ? field.formatGender(data[field.fieldName])
                    : data[field.fieldName]
                  : ""
              }}
            </div>
          </td>
        </tr>
      </tbody>
      <!-- end body table -->
    </table>

    <div v-show="currentShowFormLoad" class="loading">
      <div>
        <div class="spiner"></div>
        <div>Đang lấy dữ liệu</div>
      </div>
    </div>
  </div>
</template>

<script>
import { FIELDS_FILTER, TYPE_FILTER } from "../../js/constants.js";
import clickOutSide from "@mahdikhashan/vue3-click-outside";
export default {
  name: "BaseTable",
  directives: {
    clickOutSide,
  },
  props: {
    // DỮ LIỆU HIỂN THỊ
    modelValue: Array[Object],

    // KIỂM TRA LOAD DỮ LIỆU
    showFormLoad: {
      Type: Boolean,
      default: true,
    },

    // CÁC TRƯỜNG TRÊN HEADER
    fieldsTHead: Array[Object],

    // check chức năng lọc
    isFilter: {
      Type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // kiểm tra đang
      currentShowFormLoad: false,

      // mảng lưu dữ liệu
      listData: Array[Object],

      // các trường hiển thị tên của bộ lọc
      FIELDS_FILTER,

      // các kiểu lọc dữ liệu
      TYPE_FILTER,

      // kiểm tra hiển thị lọc
      fieldNameFilter: null,

      // kiểm tra input ở lọc có được nhập hay không
      checkDisableInputFilter: false,

      // model item lọc
      itemFilter: {
        name: null,
        operator: null,
        value: null,
      },
    };
  },
  created() {
    this.currentShowFormLoad = this.showFormLoad;
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(11/11/2022)
     * Function: Xử lý lọc
     */
    handlerFilter() {
      try {
        console.log(this.itemFilter);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(11/11/2022)
     * Function: Xử lý disable input của lọc
     * @param {*} value : giá trị id trả về của filter từ combobox
     */
    handlerCheckDisableInputFilter(value, type) {
      try {
        console.log(value, type);

        let item = this.selectItemFilter(type, value);

        // kiểm tra xem item đó có cho phép nhập vào input hay không
        if (item.isDisableInput) {
          this.checkDisableInputFilter = true;
        } else {
          this.checkDisableInputFilter = false;
        }
        this.itemFilter = item;
        console.log(this.itemFilter);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(11/11/2022)
     * Function: Lấy item lọc
     * @param {*} type : kiểu lọc
     * @param {*} id : giá trị id của kiểu lọc đó
     * @returns: trả về item của field lọc
     */
    selectItemFilter(type, id) {
      for (let i = 0; i < FIELDS_FILTER[type].length; i++) {
        if (FIELDS_FILTER[type][i]?.id == id) {
          return FIELDS_FILTER[type][i];
        }
      }
    },

    /**
     * Author: Phạm Văn Đạt(10/11/2022)
     * Function: Xử lý click ẩn form lọc
     */
    handlerClickAwayFilter() {
      try {
        console.log("click away");
        // this.checkShowFilter = false;
        // this.$refs[fieldName]?console.log(this.$refs[fieldName][0].style.display):'';
        // this.$refs[this.fieldNameFilter]?this.$refs[this.fieldNameFilter][0].style.display= 'none':'';
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * Author: Phạm Văn Đạt(10/11/2022)
     * Function: Xử lý click hiểns filter
     */
    handlerShowFilter(fieldName) {
      this.$refs[fieldName]
        ? (this.$refs[fieldName][0].style.display = "inline-block")
        : "";
      this.fieldNameFilter = fieldName;
    },

    /**
     * Author: Phạm Văn Đạt(03/11/2022)
     * Function: Xuywr lý xóa, nhân bản, ngưng sử dụng
     * @param {} value : giá trị xử lý nhân bản, xóa, ngưng sử dụng
     */
    async handlerFunctionTable(value, data) {
      try {
        if (data.id != null) {
          // đưa ra chức năng cần xử lý của table: Nhân bản, Xóa, Sửa
          this.$emit("functionTable", { value: value, data: data });

          // nếu là xóa thì hiển thị thông báo xem có được xóa không
        }
      } catch (e) {
        console.log(e);
      }
    },
    /**
     * Author: Phạm Văn Đạt(22/10/2022)
     * Function: Xử lý khi click nút sửa
     */
    handlerUpdate(data) {
      this.$emit("dataDetail", data);
      this.$emit("checkShowForm", true);
    },

    handlerClickTableFilter(fieldName, typeFilter) {
      try {
        this.fieldNameFilter = fieldName;
        if (typeFilter == TYPE_FILTER.Text) {
          this.itemFilter = {id:FIELDS_FILTER.Text[4].id, name: FIELDS_FILTER.Text[4].name, operator: FIELDS_FILTER.Text[4].operator, value: null };
        }else if(typeFilter == TYPE_FILTER.Boolean){
          this.itemFilter = {id:FIELDS_FILTER.Boolean[4].id, name: FIELDS_FILTER.Boolean[0].name, operator: FIELDS_FILTER.Boolean[0].operator, value: FIELDS_FILTER.Boolean[0].value };
        }else if(typeFilter == TYPE_FILTER.DateTime){
          this.itemFilter = {id:FIELDS_FILTER.DateTime[4].id, name: FIELDS_FILTER.DateTime[0].name, operator: FIELDS_FILTER.DateTime[0].operator, value: null };
        }else if(typeFilter == TYPE_FILTER.Gender){
          this.itemFilter = {name: null, operator: '=', value: null };
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    /**
     * Author: Phạm Văn Đạt(08/11/2022)
     * Function: Xử lý lấy dữ liệu mới
     * @param {*} value : mảng data gửi vào
     */
    modelValue(value) {
      this.listData = value;
    },

    /**
     * Author: Phạm Văn Đạt(28/10/2022)
     * Function: Xử lý hiển thị load dữ liệu
     */
    showFormLoad(value) {
      this.currentShowFormLoad = value;
    },
  },
};
</script>

<style scoped>
@import url(BaseTable.css);
</style>
