<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Thông tin chi tiết khách hàng
 -->
<template>
  <div class="form" ref="form">
    <div class="form-container" ref="formContainer">
      <!-- start header -->
      <div class="form-header">
        <div class="form-header-left">
          <div class="form-header-left-title">
            {{ title }}
          </div>

          <div class="form-header-left-radio">
            <!-- start là nhà tổ chức -->
            <base-input-radio
              v-for="(item, index) in isPersonal"
              :key="item.id"
              v-model="isCurrentPersonal"
              :value="item.id"
              :checked="index == 0 ? true : false"
              :text="item.name"
              name="isPersonal"
              :id="item.field"
            >
            </base-input-radio>
          </div>

          <div class="form-header-left-checkbox">
            <!-- start Check box kiểm tra khách hàng -->
            <base-input-checkbox
              :checked="isShowCustomer"
              @checked="isShowCustomer = $event"
              text="Là khách hàng"
              id="khach-hang"
            >
            </base-input-checkbox>
            <!-- end Check box kiểm tra khách hàng -->
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
      <!-- end header -->

      <!-- start content  -->
      <div class="form-content form-content-scroll">
        <!-- start form content top -->
        <div class="form-content-top">
          <!-- start form content top left -->
          <div class="form-content-top-left">
            <!-- start mã nhà cung cấp là cá nhân -->
            <base-input-text
              v-if="isCurrentPersonal"
              class="w-60 p-r-12"
              fieldLabel="Mã nhà cung cấp"
              :iconRed="true"
              :isRequired="true"
              :isFormatText="false"
            ></base-input-text>
            <!-- end mã nhà cung cấp là cá nhân -->

            <!-- start mã số thuế -->
            <base-input-text
              class="w-40"
              :class="{ 'p-r-12': !isCurrentPersonal }"
              fieldLabel="Mã số thuế"
              :isFormatText="false"
              :width="140"
            ></base-input-text>
            <!-- end mã số thuế -->

            <!-- start mã nhà cung cấp -->
            <base-input-text
              v-if="!isCurrentPersonal"
              class="w-60"
              fieldLabel="Mã nhà cung cấp"
              :iconRed="true"
              :isRequired="true"
              :isFormatText="false"
            ></base-input-text>
            <!-- end mã nhà cung cấp -->

            <!-- start xưng hô -->
            <base-combobox-multiple
              v-if="isCurrentPersonal"
              class="w-1/3 p-r-12 box-sizing-b"
              placeholder="Xưng hô"
              fieldName="Xưng hô"
              :iconSum="false"
              :isMultiple="false"
            >
            </base-combobox-multiple>
            <!-- end xưng hô -->

            <!-- start tên nhà cung cấp -->
            <base-input-text
              class="w-100"
              :class="{ 'w-2/3': isCurrentPersonal }"
              fieldLabel="Tên nhà cung cấp"
              :iconRed="true"
              :isRequired="true"
              :isFormatText="false"
            ></base-input-text>
            <!-- end tên nhà cung cấp -->

            <!-- start địa chỉ -->
            <base-textarea
              classText="input-container-field-label"
              class="w-100"
              text="Địa chỉ"
              textPlaceholder="VD: Số 82 Duy Tân, Dịch Vọng Hậu, Cầu Giấy, Hà Nội"
            >
            </base-textarea>
            <!-- end địa chỉ -->
          </div>
          <!-- end form content top left -->

          <!-- start form content top right -->
          <div class="form-content-top-right">
            <!-- start mã số thuế -->
            <base-input-text
              v-if="!isCurrentPersonal"
              class="w-40 p-r-12"
              fieldLabel="Điện thoại"
              :isFormatText="false"
            ></base-input-text>
            <!-- end mã số thuế -->

            <!-- start website-->
            <base-input-text
              v-if="!isCurrentPersonal"
              class="w-60"
              fieldLabel="Webbsite"
              :isFormatText="false"
            ></base-input-text>
            <!-- end website -->

            <!-- start nhóm nhà cung cấp -->
            <base-combobox-multiple
              class="w-100"
              classText="input-container-field-label"
              fieldName="Nhóm nhà cung cấp"
              :iconSum="true"
              :isMultiple="true"
              @clickIconSum="showGroupSupplier = true"
            >
            </base-combobox-multiple>
            <!-- end nhóm nhà cung cấp -->

            <!-- start nhóm nhà cung cấp -->
            <base-combobox-multiple
              class="w-100"
              classText="input-container-field-label"
              fieldName="Nhân viên mua hàng"
              @clickIconSum="showEmployee = true"
              :iconSum="true"
              :isMultiple="false"
              v-model="listSelectEmployee"
              @clickItemTable="selectItemEmployeeComboboxMultiple($event)"
            >
            </base-combobox-multiple>
            <!-- end nhóm nhà cung cấp -->
          </div>
          <!-- end form content top right -->
        </div>
        <!-- end form content top -->

        <!-- start content tabs -->
        <div class="form-content-tabs">
          <base-tabs>
            <base-tab title="Thông tin liên hệ" class="d-flex">
              <div
                :class="{ 'w-1/2': isShowCustomer || isCurrentPersonal }"
                class="d-flex flex-grow-1"
              >
                <div class="tab-content-left flex-grow-1 w-1/2 p-r-26">
                  <div class="tab-content-text">
                    {{
                      isCurrentPersonal ? "Thông tin  liên hệ" : "Người liên hệ"
                    }}
                  </div>

                  <div class="tab-content-left-input tab-content-input">
                    <!-- start xưng hô người liên hệ -->
                    <div class="w-1/3" v-if="!isCurrentPersonal">
                      <base-combobox-multiple
                        class="p-r-6-5"
                        placeholder="Xưng hô"
                        :iconSum="false"
                        :isMultiple="false"
                      >
                      </base-combobox-multiple>
                    </div>
                    <!-- end xưng hô người liên hệ -->

                    <!-- start họ và tên người liên hệ -->
                    <div class="w-2/3" v-if="!isCurrentPersonal">
                      <base-input-text
                        placeholder="Họ và tên"
                      ></base-input-text>
                    </div>
                    <!-- end họ và tên người liên hệ -->

                    <!-- Start email -->
                    <div class="w-100">
                      <base-input-text placeholder="Email"></base-input-text>
                    </div>
                    <!-- end email -->

                    <!-- Start số điện thoại -->
                    <div class="w-1/2" v-if="!isCurrentPersonal">
                      <base-input-text
                        placeholder="Số điện thoại"
                      ></base-input-text>
                    </div>
                    <!-- end số điện thoại -->

                    <!-- Start Điện thoại cố định -->
                    <div class="w-1/2 p-r-6-5" v-if="isCurrentPersonal">
                      <base-input-text
                        placeholder="Điện thoại cố định"
                      ></base-input-text>
                    </div>
                    <!-- end điện thoại cố định -->

                    <!-- Start Điện thoại di động -->
                    <div class="w-1/2 p-r-6-5" v-if="isCurrentPersonal">
                      <base-input-text
                        placeholder="Điện thoại di động"
                      ></base-input-text>
                    </div>
                    <!-- end điện thoại di động -->
                  </div>
                </div>

                <div
                  class="tab-content-right flex-grow-1 w-1/2"
                  :class="{ 'p-r-26': isShowCustomer || isCurrentPersonal }"
                >
                  <div class="tab-content-text">Đại diện theo pháp luật</div>

                  <div class="tab-content-right-input tab-content-input">
                    <div class="w-100">
                      <base-input-text
                        placeholder="Đại diện theo pháp luật"
                      ></base-input-text>
                    </div>
                  </div>
                </div>
              </div>

              <!-- start Thông tin CMND/Thẻ căn cước -->
              <div
                :class="{ 'w-1/2': isCurrentPersonal }"
                class="tab-content-employee flex-grow-1"
                v-if="isCurrentPersonal"
              >
                <div class="tab-content-text">Thông tin CMND/Thẻ căn cước</div>

                <div class="tab-content-left-input tab-content-input">
                  <div class="w-1/2 p-r-6-5">
                    <base-input-text
                      placeholder="Số CMND/Thẻ căn cước"
                    ></base-input-text>
                  </div>

                  <div class="w-1/2 p-r-6-5 p-b-6-5">
                    <el-date-picker
                      type="date"
                      placeholder="Ngày cấp"
                      format="DD/MM/YYYY"
                    />
                  </div>

                  <div class="w-100">
                    <base-input-text placeholder="Nơi cấp"></base-input-text>
                  </div>
                </div>
              </div>
              <!-- end thông tin CMND/THẻ căn cước-->

              <!-- start người nhận hóa đơn điện tử -->
              <div
                :class="{ 'w-1/2': isShowCustomer }"
                class="tab-content-employee flex-grow-1"
                v-else-if="isShowCustomer"
              >
                <div class="tab-content-text">Người nhận hóa đơn điện tử</div>

                <div class="tab-content-left-input tab-content-input">
                  <div class="w-100">
                    <base-input-text placeholder="Họ và tên"></base-input-text>
                  </div>

                  <div class="w-100">
                    <base-input-text
                      placeholder='Email, ngăn cách nhiều email bởi dấu chấm phẩy ";"'
                    ></base-input-text>
                  </div>

                  <div class="w-1/2">
                    <base-input-text
                      placeholder="Số điện thoại"
                    ></base-input-text>
                  </div>
                </div>
              </div>
              <!-- end người nhận hóa đơn điện tử -->
            </base-tab>

            <base-tab title="Điều khoản thanh toán" class="flex-wrap">
              <!-- Start điều khoản thanh toán -->
              <div class="w-200 p-r-12">
                <base-combobox-multiple
                  fieldName="Điều khoản thanh toán"
                  :iconSum="true"
                  :isMultiple="false"
                  @clickIconSum="showRulePay = true"
                >
                </base-combobox-multiple>
              </div>
              <!-- end điều khoản thanh toán -->

              <!-- Start Số ngày được nợ -->
              <div class="w-200 p-r-12">
                <base-input-text
                  :isNumber="true"
                  fieldLabel="Số ngày được nợ"
                ></base-input-text>
              </div>
              <!-- end số ngày được nợ -->

              <!-- Start Số nợ tối đa -->
              <div class="w-200 p-r-12">
                <base-input-text
                  :isNumber="true"
                  fieldLabel="Số nợ tối đa"
                ></base-input-text>
              </div>
              <!-- end số nwoj tối đa -->

              <!-- Start tài khoản công nợ phải thu -->
              <div class="w-200 p-r-12" v-if="isShowCustomer">
                <base-combobox-multiple
                  fieldName="Tài khoản công nợ phải thu"
                  :iconSum="false"
                  :isMultiple="false"
                >
                </base-combobox-multiple>
              </div>
              <!-- end tài khoản công nợ phải thu -->

              <!-- Start ttài khoản công nợ phải trả -->
              <div class="w-200 p-r-12">
                <base-combobox-multiple
                  fieldName="Tài khoản công nợ phải trả"
                  :iconSum="false"
                  :isMultiple="false"
                >
                </base-combobox-multiple>
              </div>
              <!-- end tài khoản công nợ phải trả -->
            </base-tab>

            <base-tab title="Tài khoản ngân hàng">
              <base-bank-account v-model="bankAccounts"></base-bank-account>
            </base-tab>

            <base-tab title="Địa chỉ khác" class="d-flex">
              <div class="w-1/2 p-r-26">
                <div class="tab-content-text">Vị trí địa lý</div>

                <div
                  class="
                    tab-content-left-input tab-content-input
                    flex-wrap
                    d-flex
                  "
                >
                  <!-- Start quốc gia -->
                  <div class="w-1/2 p-r-12 box-sizing-b p-b-12">
                    <base-combobox-multiple
                      :iconSum="false"
                      :isMultiple="false"
                      placeholder="Quốc gia"
                    >
                    </base-combobox-multiple>
                  </div>
                  <!-- end quốc gia -->

                  <!-- Start tỉnh/thành phố -->
                  <div class="w-1/2 p-b-12">
                    <base-combobox-multiple
                      :iconSum="false"
                      :isMultiple="false"
                      placeholder="Tỉnh/Thành phố"
                    >
                    </base-combobox-multiple>
                  </div>
                  <!-- end tỉnh/thành phố -->

                  <!-- Start Quận/Huyện -->
                  <div class="w-1/2 p-r-12 box-sizing-b p-b-12">
                    <base-combobox-multiple
                      :iconSum="false"
                      :isMultiple="false"
                      placeholder="Quận/Huyện"
                    >
                    </base-combobox-multiple>
                  </div>
                  <!-- end Quận/Huyện -->

                  <!-- Start Xã/Phường -->
                  <div class="w-1/2 p-b-12">
                    <base-combobox-multiple
                      :iconSum="false"
                      :isMultiple="false"
                      placeholder="Xã/Phường"
                    >
                    </base-combobox-multiple>
                  </div>
                  <!-- end Xã/Phường -->
                </div>
              </div>
              <div class="w-1/2">
                <!-- start content title địa chỉ giao hàng -->
                <div class="tab-content-title">
                  <div class="tab-content-text">Địa chỉ giao hàng</div>
                  <div class="tab-content-other">
                    <base-input-checkbox
                      text="Giống địa chỉ nhà cung cấp"
                      id="supplier-address"
                    >
                    </base-input-checkbox>
                  </div>
                </div>
                <!-- end content title địa chỉ giao hàng -->
                <table>
                  <!-- start textarea địa chỉ giao hàng -->
                  <tbody>
                    <tr v-for="i in rowDeliveryAddress" :key="i">
                      <td style="width: 350px">
                        <base-textarea
                          v-model="deliveryAddress[i]"
                          :height="31"
                        ></base-textarea>
                      </td>
                      <td style="width: 40px">
                        <div
                          v-tooltip="{
                            global: false,
                            theme: { placement: 'bottom-right' },
                          }"
                        >
                          <base-button
                            class="background-unset"
                            classButtonIcon="background-icon background-position-delete w-h-16 d-flex"
                            v-tooltip="'Ctrl + Delete'"
                          ></base-button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- end textarea địa chỉ giao hàng -->

                <div class="tab-content-control">
                  <base-button
                    class="icon-mr-10"
                    v-tooltip="'Ctrl + Insert'"
                    listClass="button-white"
                    text="Thêm dòng"
                    :frontSize="12"
                    :height="24"
                    @clickButton="rowDeliveryAddress++"
                  ></base-button>

                  <base-button
                    listClass="button-white"
                    text="Xóa hết dòng"
                    :frontSize="12"
                    :height="24"
                  ></base-button>
                </div>
              </div>
            </base-tab>

            <base-tab title="Ghi chú">
              <base-textarea text="Ghi chú" :height="190"></base-textarea>
            </base-tab>
          </base-tabs>
        </div>
        <!-- end content tabs -->
      </div>
      <!-- end content -->

      <!-- start bottom -->
      <div class="form-bottom">
        <div class="form-bottom-right">
          <base-button
            v-tooltip="'Cất và thêm(Ctrl + Shift +S)'"
            @clickButton="handlerUploadData(functionUpload.SaveAndInsert)"
            text="Cất và thêm"
          >
          </base-button>
          <base-button
            classButton="button-white"
            v-tooltip="'Cất(Ctrl + S)'"
            @clickButton="handlerUploadData(functionUpload.Save)"
            style="margin: 0 0.75rem"
            text="Cất"
          >
          </base-button>
        </div>

        <div class="form-buttom-left">
          <base-button
            classButton="button-white"
            @clickButton="$emit('closeForm', false)"
            text="Hủy"
          >
          </base-button>
        </div>
      </div>
      <!-- end bottom -->
    </div>

    <!-- start hiển thị form thêm nhóm nhà cung cấp, khách hàng -->
    <group-supplier
      v-if="showGroupSupplier"
      @closeForm="showGroupSupplier = $event"
    ></group-supplier>
    <!-- end hiển thị form thêm nhóm nhà cung cấp, khách hàng -->

    <!-- start hiển thị form thêm nhân viên -->
    <employee-detail
      v-if="showEmployee"
      @closeForm="showEmployee = $event"
    ></employee-detail>
    <!-- end hiển thị form nhân viên -->

    <!-- start form thêm điều khoản thanh toán -->
    <rule-payment v-if="showRulePay"
      @closeForm="showRulePay = $event"></rule-payment>
    <!-- end form thêm điều khoản thanh toán -->

    <!-- end content -->
  </div>
</template>

<script>
import {
  FIELDS_TABLE_COMBOBOX_EMPLOYEE,
  LIST_TABS_SUPPLIERS,
  FIELDS_HEADER_LEFT_SUPPLIER_DETAIL,
  FIELDS_BACKACCOUNT,
} from "../../../js/constants.js";

import GroupSupplier from "../../group-supplier/GroupSupplier";

import EmployeeDetail from "../../employees/employees-detail/EmployeeDetail";

import RulePayment from "../../rule-payment/RulePayment"
/**
 * Author: Phạm Văn Đạt(12/12/2022)
 * Function: nhúng các các hằng số
 */

export default {
  components: { GroupSupplier, EmployeeDetail, RulePayment },
  name: "SupplierDetail",

  setup() {},

  props: {
    title: {
      Type: String,
      default: "Thông tin nhà cung cấp",
    },
  },
  data() {
    return {
      // các trường hiển thị nhân viên trong bảng
      fieldsEmployee: FIELDS_TABLE_COMBOBOX_EMPLOYEE,

      // các trường hiển thị tab trong bảng chi tiết nhân viên
      fieldTabSuppliers: LIST_TABS_SUPPLIERS,

      // các trường của tài khoản ngân hàng
      fieldBankAccount: FIELDS_BACKACCOUNT,

      // hiển thị form thêm nhóm nhà cung cấp, khách hàng
      showGroupSupplier: false,

      // hiển thị form thêm mới nhân viên
      showEmployee: false,

      // hiển thị form thêm mới điều khoản thanh toán
      showRulePay: false,

      // danh sách lưu thông tin tài khoản ngân hàng,
      bankAccounts: [
        {
          backAccountNumber: null,
          backAccountName: null,
          backAccountBrand: null,
          backAccountAddress: null,
        },
      ],

      // số cột trong địa chỉ giao hàng
      rowDeliveryAddress: 0,

      // danh sách địa chỉ giao hàng
      deliveryAddress: Array(this.rowDeliveryAddress),

      // check là cá nhân hay không
      isPersonal: FIELDS_HEADER_LEFT_SUPPLIER_DETAIL,

      // các nhân viên được chọn
      listSelectEmployee: [],

      // test
      employees: Array,

      isShowCustomer: false,

      isCurrentPersonal: 0,
    };
  },
  created() {
    console.log(this.fieldTabSuppliers);
    this.employees = [
      {
        id: "123123123",
        employeeId: "NV001",
        name: "Phạm Văn Đạt",
      },
      {
        id: "123123123",
        employeeId: "NV001",
        name: "Phạm Văn Đạt",
      },
      {
        id: "123123123",
        employeeId: "NV001",
        name: "Phạm Văn Đạt",
      },
      {
        id: "123123123",
        employeeId: "NV001",
        name: "Phạm Văn Đạt",
      },
      {
        id: "123123123",
        employeeId: "NV001",
        name: "Phạm Văn Đạt",
      },
      {
        id: "123123123",
        employeeId: "NV001",
        name: "Phạm Văn Đạt",
      },
      {
        id: "123123123",
        employeeId: "NV001",
        name: "Phạm Văn Đạt",
      },
      {
        id: "123123123",
        employeeId: "NV001",
        name: "Phạm Văn Đạt",
      },
    ];

    console.log(this.listSelectEmployee);

    console.log(this.bankAccounts[0].backAccountNumber);
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(12/12/2022)
     * Function: lấy thông tin khách hàng trong combobox chọn nhiều
     * @param {*} item : object giá trị nhân viên lấy ra
     */
    selectItemEmployeeComboboxMultiple(item) {
      try {
        console.log(item);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đath(14/12/2022)
     * Function: Xử lý ẩn form
     */
    handlerCloseForm() {
      try {
        this.$emit("closeForm", false);
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    // test
    listSelectEmployee(value) {
      console.log(value);
    },
    // test
    isCurrentPersonal(value) {
      console.log(value);
    },
  },
};
</script>

<style scoped>
@import url(SupplierDetail.css);
</style>
