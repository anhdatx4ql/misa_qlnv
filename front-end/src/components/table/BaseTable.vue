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
                <base-input-checkbox
                  id="idCheckboxHeader"
                  @checked="handlerChecked($event, listData)"
                  :checked="isCheckedCheckboxHeader"
                ></base-input-checkbox>
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
                    :ref="field.fieldName"
                    :class="{
                      'filter-content-check-show':
                        fieldNameFilter == field.fieldName,
                    }"
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
                            TYPE_FILTER.Text,
                            field.filter
                          )
                        "
                        :disabled="true"
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
                        v-model="field.filter.value"
                      ></base-input-text>
                    </div>
                    <div class="filter-content-bottom">
                      <base-button
                        class="button-white filter-content-bottom-button"
                        @click="
                          handlerRemoveFilterItem(
                            field.filter,
                            field.typeFilter,
                            field.fieldName
                          )
                        "
                      >
                        <span>Bỏ lọc</span>
                      </base-button>
                      <base-button
                        class="filter-content-bottom-button"
                        @click="
                          handlerFilter(
                            field.fieldName,
                            TYPE_FILTER.Text,
                            field.filter,
                            field.nameFilter
                          )
                        "
                      >
                        <span>Lọc</span>
                      </base-button>
                    </div>
                  </div>
                </div>
                <!-- end xử lý lọc theo dạng văn bản -->

                <!-- start xử lý lọc theo dạng đúng sai -->
                <div
                  v-else-if="field.typeFilter == TYPE_FILTER.Boolean"
                  class="filter-container"
                >
                  <div class="filter-icon">
                    <span class="background-icon-combobox-black w-14"></span>
                  </div>

                  <div
                    class="filter-content"
                    :ref="field.fieldName"
                    :class="{
                      'filter-content-check-show':
                        fieldNameFilter == field.fieldName,
                    }"
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
                    </div>

                    <div class="filter-content-bottom">
                      <base-button
                        class="button-white filter-content-bottom-button"
                        @click="
                          handlerRemoveFilterItem(
                            field.filter,
                            field.typeFilter,
                            field.fieldName
                          )
                        "
                      >
                        <span>Bỏ lọc</span>
                      </base-button>
                      <base-button
                        class="filter-content-bottom-button"
                        @click="
                          handlerFilter(field.fieldName, field.nameFilter)
                        "
                      >
                        <span>Lọc</span>
                      </base-button>
                    </div>
                  </div>
                </div>
                <!-- end xử lý lọc theo dạng đúng sai -->

                <!-- start xử lý lọc theo dạng ngày tháng -->
                <div
                  v-if="field.typeFilter == TYPE_FILTER.DateTime"
                  class="filter-container"
                >
                  <div class="filter-icon">
                    <span class="background-icon-combobox-black w-14"></span>
                  </div>

                  <div
                    class="filter-content"
                    :ref="field.fieldName"
                    :class="{
                      'filter-content-check-show':
                        fieldNameFilter == field.fieldName,
                    }"
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
                          id: 1,
                          name: 'Bằng',
                        }"
                        :listValues="FIELDS_FILTER.DateTime"
                        @newValueId="
                          handlerCheckDisableInputFilter(
                            $event,
                            TYPE_FILTER.DateTime,
                            field.filter
                          )
                        "
                        :disabled="true"
                        @newValueName="itemFilter.name = $event"
                        position="top"
                      >
                      </base-combobox>
                    </div>

                    <div class="filter-content-center">
                      <el-config-provider :locale="locale">
                        <el-date-picker
                          :disabled="FIELDS_FILTER.DateTime.isDisableInput"
                          v-model="field.filter.value"
                          type="date"
                          placeholder="DD/MM/YYY"
                          format="DD/MM/YYYY"
                        />
                      </el-config-provider>
                    </div>
                    <div class="filter-content-bottom">
                      <base-button
                        class="button-white filter-content-bottom-button"
                        @click="
                          handlerRemoveFilterItem(
                            field.filter,
                            field.typeFilter,
                            field.fieldName
                          )
                        "
                      >
                        <span>Bỏ lọc</span>
                      </base-button>
                      <base-button
                        class="filter-content-bottom-button"
                        @click="
                          handlerFilter(
                            field.fieldName,
                            TYPE_FILTER.DateTime,
                            field.filter,
                            field.nameFilter
                          )
                        "
                      >
                        <span>Lọc</span>
                      </base-button>
                    </div>
                  </div>
                </div>
                <!-- end xử lý lọc theo dạng ngày tháng -->

                <!-- start xử lý lọc theo dạng giới itnhs -->
                <div
                  v-else-if="field.typeFilter == TYPE_FILTER.Gender"
                  class="filter-container"
                >
                  <div class="filter-icon">
                    <span class="background-icon-combobox-black w-14"></span>
                  </div>

                  <div
                    class="filter-content"
                    :ref="field.fieldName"
                    :class="{
                      'filter-content-check-show':
                        fieldNameFilter == field.fieldName,
                    }"
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
                    </div>

                    <div class="filter-content-center">
                      <base-combobox
                        :value="{
                          id: field.filter.value,
                          name: field.filter.name,
                        }"
                        :listValues="GENDERS"
                        @newValueId="
                          handlerCheckDisableInputFilter(
                            $event,
                            field.typeFilter,
                            field.filter
                          )
                        "
                        @newValueName="field.filter.name = $event"
                        :disabled="true"
                        placeholder="Nhập giá trị lọc"
                        position="top"
                      >
                      </base-combobox>
                    </div>
                    <div class="filter-content-bottom">
                      <base-button
                        class="button-white filter-content-bottom-button"
                        @click="
                          handlerRemoveFilterItem(
                            field.filter,
                            field.typeFilter,
                            field.fieldName
                          )
                        "
                      >
                        <span>Bỏ lọc</span>
                      </base-button>
                      <base-button
                        class="filter-content-bottom-button"
                        @click="
                          handlerFilter(
                            field.fieldName,
                            field.typeFilter,
                            field.filter,
                            field.nameFilter
                          )
                        "
                      >
                        <span>Lọc</span>
                      </base-button>
                    </div>
                  </div>
                </div>
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
            <div v-if="field.checkBox == true || field.checkBoxDisable == true">
              <base-input-checkbox
                :value="data.id"
                :checked="(field.checkBox == true)?listIdData.indexOf(data.id) > -1 ? true : false:data[field.fieldName]"
                :disabled="field.disabled"
                @checked="handlerChecked($event, [data])"
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
       <div class="spinner-4"></div>
        <div>Đang lấy dữ liệu</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  FIELDS_FILTER,
  TYPE_FILTER,
  GENDERS,
  FIELDS_FILTER_NOT_VALUE,
} from "../../js/constants.js";
import vi from "../../../node_modules/element-plus/es/locale/lang/vi";
import clickOutSide from "@mahdikhashan/vue3-click-outside";
export default {
  name: "BaseTable",
  directives: {
    clickOutSide,
  },
  setup() {
    return {
      locale: vi,
    };
  },
  props: {
    // dữ liệu lọc
    listDeleteFilterData: Array,

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

    // dữ liệu lọc
    dataFilter: Map,

    // list id nhan viên
    listIdDataIn: Array,
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

      // giới tính
      GENDERS,

      // mảng lưu giá trị lọc
      listFilter: new Map(),

      // kiểm tra reset giá trị lọc
      currentFillter: {
        id: null,
        type: null,
      },

      // các filter có giá trị null
      FIELDS_FILTER_NOT_VALUE,

      // mảng lưu các giá trị checked của data
      listIdData: [],

      // id item đầu tiên của mảng
      isCheckedCheckboxHeader: false,
    };
  },
  created() {
    this.currentShowFormLoad = this.showFormLoad;
    this.listIdData = this.listIdDataIn;
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(22/11/2022)
     * FUnction: Xử lý lấy list lưu id nhân viên
     * @param {*} value : giá trị checked
     */
    handlerChecked(value, data) {
      try {
        if (value) {
          // xử lý thêm dữ liệu vào mảng
          for (let i = 0; i < data.length; i++) {
            if (this.listIdData.indexOf(data[i].id) == -1)
              this.listIdData.push(data[i].id);
          }
        } else {
          for (let i = 0; i < data.length; i++) {
            // xử lý xóa dữ liệu khỏi mảng
            let index = this.listIdData.indexOf(data[i].id);
            if (index > -1) {
              this.listIdData.splice(index, 1);
            }
          }
        }
        console.log(this.listIdData);

        this.$emit("listIdData", this.listIdData);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/11/2022)
     * Function: Xử lý bỏ lọc
     * @param {*} filterItem : item lọc cần xóa
     * @param {*} type : kiểu item lọc
     * @param {*} fieldName : tên item lọc
     */
    handlerRemoveFilterItem(filterItem, type, fieldName) {
      try {
        console.log(this.listFilter);

        this.resetValueFilterItem(type, filterItem);

        // Xóa item có tên trong mảng lọc
        if (this.listFilter.has(fieldName)) {
          this.listFilter.delete(fieldName);
          this.$emit("listFilter", this.listFilter);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/11/2022)
     * Function: trả về giá trị lọc ban đầu
     * @param {*} type : kiểu lọc của item
     * @param {*} filterItem : item lọc
     */
    resetValueFilterItem(type, filterItem) {
      // set lại giá trị mặc định cho item
      if (type == TYPE_FILTER.Text) {
        filterItem.value = null;

        filterItem.operator = "like";
      } else if (type == TYPE_FILTER.Gender) {
        filterItem.value = null;

        filterItem.operator = "=";

        filterItem.name = null;
      } else if (type == TYPE_FILTER.Boolean) {
        console.log(type);
      } else if (type == TYPE_FILTER.DateTime) {
        filterItem.value = null;

        filterItem.operator = "=";
      }
    },

    /**
     * Author: Phạm Văn Đạt(11/11/2022)
     * Function: Xử lý lọc
     */
    handlerFilter(fieldName, type, filterItem, nameFilter) {
      try {
        // lấy ra id hiện tại của item filter
        if (this.currentFillter.id == null) {
          this.currentFillter.id = this.itemFilter.id;
        }

        if (type == TYPE_FILTER.Gender) {
          let item = this.selectItemFilter(type, filterItem.value);

          if (item) {
            this.listFilter.set(fieldName, {
              operator: filterItem.operator,
              value: filterItem.value,
              text: nameFilter + ": " + item.name,
              typeOperator: item.fieldName,
            });
          }
        } else {
          let item = this.selectItemFilter(type, this.currentFillter.id);

          filterItem.value = filterItem.value ? filterItem.value : "";

          const checkItem = FIELDS_FILTER_NOT_VALUE.filter((value) => {
            return value == item.operator;
          });

          if (checkItem.length > 0) {
            filterItem.value = "";
            this.listFilter.set(fieldName, {
              operator: filterItem.operator,
              value: item.value(filterItem.value),
              text:
                nameFilter +
                " " +
                item.name +
                ' "' +
                item.value(filterItem.value) +
                '"',
              typeOperator: item.fieldName,
            });
          } else {
            if (!filterItem.value) {
              // nếu giá trị null thì xóa đi
              this.listFilter.delete(fieldName);
            } else {
              let text = "";

              if (type == TYPE_FILTER.Text) {
                // nếu có giá trị thì thêm mới hoặc update
                text = nameFilter + " " + item.name + " " + filterItem.value;
              } else if (type == TYPE_FILTER.DateTime) {
                // lấy giá trị ngày tháng
                text =
                  nameFilter +
                  " " +
                  item.name +
                  ' "' +
                  item.value(filterItem.value) +
                  '"';
              }
              this.listFilter.set(fieldName, {
                operator: item.operator,
                value: item.value(filterItem.value),
                text: text,
                typeOperator: item.fieldName,
              });
            }
          }
        }

        this.$emit("listFilter", this.listFilter);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(11/11/2022)
     * Function: Xử lý disable input của lọc
     * @param {*} value : giá trị id trả về của filter từ combobox
     */
    handlerCheckDisableInputFilter(value, type, filterItem) {
      try {
        let item;

        // xử lý kiểu lọc là giới tính
        if (type == TYPE_FILTER.Gender) {
          filterItem.value = value;
          filterItem.operator = "=";
        } else {
          item = this.selectItemFilter(type, value);
          filterItem.operator = item.operator;
        }

        // kiểm tra xem item đó có cho phép nhập vào input hay không
        if (item) {
          if (item.isDisableInput) {
            this.checkDisableInputFilter = true;
          } else {
            this.checkDisableInputFilter = false;
          }

          this.currentFillter.id = item.id;
          this.currentFillter.type = type;
        }
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
     * @param{*} event : el vừa click
     */
    handlerClickAwayFilter(event) {
      try {
        // lấy el vừa click vào
        let elClick = event.target;

        // lấy el hiển thị form lọc
        let el = this.$refs[this.fieldNameFilter];

        // check xem el vừa click vào nằm ở trong hay ngoài form lọc
        while (
          !elClick?.classList.contains("th-container") &&
          !elClick?.classList.contains("table-filter") &&
          !(
            elClick?.getAttribute("id") == "app" &&
            !elClick?.classList.contains("el-popper is-pure")
          ) &&
          !elClick?.classList.contains("filter-content-bottom-button")
        ) {
          elClick = elClick.parentNode;
        }

        // xử lý hiển thị, ẩn form
        if (el) {
          if (elClick?.classList.contains("table-filter")) {
            if (!el[0].classList.contains("filter-content-check-show")) {
              el[0].classList.add("filter-content-check-show");
            }
          } else {
            if (el[0].classList.contains("filter-content-check-show"))
              el[0].classList.remove("filter-content-check-show");
          }
        }
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

    /**
     * Author: Phạm Văn Đạt(15/11/2022)
     * Function: Xử lý click thanh lọc
     */
    handlerClickTableFilter(fieldName, typeFilter) {
      try {
        this.fieldNameFilter = fieldName;

        if (typeFilter == TYPE_FILTER.Text) {
          this.itemFilter = {
            id: FIELDS_FILTER.Text[4].id,
            name: FIELDS_FILTER.Text[4].name,
            operator: FIELDS_FILTER.Text[4].operator,
            value: null,
          };
        } else if (typeFilter == TYPE_FILTER.Boolean) {
          this.itemFilter = {
            id: FIELDS_FILTER.Boolean[4].id,
            name: FIELDS_FILTER.Boolean[0].name,
            operator: FIELDS_FILTER.Boolean[0].operator,
            value: FIELDS_FILTER.Boolean[0].value,
          };
        } else if (typeFilter == TYPE_FILTER.DateTime) {
          this.itemFilter = {
            id: FIELDS_FILTER.DateTime[4].id,
            name: FIELDS_FILTER.DateTime[0].name,
            operator: FIELDS_FILTER.DateTime[0].operator,
            value: null,
          };
        } else if (typeFilter == TYPE_FILTER.Gender) {
          this.itemFilter = { name: null, operator: "=", value: null };
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    /**
     * Author: Phạm Văn Đạt(22/11/2022)
     * Function: Xử lý lấy id khách hàng
     * @param {*} value : giá trị id khách hàng
     */
    listIdDataIn(value) {
      if (value) {
        this.listIdData = this.listIdDataIn;
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/11/2022)
     * Function: Theo dõi mảng xóa dữ liệu lọc
     * @param {*} value : giá trị dùng để xóa dữ liệu lọc
     */
    listDeleteFilterData(value) {
      try {
        if (value) {
          // nếu có giá trị nằm trong mảng thì xóa đi
          for (let i = 0; i < value.length; i++) {
            if (this.listFilter.has(value[i])) {
              console.log(value[i]);

              this.listFilter.delete(value[i]);

              // reset dữ liệu item đã xóa
              for (const property in this.fieldsTHead) {
                if (this.fieldsTHead[property].fieldName == value[i]) {
                  this.resetValueFilterItem(
                    this.fieldsTHead[property].typeFilter,
                    this.fieldsTHead[property].filter
                  );
                }
              }
            }
          }

          this.$emit("listFilter", this.listFilter);

          console.log(this.listDeleteFilterData);

          this.$emit("listDeleteFilterData", null);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(08/11/2022)
     * Function: Xử lý lấy dữ liệu mới
     * @param {*} value : mảng data gửi vào
     */
    modelValue(value) {
      this.listData = value;
      console.log(value)
      if (value.length >0) {
        if (
          this.listIdData.indexOf(value[0].id) > -1 &&
          this.listIdData.length == value.length
        ) {
          this.isCheckedCheckboxHeader = true;
        }else {
        this.isCheckedCheckboxHeader = false;
      }
      } else {
        this.isCheckedCheckboxHeader = false;
      }
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
