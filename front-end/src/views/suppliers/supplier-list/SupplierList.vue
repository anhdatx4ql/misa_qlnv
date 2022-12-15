
<!-- 
  Author: Phạm Văn Đạt
  Function: màn hình nhà cung cấp
 -->

<template>
  <div class="content">
    <!-- start header ,điều hướng thêm -->
    <div class="content-header">
      <div class="content-header-left">
        <p>Danh sách nhà cung cấp</p>
      </div>
      <div class="content-header-right">
        <div class="content-header-right-button">
          <base-button @clickButton="checkShowForm = true" text="Thêm mới nhà cung cấp">
          </base-button>
        </div>
      </div>
    </div>
    <!-- end header ,điều hướng thêm -->

    <div class="content-center-filter">
      <div class="content-center-header-items">
        <div class="content-center-header-item">
          <div>
            <span>0,00</span>
            <span class="background-icon-filter"></span>
          </div>
          <div>Nợ quá hạn</div>
        </div>

        <div class="content-center-header-item">
          <div>
            <span>28.808.490.649,71</span>
            <span class="background-icon-filter"></span>
          </div>
          <div>Tổng nợ phải trả</div>
        </div>

        <div class="content-center-header-item">
          <div>
            <span>0,00</span>
            <span class="background-icon-filter"></span>
          </div>
          <div>Đã thanh toán(30 ngày gần đây)</div>
        </div>
      </div>
    </div>

    <div class="content-center-top-table">
      <!-- start content top -->
      <div class="content-center-center-top">
        <div class="content-center-center-top-left">
          <div class="content-center-center-top-left-child">
            <div class="content-center-center-top-left-child handler-data">
              <base-button
                listClass="btn-secondary"
                text="Thực hiện hàng loạt"
                :listDropDown="fieldBatchExecution"
                :iconDropDown="true"
              >
              </base-button>

              <base-button
                listClass="btn-secondary"
                text="Lọc"
                :iconDropDown="true"
              >
              </base-button>
            </div>
          </div>
        </div>

        <div class="content-center-center-top-right">
          <base-input-text
            placeholder="Nhập từ khóa tìm kiếm"
            classIcon="input-icon-search"
            :isFormatText="false"
          >
          </base-input-text>

          <base-button
            v-tooltip="'Lấy lại dữ liệu'"
            listClass="background-unset"
            :disable="disableButtonResetData"
            classButtonIcon="background-icon-reload icon-24 background-flex"
          >
          </base-button>

          <base-button
            v-tooltip="'Xuất ra Excel'"
            @click="handlerExportExcel"
            classButtonIcon="background-icon-excel icon-24 background-flex"
          >
          </base-button>
        </div>
      </div>
      <!-- end content top -->
    </div>

    <div class="content-center-table">
      <!-- startt content table -->
      <base-table :fieldsTHead="fieldsTHead" :isFilter="true"></base-table>
      <!-- end content table -->
    </div>

    <div class="content-bottom">
      <!-- start paging -->
      <base-paging totalCount="0" currentPage="1"></base-paging>
      <!-- end paging -->
    </div>

    <!-- start thông tin chi tiết nhà cung cấp  -->
    <supplier-detail
      v-if="checkShowForm"
      :title="titleForm.View"
      @closeForm="checkShowForm = $event"
    ></supplier-detail>
    <!-- end thông tin chi tiết nhà cung cấp -->
  </div>
</template>

<script>
import {
  LIST_CASH_TAB,
  SUPPLIER_FIELDS,
  BatchExecution,
  RULE_FORM_SUPPLIER_DETAIL,
} from "../../../js/constants.js";

import SupplierDetail from "../supplier-detail/SupplierDetail.vue";

export default {
  name: "SupplierList",
  components: {
    SupplierDetail,
  },
  props: {},
  data() {
    return {
      // các trường hiển thị thông tin table
      tableField: LIST_CASH_TAB,

      // mảng lưu giá trị lọc
      listFilter: new Map(),

      // các trường trong header table
      fieldsTHead: SUPPLIER_FIELDS,

      // kiểm tra hiển thị drop down của thực hiện hàng loạt
      checkShowDropdownHandlerMultiple: false,

      // thực hiện hàng loạt
      fieldBatchExecution: BatchExecution,

      // title Form
      titleForm: RULE_FORM_SUPPLIER_DETAIL,

      // kiểm tra ẩn, hiện form chi tiết
      checkShowForm: false
    };
  },
  created() {
    console.log(this.tableField);
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(08/12/2022)
     * Function: Xử lý click ẩn dropdown
     */
    handlerClick() {
      if (this.checkShowDropdownHandlerMultiple == true) {
        this.checkShowDropdownHandlerMultiple = false;
      }
    },
  },
};
</script>

<style scoped>
@import url(SupplierList.css);
</style>
