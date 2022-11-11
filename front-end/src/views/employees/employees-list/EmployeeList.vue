<!-- 
    Author: Phạm Văn Đạt(26/10/2022)
    Function: Xử lý hiển thị trang thông tin khách hàng
 -->
<template>
  <div class="content-top">
    <!-- start content top left -->
    <div class="content-top-left">
      <span class="content-top-left-title">Nhân viên</span>
    </div>
    <div class="content-top-right">
      <base-button @click="handlerClickShowForm" :disable="disableButtonIndsert"
        ><span>Thêm mới nhân viên</span></base-button
      >
    </div>
    <!-- end content top left -->
  </div>

  <!-- start  content center top -->
  <div class="content-center-top">
    <!-- start custom tooltip -->
    <div v-tooltip="{ global: true, theme: { placement: 'bottom' } }"></div>
    <!-- end custom tooltip -->

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
      @click.prevent="loadData"
      class="content-center-button-left icon-ml-10"
    >
      <span class="background-icon-reload icon-24 background-flex"></span>
    </base-button>

    <base-button v-tooltip="'Xuất ra Excel'" @click="handlerExportExcel" class="content-center-button-left">
      <span class="background-icon-excel icon-24 background-flex"></span>
    </base-button>
  </div>
  <!-- end content center top -->

  <div class="content-table">
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
    @sayYes="($event == true)?handlerDeleteEmployee():''"
  ></base-notify>
  <!-- end thông báo -->
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
      title: "Thêm mới nhân viên",

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

      currentEmployeeId:  null
    };
  },
  created() {
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
        console.log(e);
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
        console.log(e);
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
        console.log(e);
      }
    },
  },
  methods: {

    /**
     * Author: Phạm Văn Đạt(08/11/2022)
     * Function: Xử lý xuất excel
     */
    async handlerExportExcel(){
      try{

        await employees.exportExcel(employees.keyword);

      }catch(e){
        console.log(e);
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
            this.title = "Thêm mới nhân viên";

            // lưu giá trị vào nhân viên chi tiết
            this.employeeDetail = data;

            // tạo guid id mới cho data
            this.employeeDetail.id = createGuid();

            // hiển thị form
            this.checkShowForm = true;

            console.log("Nhân bản");
          } else if (value == FUNCTION_TABLE.Delete) {
            // hiển thị thông báo có chắc chắn muốn xóa
            this.checkNotify = {
              isShow: true,
              type: NOTIFY_LIST.Warning.type,
              text: NOTIFY_LIST.Warning.text('Bạn có thực sự muốn xóa nhân viên <'+data.employeeId+'> không?'),
            };

            this.currentEmployeeId = data.id;
            
            console.log(value, data.id);
          } else if (value == FUNCTION_TABLE.StopUsing) {
            console.log("Ngưng sử dụng");
          }
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(08/11/2022)
     * Function: Xử lý xóa nhân viên
     */
    async handlerDeleteEmployee() {
      try{
        console.log("run")
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
      }catch(e){
        console.log(e);
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

        // disable nút reload dữ liệu khi chưa load dữ liệu xong
        this.disableButtonResetData = true;

        // gọi api phân trang
        await employees.pagingEmployee();

        // khởi tạo giá trị list dữ liệu
        this.listData = employees.data;
        this.totalCount = employees.totalCount;

        // khi load dữ liệu xong thì trả về nút láy lại dữ liệu ở trang thái bình thường
        this.disableButtonResetData = false;

        //ẩn form loading
        this.checkFormLoad = false;

        console.log(employees);
        console.log(this.listData);
      } catch (e) {
        console.log(e);
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

        console.log(this.employeeDetail);
        this.checkShowForm = true;
        this.title = "Thêm mới nhân viên";
        this.disableButtonIndsert = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
   
<style scoped>
@import url(EmployeeList.css);
</style>
   