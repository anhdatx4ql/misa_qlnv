
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
          <base-button
            @clickButton="checkShowForm = true"
            text="Thêm mới nhà cung cấp"
          >
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
      <base-table
        :fieldsTHead="fieldsTHead"
        :showFormLoad="checkFormLoad"
        v-model="listData"
        :isFilter="true"
        :listIdDataIn="listIdSuppliers"
      ></base-table>
      <!-- end content table -->
    </div>

    <div class="content-bottom">
      <!-- start paging -->
      <base-paging
        :totalCount="totalCount"
        @pageSize="pageSize = $event"
        @currentPage="currentPage = $event"
        :currentPage="currentPage"
      ></base-paging>
      <!-- end paging -->
    </div>

    <!-- start thông tin chi tiết nhà cung cấp  -->
    <supplier-detail
      v-if="checkShowForm"
      :title="titleForm.View"
      @closeForm="checkShowForm = $event"
    ></supplier-detail>
    <!-- end thông tin chi tiết nhà cung cấp -->

    <!-- start thông báo -->
    <base-notify
      @closeForm="handlerCloseNotifi"
      @checkShowNotify="checkNotify.isShow = $event"
      v-if="checkNotify.isShow"
      :type="checkNotify.type"
      :text="checkNotify.text"
      @sayYes="$event == true ? handlerDeleteEmployee() : ''"
    ></base-notify>
    <!-- end thông báo -->
  </div>
</template>

<script>
import {
  LIST_CASH_TAB,
  SUPPLIER_FIELDS,
  BatchExecution,
  RULE_FORM_SUPPLIER_DETAIL,
  PAGING_ITEMS,
  TEXT_TOAST_MESSAGE,
} from "../../../js/constants.js";

import { suppliers } from "../../../js/Controllers/SuppliersController";

import SupplierDetail from "../supplier-detail/SupplierDetail.vue";

export default {
  name: "SupplierList",
  components: {
    SupplierDetail,
  },
  props: {},
  data() {
    return {

      // text hiển thị toast message
      textToastMessage: null,

      // kiểm tra notify
      checkNotify: {
        isShow: false,
        type: null,
        text: null,
      },

      // các trường hiển thị thông tin table
      tableField: LIST_CASH_TAB,

      // mảng lưu giá trị lọc
      listFilter: new Map(),

      // hiển thị loading khi load lại dữ liệu
      checkFormLoad: true,

      // các trường trong header table
      fieldsTHead: SUPPLIER_FIELDS,

      // kiểm tra hiển thị drop down của thực hiện hàng loạt
      checkShowDropdownHandlerMultiple: false,

      // thực hiện hàng loạt
      fieldBatchExecution: BatchExecution,

      // title Form
      titleForm: RULE_FORM_SUPPLIER_DETAIL,

      // kiểm tra ẩn, hiện form chi tiết
      checkShowForm: false,

      // các item của paging
      pagingItems: [],

      // danh sách khách hàng truyền vào table để hiển thị
      listData: [],

      // tổng số lượng bản ghi trả về
      totalCount: 0,

      // số bản ghi / trang
      pageSize: 10,

      // trang hiện tại đang đứng
      currentPage: 1,

      // key word dùng để tìm kiếm
      keyword: null,

      // mảng lưu các giá trị dùng để xóa nhà cung cấp
      listIdSuppliers: [],
    };
  },
  created() {
    // lấy thông tin paging trong constants
    this.pagingItems = PAGING_ITEMS;
    console.log(this.tableField);

    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: load dữ liệu
     */
    this.loadSuppliers();
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

    /**
     * Author: Phạm Văn Đạt(18/12/2022)
     * Function: Load dữ liệu nhà cung cấp
     */
    async loadSuppliers() {
      // hiển thị form loadding
      this.checkFormLoad = true;

      // disable nút reload dữ liệu khi chưa load dữ liệu xong để trách db click
      this.disableButtonResetData = true;

      // gọi api phân trang
      await suppliers.pagingSuppliers([]);

      // khởi tạo giá trị list dữ liệu
      this.listData = suppliers.data;
      this.totalCount = suppliers.totalCount;

      // khi load dữ liệu xong thì trả về nút láy lại dữ liệu ở trang thái bình thường
      this.disableButtonResetData = false;

      //ẩn form loading
      this.checkFormLoad = false;

      console.log(this.listData);
    },
  },
  watch: {
    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Xử lý thay đổi số bản ghi/ trang => load lại dữ liệu
     */
    async pageSize(value) {
      try {
        suppliers.pageSize = value;

        // khi thay đổi số bản ghi trên trang thì load lại về trang đầu tiên
        suppliers.currentPageNumber = 1;

        // gọi hàm load dữ liệu
        await this.loadSuppliers();
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author: Phạm Văn Đạt(18/12/2022)
     * Function: Xử lý thay đổi số trang => load lại dữ liệu
     */
    async currentPage(newValue, oldValue) {
      try {
        if (newValue != oldValue) {
          // cập nhật lại giá trị hiện tại của current page
          suppliers.currentPageNumber = newValue;

          //  load lại dưx liệu
          await this.loadSuppliers();
        }
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },
  },
};
</script>

<style scoped>
@import url(SupplierList.css);
</style>
