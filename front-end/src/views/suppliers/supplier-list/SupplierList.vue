
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
            @clickButton="
              checkShowForm = true;
              supplierDetail = null;
            "
            text="Thêm"
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
                @clickButtonDropDown="handlerMultiple($event)"
                :iconDropDown="true"
              >
              </base-button>

              <base-button
                listClass="btn-secondary"
                text="Lọc"
                :iconDropDown="true"
              >
              </base-button>

              <div
                class="content-center-top-left-child text-data text-filter"
                v-for="(value, key) of listFilter"
                :key="key"
              >
                <span>{{ value[1].text }}</span>
                <base-button
                  class="button-filter"
                  listClass="background-unset"
                  classButtonIcon="button-icon-x"
                  @clickButton="clickDeleteItemFilter(value)"
                ></base-button>
              </div>

              <base-button
                class="button-filter"
                v-show="listFilter.size > 0"
                @clickButton="clickDeleteItemFilter()"
                text="Xóa điều kiện lọc"
                listClass="background-unset"
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
            v-model="keyword"
          >
          </base-input-text>

          <base-button
            v-tooltip="'Lấy lại dữ liệu'"
            listClass="background-unset"
            :disable="disableButtonResetData"
            classButtonIcon="background-icon-reload icon-24 background-flex"
            @clickButton="loadSuppliers"
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
        @dataDetail="
          (supplierDetail = $event),
            (titleForm = RULE_FORM_SUPPLIER_DETAIL.View),
            isUpdate=true
        "
        @checkShowForm="checkShowForm = $event"
        :fieldsTHead="fieldsTHead"
        :showFormLoad="checkFormLoad"
        v-model="listData"
        :isFilter="true"
        :listIdDataIn="listIdSuppliers"
        @listIdData="handlerSelectIdSuppliers($event)"
        @listFilter="handlerFilter($event)"
        :listDeleteFilterData="listDeleteFilterData"
        @listDeleteFilterData="listDeleteFilterData = $event"
        nameId="supplierID"
        @functionTable="
          $event.data.id != null && $event.value
            ? handlerFunctionTable($event.value, $event.data)
            : ''
        "
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
      :title="titleForm"
      :isUpdate="isUpdate"
      @isUpdate="isUpdate = $event"
      @closeForm="checkShowForm = $event"
      :supplierDetail="supplierDetail"
      @textToastMessage="textToastMessage = $event"
      @typeToastMessage="typeToastMessage = $event"
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

    <!-- start toast message -->
    <base-toast-message
      :text="textToastMessage"
      :type="typeToastMessage"
      @textToastMessage="textToastMessage = $event"
    ></base-toast-message>
    <!-- end toast message -->
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
  FUNCTION_TABLE,
  RULE_HANDLER_DATA,
  STATUS_CODES
} from "../../../js/constants.js";

import {
  suppliers,
  supplierModel,
} from "../../../js/Controllers/SuppliersController";

import SupplierDetail from "../supplier-detail/SupplierDetail.vue";

export default {
  name: "SupplierList",
  components: {
    SupplierDetail,
  },
  props: {},
  data() {
    return {

      // kiểm tra cập nhật hay thêm
      isUpdate: false,

      RULE_HANDLER_DATA,
      // các chức năng trong table
      FUNCTION_TABLE,

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

      // title form chi tiết nhà cung cấp
      RULE_FORM_SUPPLIER_DETAIL,

      // title Form
      titleForm: RULE_FORM_SUPPLIER_DETAIL.Create,

      // kiểm tra ẩn, hiện form chi tiết
      checkShowForm: false,

      // khai báo thông tin chi tiết nhà cung cấp
      supplierDetail: supplierModel,

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

      // mảng lưu các trường lọc nhà cung cấp
      arrFilter: [],

      // mảng lưu các giá trị lọc dùng để xóa
      listDeleteFilterData: [],
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
     * Author: Phạm Văn Đạt(25/12/2022)
     * Function: Xử lý xóa, gộp
     * @param {*} item : item xóa, hoặc gộp
     */
    async handlerMultiple(item) {
      try {
        
        //  hỏi xem có chắc chắn muốn xóa hay không
        
        if (item == RULE_HANDLER_DATA[0].name) {
          let result = await suppliers.delete(this.listIdSuppliers);

          if (result.statusCode == STATUS_CODES.Code200) {
            // hiển thị toast message xóa thành công
            this.textToastMessage = result.message[0];
            this.typeToastMessage = "success";

            // load lại dữ liệu
            await this.loadSuppliers();
          }
        }
      } catch (e) {
        console.log(e);
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author:Phạm Văn Đạt(19/12/2022)
     * Function: Xử lý lấy dữ liệu id nhà cung cấp
     * @param {*} value : id nhân viên
     */
    handlerSelectIdSuppliers(value) {
      try {
        this.listIdSuppliers = value;
        console.log(value);
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },
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
      await suppliers.pagingSuppliers(this.arrFilter);

      // khởi tạo giá trị list dữ liệu
      this.listData = suppliers.data;
      this.totalCount = suppliers.totalCount;

      // khi load dữ liệu xong thì trả về nút láy lại dữ liệu ở trang thái bình thường
      this.disableButtonResetData = false;

      //ẩn form loading
      this.checkFormLoad = false;

      console.log(this.listData);
    },

    /**
     * Author: Phạm Văn Đạt(19/12/2022)
     * Function: Xử lý lọc dữ liệu
     * @param {*} value : mảng giá trị lọc
     */
    async handlerFilter(value) {
      try {
        this.listFilter = value;
        console.log(this.listFilter);

        // tạo mảng lưu giá các object lọc
        this.arrFilter = [];

        // xử lý thêm dữ liệu vào object lọc
        this.listFilter.forEach((value, key) => {
          let valueFilter = "";
          if (typeof value.value != "string") {
            valueFilter = value.value ? value.value.toString() : null;
          } else {
            valueFilter = value.value;
          }

          this.arrFilter.push({
            name: key,
            operator: value.operator,
            value: valueFilter,
            typeOperator:
              value.typeOperator != null || value.typeOperator != undefined
                ? value.typeOperator
                : null,
          });
        });

        console.log(this.arrFilter);

        // load lại dữ liệu
        await this.loadSuppliers();
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author:Phạm Văn Đạt(19/12/2022)
     * Function: Xử lý xóa item lọc
     * @param {*} value : item muốn xóa
     */
    clickDeleteItemFilter(value) {
      try {
        if (value) {
          this.listDeleteFilterData = [value[0]];
        } else {
          let arrNameFilter = [];
          this.listFilter.forEach(function (value, key) {
            arrNameFilter.push(key);
          });

          this.listDeleteFilterData = [...arrNameFilter];
        }

        console.log(this.listDeleteFilterData);

        // gọi api lọc
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },
  },
  watch: {
    // Thôn gtin chi tiết nhà cung cấp
    supplierDetail(value) {
      console.log(value);
    },

    /**
     * Author: Phạm Văn Đạt(19/12/2022)
     * Function: Xử lý tìm kiếm nhà cung cấp theo tên, mã
     */
    async keyword(value) {
      try {
        // lấy giá trị keyword tìm kiếm lưu vào biến suppliers
        suppliers.keyword = value;

        // nếu như trang hiện tại không phải là trang đầu tiên thì chuyển currentPageNumber = 1
        // => chạy watch currentPage() => xử lý load data ở đó
        if (suppliers.currentPageNumber != 1) {
          this.currentPage = 1;
        } else {
          // nếu current pageNumber =1 thì thực hiện load lại dữ liệu với trang đầu và keyword mới
          await this.loadSuppliers();
        }
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

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
