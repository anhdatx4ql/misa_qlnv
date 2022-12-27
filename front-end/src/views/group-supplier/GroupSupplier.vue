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
          @checkFocus="fieldFocusValidate.groupSupplierCode = false"
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
          :isMultiple="false"
          :listField="FIELDS_TABLE_COMBOBOX_SUPPLIERS_ONE"
          :listData="dataGroupSuppliers"
          v-model="currentGroupSupplier.parentGroupSupplierId"
          @loadData="loadGroupSupplier($event)"
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
            @clickButton="handlerUploadData(FUNCTION_UPLOAD.SaveAndInsert)"
          >
          </base-button>
          <base-button
            classButton="button-white"
            v-tooltip="'Cất(Ctrl + S)'"
            style="margin: 0 0.75rem"
            text="Cất"
            @clickButton="handlerUploadData(FUNCTION_UPLOAD.Save)"
          >
          </base-button>
        </div>

        <div class="form-buttom-left">
          <base-button
            classButton="button-white"
            text="Hủy"
            @focusout="handlerFocusForm()"
          >
          </base-button>
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
 * Function: nhúng các các hằng scurrentRulePaymentố
 */
import {
  groupSupplierModel,
  groupSuppliers,
} from "../../js/Controllers/GroupSuppliersController.js";

import { createGuid } from "../../js/GuidId.js";

import { lowerCaseFirst } from "../../js/FomatData.js";

import {
  FUNCTION_UPLOAD,
  FIELDS_TABLE_COMBOBOX_SUPPLIERS_ONE,
  NOTIFY_LIST,
  TEXT_TOAST_MESSAGE,
  FIELDS_GROUP_SUPPLIERS_REQUIRED,
  NOTIFY_TEXT,
  STATUS_CODES,
} from "../../js/constants";

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
      FIELDS_TABLE_COMBOBOX_SUPPLIERS_ONE,
      FUNCTION_UPLOAD,

      // danh sách nhà cung cấp, khách hàng
      dataGroupSuppliers: [],

      // các trường check focus
      fieldFocusValidate: {
        // mã nhóm khách hàng
        groupSupplierCode: true,

        // tên nhóm khách hàng
        groupSupplierName: false,
      },

      // thứ tự hiển thị lỗi
      numericalOrder: ["groupSupplierCode", "groupSupplierName"],

      // kiểm tra notify
      checkNotify: {
        isShow: false,
        type: null,
        text: null,
      },

      // mảng lưu các lỗi đã có: { field: String, message: String} : chứa object này
      listErrors: new Map(),

      NOTIFY_LIST,

      // khởi tạo đối tượng lưu giá trị của nhóm nhà cung cấp
      currentGroupSupplier: groupSupplierModel,

      // name field focus
      firstFocus: null,
    };
  },
  async created() {
    // lấy data của nhóm nhà cung cấp, khách hàng
    this.dataGroupSuppliers =
      groupSuppliers.currentData != undefined ? groupSuppliers.currentData : [];

    // await this.selectMaxCode();

    // lấy mã nhóm nhà cung cấp
    this.resetData();

    console.log(this.currentGroupSupplier);
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(26/12/2022)
     * Function: Xử lý load lại dữ liệu nhóm nhà cung cấp
     * @param {*} checkLoad : true | false
     */
    async loadGroupSupplier(checkLoad) {
      try {
        if (checkLoad) {
          if (this.dataGroupSuppliers.length > 0) {
            groupSuppliers.currentPageNumber++;
          }

          console.log("load nhóm khách hàng");

          if (this.dataGroupSuppliers.length <= groupSuppliers.totalCount) {
            await groupSuppliers.pagingGroupSupplier([]);

            if (groupSuppliers.currentData) {
              this.dataGroupSuppliers = [...groupSuppliers.currentData];
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(26/12/2022)
     * Function: Lấy mã code mới nhất
     */
    async selectMaxCode() {
      try {
        // hiển thị loading
        console.log("hiển thị loading");
        this.currentGroupSupplier.groupSupplierCode =
          await groupSuppliers.getMaxCode();

        // ẩn loading
        console.log("ẩn loading");
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(26/12/2022)
     * Function: XỬ lý focus vào lỗi đầu tiên nếu như có lỗi
     */
    checkFocusCloseNotify(value) {
      Object.keys(this.fieldFocusValidate).forEach((key) => {
        this.fieldFocusValidate[key] = false;
      });

      // chuyển trạng thái focus true ở lỗi đầu tiên
      this.fieldFocusValidate[value] = true;
    },

    /**
     * Author: Phạm Văn Đạt(23/12/2022)
     * Function: Xử lý focus out button hủy xoay vòng
     */
    handlerFocusForm() {
      try {
        this.fieldFocusValidate.groupSupplierCode = true;
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(22/12/2022)
     * Function: Xử lý validate dữ liệu khi click nút cất, cất và thêm
     */
    valiDateRequired() {
      try {
        // xử lý bấm nút cất, cất và thêm validate các lỗi required
        FIELDS_GROUP_SUPPLIERS_REQUIRED.forEach((value) => {
          // kiểm tra giá trị có null không
          if (!this.currentGroupSupplier[value.fielName]) {
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
        this.$emit("toastMessage", {
          textToastMessage: TEXT_TOAST_MESSAGE.Error.text,
          typeToastMessage: TEXT_TOAST_MESSAGE.Error.type,
        });
      }
    },

    /**
     * Author: Phạm Văn Đạt(28/10/2022)
     * Function: Xử lý upload dữ liệu
     */
    async handlerUploadData(functionUpload) {
      try {
        //xử lý validate
        this.valiDateRequired();

        console.log(this.listErrors);

        // nếu không có lỗi => thực hiện thêm hoặc update
        if (this.listErrors.size == 0) {
          // lấy guid mới
          this.currentGroupSupplier.groupSupplierID = createGuid();

          //gọi api thêm dữ liệu
          const result = await groupSuppliers.insertGroupSuppliers(
            this.currentGroupSupplier
          );

          // thêm mới || cập nhật thất bại
          if (result?.statusCode == STATUS_CODES.Code400) {
            if (result?.data) {
              this.handlerErrorUploadForm(result.data);
            }
          } else if (result?.statusCode == STATUS_CODES.Code201) {
            // hiển thị loading

            // thêm phần tử vào đầu mảng
            groupSuppliers.currentData = [
              this.currentGroupSupplier,
              ...groupSuppliers.currentData,
            ];
            groupSuppliers.totalCount++;
            this.dataGroupSuppliers = groupSuppliers.currentData;

            const item = this.currentGroupSupplier.groupSupplierID;

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
        console.log(e);
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
      this.currentGroupSupplier = {
        groupSupplierCode: null,
        groupSupplierName: null,
        parentGroupSupplierId: null,
        groupSupplierDescription: null,
      };
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
            this.$emit("toastMessage", {
              textToastMessage: data[keyResult][key],
              typeToastMessage:TEXT_TOAST_MESSAGE.Error.type,
            });
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
        // hiển thị lỗi
        this.$emit("toastMessage", {
          textToastMessage: TEXT_TOAST_MESSAGE.Error.text,
          typeToastMessage: TEXT_TOAST_MESSAGE.Error.type,
        });
      }
    },
  },
  watch: {},
};
</script>

<style scoped>
@import url(GroupSupplier.css);
</style>
