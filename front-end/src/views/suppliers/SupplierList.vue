
<!-- 
  Author: Phạm Văn Đạt
  Function: màn hình nhà cung cấp
 -->

<template>
  <div class="suppliers">
    <!-- start header ,điều hướng thêm -->
    <div class="suppliers-header">
      <div class="suppliers-header-left">
        <p>Danh sách nhà cung cấp</p>
      </div>
      <div class="suppliers-header-right">
        <div class="suppliers-header-right-button">
          <button>Thêm</button>
          <div class="button-export">
            <div class="line"></div>
            <span class="background-icon-bottom-white"></span>
            <div class="button-export-dropdown">
              <button>Nhập từ Excel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end header ,điều hướng thêm -->

    <div class="suppliers-content">
      <div class="suppliers-content-header">
        <div class="suppliers-content-header-items">
          <div class="suppliers-content-header-item">
            <div>
              <span>0,00</span>
              <span class="background-icon-filter"></span>
            </div>
            <div>Nợ quá hạn</div>
          </div>

          <div class="suppliers-content-header-item">
            <div>
              <span>28.808.490.649,71</span>
              <span class="background-icon-filter"></span>
            </div>
            <div>Tổng nợ phải trả</div>
          </div>

          <div class="suppliers-content-header-item">
            <div>
              <span>0,00</span>
              <span class="background-icon-filter"></span>
            </div>
            <div>Đã thanh toán(30 ngày gần đây)</div>
          </div>
        </div>
      </div>
      <div class="suppliers-suppliers-content-center">

        <!-- start content top -->
        <div class="suppliers-content-center-top">
          <div class="suppliers-content-center-top-left">
            <div class="suppliers-content-center-top-left-child">
              <div class="suppliers-content-center-top-left-child handler-data">
                <base-button
                  @click="checkShowDropdownHandlerMultiple = true"
                  v-click-away="handlerClick"
                >
                  <span>Thực hiện hàng loạt</span>
                  <div
                    class="handler-data-dropdown"
                    v-show="checkShowDropdownHandlerMultiple"
                  >
                    <base-button>Xóa</base-button>
                    <base-button>Gộp</base-button>
                  </div>
                </base-button>

                <base-button>
                  <span>Lọc</span>
                  
                </base-button>
              </div>
            </div>
          </div>

          <div class="suppliers-content-center-top-right">
            <base-input-text
              placeholder="Nhập từ khóa tìm kiếm"
              classIcon="input-icon-search"
              v-model="keyword"
              :isFormatText="false"
            >
            </base-input-text>

            <base-button
              v-tooltip="'Lấy lại dữ liệu'"
              :disable="disableButtonResetData"
              @click.prevent="loadData"
              class="suppliers-content-center-button-left icon-ml-5"
            >
              <span
                class="background-icon-reload icon-24 background-flex"
              ></span>
            </base-button>

            <base-button
              v-tooltip="'Xuất ra Excel'"
              @click="handlerExportExcel"
              class="suppliers-content-center-button-left"
            >
              <span
                class="background-icon-excel icon-24 background-flex"
              ></span>
            </base-button>

            <!-- start custom tooltip -->
            <div v-tooltip="{ theme: { placement: 'bottom-right' } }">
              <base-button
                v-tooltip="'Tùy chỉnh giao diện'"
                @click="handlerExportExcel"
                class="suppliers-content-center-button-left"
              >
                <span
                  class="background-icon-setting icon-24 background-flex"
                ></span>
              </base-button>
            </div>
            <!-- end custom tooltip -->
          </div>
        </div>
        <!-- end content top -->

        <!-- startt content table -->
        <!-- end content table -->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SupplierList",
  props: {},
  data() {
    return {
      // mảng lưu giá trị lọc
      listFilter: new Map(),

      // kiểm tra hiển thị drop down của thực hiện hàng loạt
      checkShowDropdownHandlerMultiple: false,
    };
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
