<!-- 
    Author: Phạm Văn Đạt(26/10/2022)
    Function: Xử lý hiển thị trang thông tin khách hàng
 -->
<template>
  <div class="content">
    <div class="content-top">
      <!-- start content top left -->
      <div class="content-top-left">
        <span class="content-top-left-title">Nhân viên</span>
      </div>
      <div class="content-top-right">
        <base-button
          @clickButton="handlerClickShowForm"
          :disable="disableButtonIndsert"
          text="Thêm mới nhân viên"
        ></base-button>
      </div>
      <!-- end content top left -->
    </div>
    <!-- start custom tooltip -->
    <div v-tooltip="{ global: true, theme: { placement: 'bottom' } }"></div>
    <!-- end custom tooltip -->
    <!-- start  content center top -->
    <div class="content-center-top">
      <div class="content-center-top-left">
        <div class="content-center-top-left-child">
          <base-button
            listClass="btn-secondary"
            text="Thực hiện hàng loạt"
            :listDropDown="RULE_HANDLER_DATA"
            :iconDropDown="true"
            @clickButtonDropDown="resolveMultiple($event)"
          >
          </base-button>
          <div
            class="content-center-top-left-child text-data"
            v-for="(value, key) of listFilter"
            :key="key"
          >
            <span>{{ value[1].text }}</span>
            <base-button listClass="background-unset" classButtonIcon="button-icon-x" @clickButtonDropDown="clickDeleteItemFilter(value)"
            ></base-button>
          </div>
          <base-button
            v-show="listFilter.size > 0"
            @clickButton="clickDeleteItemFilter()"
            text="Xóa điều kiện lọc"
            listClass="background-unset"
          >
          </base-button>
        </div>
      </div>
      <div class="content-center-top-right">
        <base-input-text
          placeholder="Tìm theo mã, tên nhân viên"
          classIcon="input-icon-search"
          v-model="keyword"
          :isFormatText="false"
        >
        </base-input-text>

        <base-button
          v-tooltip="'Lấy lại dữ liệu'"
          :disable="disableButtonResetData"
          listClass="background-unset"
          classButtonIcon="background-icon-reload icon-24 background-flex"
          @clickButton="loadData"
        >
        </base-button>
        
        <base-button
          v-tooltip="'Xuất ra Excel'"
          :disable="disableButtonResetData"
          listClass="background-unset"
          classButtonIcon="background-icon-excel icon-24 background-flex"
          @clickButton="handlerExportExcel"
        >
        </base-button>
      </div>
    </div>
    <!-- end content center top -->

    <div class="content-table" :style="checkFormLoad ? 'flex-grow:1' : ''">
      <!-- start table -->
      <base-table
        @dataDetail="
          (employeeDetail = $event),
            (checkShowForm = true),
            (title = 'Sửa nhân viên')
        "
        v-model="listData"
        :showFormLoad="checkFormLoad"
        :fieldsTHead="tableField"
        @showFormLoad="checkFormLoad = $event"
        @functionTable="
          $event.data.id != null && $event.value
            ? handlerFunctionTable($event.value, $event.data)
            : ''
        "
        :isFilter="true"
        @listFilter="handlerFilter($event)"
        :listDeleteFilterData="listDeleteFilterData"
        @listDeleteFilterData="listDeleteFilterData = $event"
        @listIdData="handlerSelectIdEmployees($event)"
        :listIdDataIn="listIdEmployees"
      >
      </base-table>
      <!-- end table -->
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

    <!-- start form -->
    <employee-detail
      v-if="checkShowForm"
      :title="title"
      @closeForm="checkShowForm = $event"
      @loadData="loadData"
      :employeeDetail="employeeDetail"
      @textToastMessage="textToastMessage = $event"
      @typeToastMessage="typeToastMessage = $event"
    ></employee-detail>
    <!-- end form -->

    <!-- start toast message -->
    <base-toast-message
      :text="textToastMessage"
      :type="typeToastMessage"
      @textToastMessage="textToastMessage = $event"
    ></base-toast-message>
    <!-- end toast message -->

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
/**
 * Author: Phạm Văn Đạt (19/10/2022)
 */
import {
  PAGING_ITEMS,
  FUNCTION_TABLE,
  STATUS_CODES,
  TABLE_FIELDS,
  NOTIFY_LIST,
  RULE_HANDLER_DATA,
  TEXT_TOAST_MESSAGE,
  TITLES_FORM,
} from "../../../js/constants";

import EmployeeDetail from "../employees-detail/EmployeeDetail.vue";

import { createGuid } from "../../../js/GuidId.js";

import {
  employees,
  employeeModel,
  resetEmployeeDetail,
} from "../../../js/Controllers/EmployeesController";

export default {
  name: "EmployeeList",
  components: {
    EmployeeDetail,
  },
  props: {},
  data() {
    return {
      // các item của paging
      pagingItems: [],

      // kiểm tra hiển thị form
      checkShowForm: false,

      // dữ liệu khách hàng
      employeesList: [],

      // title form
      title: TITLES_FORM.Create,

      // danh sách khách hàng truyền vào table để hiển thị
      listData: [],

      // tổng số lượng bản ghi trả về
      totalCount: 0,

      // số bản ghi / trang
      pageSize: 10,

      // trang hiện tại đang đứng
      currentPage: 1,

      // khai báo thông tin chi tiết khách hàng
      employeeDetail: employeeModel,

      // disable nút button thêm mới nhân viên khi click 1 lần
      disableButtonIndsert: false,

      // disable nút button lấy lại dữ liệu khi click và đang chờ
      disableButtonResetData: false,

      // key word dùng để tìm kiếm
      keyword: null,

      // hiển thị loading khi load lại dữ liệu
      checkFormLoad: true,

      // text hiển thị toast message
      textToastMessage: null,

      // kiểu toast message
      typeToastMessage: null,

      // các trường trong table
      tableField: TABLE_FIELDS,

      // kiểm tra notify
      checkNotify: {
        isShow: false,
        type: null,
        text: null,
      },

      // id nhân viên hiện tại
      currentEmployeeId: null,

      // mảng lưu giá trị lọc
      listFilter: new Map(),

      // các chức năng thao tác nhanh dữ liệu
      RULE_HANDLER_DATA,

      // kiểm tra hiển thị các chức năng hiển thị nhanh
      checkShowComboboxHandlerData: false,

      // mảng lưu các giá trị dùng để xóa nhân viên
      listIdEmployees: [],

      // mảng lưu các giá trị lọc dùng để xóa
      listDeleteFilterData: [],

      // mảng lưu các trường lọc
      arrFilter: [],
    };
  },
  created() {
    // lấy thông tin paging trong constants
    this.pagingItems = PAGING_ITEMS;

    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: load dữ liệu
     */
    this.loadData();
  },
  watch: {
    /**
     * Author: Phạm Văn Đạt(26/10/2022)
     * Function: Xử lý tìm kiếm dữ liệu theo tên và mã khách hàng
     */
    async keyword(value) {
      try {
        // lấy giá trị keyword tìm kiếm lưu vào biến employee
        employees.keyword = value;

        // nếu như trang hiện tại không phải là trang đầu tiên thì chuyển currentPageNumber = 1
        // => chạy watch currentPage() => xử lý load data ở đó
        if (employees.currentPageNumber != 1) {
          this.currentPage = 1;
        } else {
          // nếu current pageNumber =1 thì thực hiện load lại dữ liệu với trang đầu và keyword mới
          await this.loadData();
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
        employees.pageSize = value;

        // khi thay đổi số bản ghi trên trang thì load lại về trang đầu tiên
        employees.currentPageNumber = 1;

        // gọi hàm load dữ liệu
        await this.loadData();
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Xử lý thay đổi số trang => load lại dữ liệu
     */
    async currentPage(newValue, oldValue) {
      try {
        if (newValue != oldValue) {
          // cập nhật lại giá trị hiện tại của current page
          employees.currentPageNumber = newValue;

          //  load lại dưx liệu
          await this.loadData();
        }
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },
  },
  methods: {
    /**
     * Author:Phạm Văn Đạt(22/11/2022)
     * Function: Xử lý thao tác nhiều dữ liệu
     * @param {*} item : Xóa nhiều | Sửa nhiều
     */
    async resolveMultiple(item) {
      try {
        if (this.listIdEmployees.length > 0) {
          for (let i = 0; i < RULE_HANDLER_DATA.length; i++) {
            if (item.name == i.name) {
              console.log(this.listIdEmployees);
              let result = await employees.deleteEmployee(this.listIdEmployees);

              if (result.statusCode == STATUS_CODES.Code200) {
                // hiển thị toast message xóa thành công
                this.textToastMessage = result.message[0];
                this.typeToastMessage = "success";

                // load lại dữ liệu
                await this.loadData();

                this.listIdEmployees = [];
              } else {
                // hiển thị toast message xóa thất bại
                this.textToastMessage = result.message[0];
                this.typeToastMessage = "error";
              }
            } else {
              this.textToastMessage = "Tính năng đang phát triển.";
              this.typeToastMessage = "error";
              console.log("vào đây");
            }
          }
        }

        if (this.$refs.itemResolveMultiple) {
          // this.$refs.itemResolveMultiple[0].style.display = "none";
          this.$refs.itemResolveMultiple.style.display = "none";
        }
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author:Phạm Văn Đạt(22/11/2022)
     * Function: Xử lý lấy dữ liệu id khách hàng
     * @param {*} value : id nhân viên
     */
    handlerSelectIdEmployees(value) {
      try {
        this.listIdEmployees = value;
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author:Phạm Văn Đạt(19/11/2022)
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

    /**
     * Author: Phạm Văn Đạt(18/11/2022)
     * Function: Xử lý hiển thị, ẩn form xử lý dữ liệu nhanh
     * @param {*} event : el click
     */
    clickAwayHandlerData() {
      try {
        this.checkShowComboboxHandlerData = false;
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author: Phạm Văn Đạt(18/11/2022)
     * Function: Xử lý lọc
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

        // load lại dữ liệu
        await this.loadData();
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author: Phạm Văn Đạt(08/11/2022)
     * Function: Xử lý xuất excel
     */
    async handlerExportExcel() {
      try {
        await employees.exportExcel(employees.keyword);
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author: Phạm Văn Đạt(04/11/2022)
     * Function: Xử lý các chức năng: Nhân bản, xóa, ngưng sử dụng
     */
    async handlerFunctionTable(value, data) {
      try {
        if (value != null && data.id != null) {
          if (value == FUNCTION_TABLE.Replication) {
            // form thêm mới nhân viên
            this.title = TITLES_FORM.Create;

            // lưu giá trị vào nhân viên chi tiết
            this.employeeDetail = data;

            // tạo guid id mới cho data
            this.employeeDetail.employeeID = createGuid();

            // hiển thị form
            this.checkShowForm = true;

            console.log("Nhân bản");
          } else if (value == FUNCTION_TABLE.Delete) {
            // hiển thị thông báo có chắc chắn muốn xóa
            this.checkNotify = {
              isShow: true,
              type: NOTIFY_LIST.Warning.type,
              text: NOTIFY_LIST.Warning.text(
                "Bạn có thực sự muốn xóa nhân viên <" +
                  data.employeeId +
                  "> không?"
              ),
            };

            this.currentEmployeeId = data.id;

            console.log(value, data.id);
          } else if (value == FUNCTION_TABLE.StopUsing) {
            console.log("Ngưng sử dụng");
          }
        }
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author: Phạm Văn Đạt(08/11/2022)
     * Function: Xử lý xóa nhân viên
     */
    async handlerDeleteEmployee() {
      try {
        console.log("run");
        let result = await employees.deleteEmployee([this.currentEmployeeId]);

        if (result.statusCode == STATUS_CODES.Code200) {
          // hiển thị toast message xóa thành công
          this.textToastMessage = result.message[0];
          this.typeToastMessage = "success";

          // load lại dữ liệu
          await this.loadData();
        } else {
          // hiển thị toast message xóa thất bại
          this.textToastMessage = result.message[0];
          this.typeToastMessage = "error";
        }
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author: Phạm Văn Đạt(19/10/2022)
     * Function: Load dữ liệu
     */
    async loadData() {
      try {
        // hiển thị form loadding
        this.checkFormLoad = true;

        // disable nút reload dữ liệu khi chưa load dữ liệu xong để trách db click
        this.disableButtonResetData = true;

        console.log(123, this.arrFilter);

        // gọi api phân trang
        await employees.pagingEmployee(this.arrFilter);

        // khởi tạo giá trị list dữ liệu
        this.listData = employees.data;
        this.totalCount = employees.totalCount;

        // khi load dữ liệu xong thì trả về nút láy lại dữ liệu ở trang thái bình thường
        this.disableButtonResetData = false;

        //ẩn form loading
        this.checkFormLoad = false;
      } catch (e) {
        console.log(e);
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },

    /**
     * Author: Phạm Văn Đạt(23/10/2022)
     * Function: Xử lý click hiển thị form thêm mới nhân viên
     */
    async handlerClickShowForm() {
      try {
        this.disableButtonIndsert = true;

        // xóa dữ liệu cũ đi
        this.employeeDetail = await resetEmployeeDetail(
          employeeModel,
          employees
        );

        this.checkShowForm = true;
        this.title = TITLES_FORM.Create;
        this.disableButtonIndsert = false;
      } catch (e) {
        this.textToastMessage = TEXT_TOAST_MESSAGE.Error.text;
        this.typeToastMessage = TEXT_TOAST_MESSAGE.Error.type;
      }
    },
  },
};
</script>
   
<style scoped>
@import url(EmployeeList.css);
</style>
   