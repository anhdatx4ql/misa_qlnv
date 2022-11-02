<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Thông tin chi tiết khách hàng
 -->
<template>
  <div class="form">
    <el-color-picker v-model="color" show-alpha />
    <div class="form-container" ref="formContainer">
      <!-- start header -->
      <div class="form-header">
        <div class="form-header-left">
          <div class="form-header-left-title">
            {{ title }}
          </div>
          <!-- start Check box kiểm tra khách hàng -->
          <base-input-checkbox
            :value="currentEmployee.isEmployee"
            :checked="currentEmployee.isEmployee"
            text="Là khách hàng"
            id="khach-hang"
            @value="currentEmployee.isEmployee = $event"
          >
          </base-input-checkbox>
          <!-- end Check box kiểm tra khách hàng -->

          <!-- start Check box kiểm tra nhà cung cấp -->
          <base-input-checkbox
            :value="currentEmployee.isSuppiler"
            :checked="currentEmployee.isSuppiler"
            text="Là nhà cung cấp"
            id="nha-cung-cap"
            @value="currentEmployee.isSuppiler = $event"
          ></base-input-checkbox>
          <!-- end Check box kiểm tra nhà cung cấp -->
        </div>
        <div class="form-header-right">
          <div v-tooltip="{ global: true, theme: { placement: 'bottom' } }">
            <base-button @click="handlerCloseForm" v-tooltip="'Đóng (ESC)'">
              <span class="background-icon-close icon-24"></span>
            </base-button>
          </div>
        </div>
      </div>
      <!-- end header -->

      <!-- start content -->
      <div class="form-content">
        <!-- start content top -->
        <div class="form-content-top">
          <!-- start content top left -->
          <div class="form-content-top-left">
            <!-- start mã -->
            <base-input-text
              class="w-40 p-r-6"
              :value="currentEmployee.employeeId"
              @value="currentEmployee.employeeId = $event"
              :errorText="
                listErrors.has('employeeId')
                  ? listErrors.get('employeeId')
                  : null
              "
              @errorText="
                $event
                  ? !listErrors.has('employeeId')
                    ? listErrors.set('employeeId', $event)
                    : ''
                  : listErrors.delete('employeeId')
              "
              fieldLabel="Mã"
              :iconRed="true"
              :isRequired="true"
              :checkFocus="fieldFocusValidate.employeeId"
              @checkFocus="fieldFocusValidate.employeeId = false"
            ></base-input-text>
            <!-- end mã -->

            <!-- start Tên -->
            <base-input-text
              class="w-60"
              :value="currentEmployee.name"
              @value="currentEmployee.name = $event"
              :errorText="
                listErrors.has('name') ? listErrors.get('name') : null
              "
              @errorText="
                $event
                  ? !listErrors.has('name')
                    ? listErrors.set('name', $event)
                    : ''
                  : listErrors.delete('name')
              "
              :checkFocus="fieldFocusValidate.name"
              @checkFocus="fieldFocusValidate.name = false"
              fieldLabel="Tên"
              :iconRed="true"
              :isRequired="true"
            ></base-input-text>
            <!-- end tên-->

            <!-- start đơn vị -->
            <base-combobox
              :checkFocus="fieldFocusValidate.departmentId"
              @checkFocus="fieldFocusValidate.departmentId = false"
              :isRequired="true"
              :isValidate="true"
              :value="{
                id: currentEmployee.departmentId,
                name: currentEmployee.departmentName,
              }"
              @newValue="currentEmployee.departmentId = $event"
              :errorText="
                listErrors.has('departmentId')
                  ? listErrors.get('departmentId')
                  : null
              "
              @errorText="
                $event
                  ? listErrors.set('departmentId', $event)
                  : listErrors.delete('departmentId')
              "
              @checkLoadDataCombobox="loadDepartments"
              comboboxField="Đơn vị"
              :listValues="departments"
              position="top"
              :iconRed="true"
            >
            </base-combobox>
            <!-- end đơn vị -->

            <!-- start chức vụ -->
            <base-combobox
              :value="{
                id: currentEmployee.positionId,
                name: currentEmployee.positionName,
              }"

              :errorText="
                listErrors.has('positionId')
                  ? listErrors.get('positionId')
                  : null
              "
              @errorText="
                $event
                  ? listErrors.set('positionId', $event)
                  : listErrors.delete('positionId')
              "
              :isValidate="true"
              @newValue="currentEmployee.positionId = $event"
              @checkLoadDataCombobox="loadPositions"
              comboboxField="Chức vụ"
              :listValues="positions"
              position="top"
            >
            </base-combobox>
            <!-- end chức vụ -->
          </div>
          <!-- end content top left -->

          <!-- start content right -->
          <div class="form-content-top-right">
            <!-- start ngày sinh -->
            <div class="w-40 p-r-6 input-date">
              <span>Ngày sinh</span>

              <div class="input-date-container">
                <el-config-provider :locale="locale">
                  <el-date-picker
                    :class="{ 'input-error': listErrors.has('birthDay') }"
                    v-model="currentEmployee.birthDay"
                    @change="HandlerDateTime('birthDay', 'Ngày sinh', $event)"
                    type="date"
                    placeholder="DD/MM/YYY"
                    format="DD/MM/YYYY"
                  />
                </el-config-provider>
                <!-- start hiển thị lỗi nếu có -->
                <div
                  class="input-container-error"
                  v-if="listErrors.has('birthDay')"
                >
                  <div></div>
                  <div>
                    <span>{{ listErrors.get("birthDay") }}</span>
                  </div>
                </div>
                <!-- end hiển thị lỗi nếu có -->
              </div>
            </div>

            <!-- start giới tính -->
            <!-- nam -->
            <div class="form-gender">
              <div class="form-gender-title">Giới tính</div>
              <div class="flex flex-grow-1">
                <base-input-radio
                  v-for="(gender, index) in genders"
                  :key="gender.id"
                  :valueGender="currentEmployee.gender"
                  :value="gender.id"
                  @value="currentEmployee.gender = $event"
                  :checked="index == 0 ? true : false"
                  :text="gender.name"
                  name="gender"
                  :id="gender.field"
                >
                </base-input-radio>
              </div>
            </div>

            <!-- end giới tính -->

            <!-- Start Số chứng minh nhân dân -->
            <base-input-text
              tooltip="Số chứng minh nhân dân"
              class="w-60 p-r-6"
              fieldLabel="Số CMND"
              :value="currentEmployee.idNo"
              @value="currentEmployee.idNo = $event"
            ></base-input-text>

            <!-- End Số chứng minh nhân dân  -->

            <!-- start ngày cấp -->
            <div class="w-40 input-date">
              <span>Ngày cấp</span>
              <div class="input-date-container">
                <el-config-provider :locale="locale">
                  <el-date-picker
                    :class="{ 'input-error': listErrors.has('issuaOn') }"
                    v-model="currentEmployee.issuaOn"
                    @change="HandlerDateTime('issuaOn', 'Ngày cấp', $event)"
                    type="date"
                    placeholder="DD/MM/YYY"
                    format="DD/MM/YYYY"
                  />
                </el-config-provider>
                <!-- start hiển thị lỗi nếu có -->
                <div
                  class="input-container-error"
                  v-if="listErrors.has('issuaOn')"
                >
                  <div></div>
                  <div>
                    <span>{{ listErrors.get("issuaOn") }}</span>
                  </div>
                </div>
                <!-- end hiển thị lỗi nếu có -->
              </div>
            </div>
            <!-- end ngày cấp  -->

            <!-- Start Số chứng minh nhân dân -->
            <base-input-text
              :value="currentEmployee.placeOfIssue"
              @value="currentEmployee.placeOfIssue = $event"
              fieldLabel="Nơi cấp"
              class="w-100"
            ></base-input-text>
            <!-- End Số chứng minh nhân dân  -->
          </div>
          <!-- end content right -->
        </div>
        <!-- end content top -->
      </div>
      <!-- start content top -->
      <div class="form-content-cennter">
        <!-- Start địa chỉ -->
        <base-input-text
          :value="currentEmployee.address"
          @value="currentEmployee.address = $event"
          fieldLabel="Địa chỉ"
          class="w-100"
        ></base-input-text>
        <!-- End địa chỉ -->

        <!-- Start điện thoại di động -->
        <base-input-text
          :value="currentEmployee.numberPhone"
          @value="currentEmployee.numberPhone = $event"
          :errorText="
            listErrors.has('numberPhone') ? listErrors.get('numberPhone') : null
          "
          @errorText="
            $event
              ? !listErrors.has('numberPhone')
                ? listErrors.set('numberPhone', $event)
                : ''
              : listErrors.delete('numberPhone')
          "
          fieldLabel="ĐT di động"
          tooltip="Điện thoại di động"
          class="w-25 p-r-6"
        ></base-input-text>
        <!-- End điện thoại di động -->

        <!-- Start điện cố định -->
        <base-input-text
          :value="currentEmployee.deskPhone"
          @value="currentEmployee.deskPhone = $event"
          :errorText="
            listErrors.has('deskPhone') ? listErrors.get('deskPhone') : null
          "
          @errorText="
            $event
              ? !listErrors.has('deskPhone')
                ? listErrors.set('deskPhone', $event)
                : ''
              : listErrors.delete('deskPhone')
          "
          fieldLabel="ĐT cố định"
          tooltip="Điện thoại cố định"
          class="w-25 p-r-6"
        ></base-input-text>
        <!-- End điện cố định -->

        <!-- Start email -->
        <base-input-text
          :value="currentEmployee.email"
          @value="currentEmployee.email = $event"
          :errorText="listErrors.has('email') ? listErrors.get('email') : null"
          @errorText="
            $event
              ? !listErrors.has('email')
                ? listErrors.set('email', $event)
                : ''
              : listErrors.delete('email')
          "
          fieldLabel="Email"
          class="w-25 p-r-6"
          style="margin-right: 20%"
        ></base-input-text>
        <!-- End email -->

        <!-- Start tài khoản ngân hàng -->
        <base-input-text
          :value="currentEmployee.bankAccountNumber"
          @value="currentEmployee.bankAccountNumber = $event"
          fieldLabel="Tài khoản ngân hàng"
          class="w-25 p-r-6"
        ></base-input-text>
        <!-- End tài khoản ngân hàng -->

        <!-- Start tên ngân hàng -->
        <base-input-text
          :value="currentEmployee.bankName"
          @value="currentEmployee.bankName = $event"
          fieldLabel="Tên ngân hàng"
          class="w-25 p-r-6"
        >
        </base-input-text>
        <!-- End tên ngân hàng -->

        <!-- Start chi nhánh -->
        <base-input-text
          :value="currentEmployee.bankAccountBrand"
          @value="currentEmployee.bankAccountBrand = $event"
          fieldLabel="Chi nhánh"
          class="w-25 p-r-6"
        ></base-input-text>
        <!-- End chi nhánh -->
      </div>
      <!-- end content top -->

      <!-- start bottom -->
      <div class="form-bottom">
        <div class="form-bottom-right">
          <base-button v-tooltip="'Cất và thêm(Ctrl + Shift +S)'">
            <span>Cất và thêm</span>
          </base-button>
          <base-button
            class="button-white"
            v-tooltip="'Cất(Ctrl + S)'"
            @click="HandlerUploadData"
            style="margin: 0 0.75rem"
            :valueCheck="1"
          >
            <span>Cất</span>
          </base-button>
        </div>

        <div class="form-buttom-left">
          <base-button
            @keydown.tab.prevent="checkFocus = true"
            class="button-white"
            @click="$emit('closeForm', false)"
          >
            <span>Hủy</span>
          </base-button>
        </div>
      </div>
      <!-- end bottom -->
    </div>
    <!-- end content -->
  </div>

  <!-- start thông báo -->
  <base-notify
    @closeForm="$event == false ? $emit('closeForm', false) : ''"
    @checkShowNotify="checkNotify.isShow = $event"
    v-if="checkNotify.isShow"
    :type="checkNotify.type"
    :text="checkNotify.text"
    :fieldNameFocus="firstFocus"
    @checkFocusCloseNotify="checkFocusCloseNotify = $event"
  ></base-notify>
  <!-- end thông báo -->
</template>

<script>
/**
 * Author: Phạm Văn Đạt(21/10/2022)
 * Function: nhúng các các hằng số
 */
import {
  FIELDS_REQUIRED,
  GENDERS,
  NOTIFY_LIST,
  NOTIFY_TEXT,
} from "../../../constants";

import { CreateGuid } from "../../../js/GuidId.js";

import { FormatDate } from "../../../js/FomatData.js";

import { departments } from "../../../js/Controllers/DepartmentsController";

import { positions } from "../../../js/Controllers/PositionsController.js";

import vi from "../../../../node_modules/element-plus/es/locale/lang/vi";

import { employees } from "../../../js/Controllers/EmployeesController";
export default {
  name: "EmployeeDetail",

  setup() {
    return {
      locale: vi,
    };
  },
  props: {
    title: String,
    employeeDetail: Object,
  },
  data() {
    return {
      // kiểm tra focus sau khi ẩn thông báo
      checkFocusCloseNotify: null,
      // danh sách chức vụ
      positions: [],

      // dannh sách phòng ban
      departments: [],

      // các giá trị giới tính
      genders: {},

      // kiểm tra notify
      checkNotify: {
        isShow: false,
        type: null,
        text: null,
      },

      // nhân viên hiện tại
      currentEmployee: {},

      // mảng lưu các lỗi đã có: { field: String, message: String} : chứa object này
      listErrors: new Map(),

      // lấy tên trường đầu tiên có lỗi
      firstFocus: null,

      // các trường check focus
      fieldFocusValidate: {
        employeeId: true,
        name: false,
        departmentId: false,
      },

      // thứ tự hiển thị lỗi
      numericalOrder:["employeeId","name","departmentId","positionId"]
    };
  },
  created() {
    // lấy danh sách giưới tính
    this.genders = GENDERS;

    // khởi tạo giá trị employee
    this.currentEmployee = this.employeeDetail;

    console.log("khoi tao")
  },

  methods: {
    /**
     * Author: Phạm Văn Đạt(29/10/2022)
     * Function: Xử lý ngày tháng vượt quá ngày tháng hiện tại
     */
    HandlerDateTime(fieldName, textFieldName, event) {
      try {
        let today = new Date();

        if (event.getTime() > today.getTime()) {
          // lưu vào map lỗi nếu giá trị đó có lỗi

          this.listErrors.set(
            fieldName,
            NOTIFY_TEXT.dateTimeError(textFieldName)
          );
        } else {
          // xóa lỗi đi nếu giá trị đó thỏa mãn
          if (this.listErrors.has(fieldName) == true) {
            this.listErrors.delete(fieldName);
          }
        }

        console.log(this.listErrors);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt (18/10/2022)
     * Function: Xử lý click ẩn form
     */
    handlerCloseForm() {
      try {
        // gán lại giá trị notifi
        this.checkNotify = {
          isShow: true,
          type: NOTIFY_LIST.Question.type,
          text: NOTIFY_LIST.Question.text(NOTIFY_TEXT?.changeData),
        };
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Xử lý load dữ liệu phòng ban
     */
    async loadDepartments() {
      try {
        await departments.GetRecords();
        this.departments = departments.data;
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/10/2022)
     * Function: Xử lý load dữ liệu Chức vụ
     */
    async loadPositions() {
      try {
        await positions.GetRecords();
        this.positions = positions.data;
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(27/10/2022)
     * Function: Xử lý các nút phím tắt
     */
    HandlerKeyDown(event) {
      try {
        if (event.code == "Escape") {
          this.handlerCloseForm();
        } else if (event.code == "KeyS") {
          console.log("Xử lý nút cất");
        }
        // xuwr lys caats vaf theem
        // if(event.code == "KeyS"){
        //   console.log("Xử lý nút cất")
        // }

        console.log(event);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(28/10/2022)
     * Function: Xử lý upload dữ liệu
     */
    async HandlerUploadData() {
      try {
        // xóa tên trường focus lỗi đầu tiên đã có trước đó
        this.firstFocus = null;

        this.ValiDateRequired();

        if (this.listErrors.size == 0) {
          if (this.title == "Thêm mới nhân viên") {
            // lấy id mới
            this.currentEmployee.id = CreateGuid();

            console.log(this.currentEmployee);

            // gọi đến db thêm dữ liệu
            let result = await employees.InsertEmployee(this.currentEmployee);
            console.log(result);
          } else {
            console.log("xử lý cập nhật");
            console.log(this.currentEmployee);
          }
        } else {
          // chuyển map về dạng value, lấy phân tử đầu tiên hiển thị lên thông báo
          let valueText = null;

          // lấy lỗi theo thứ tự: mã, tên, phòng ban
          for(let i=0;i<this.numericalOrder.length; i++){
            if(this.listErrors.has(this.numericalOrder[i])){
              valueText = this.listErrors.get(this.numericalOrder[i]);
              break;
            }
          }

          // hiển thị lỗi đầu tiên lên thông báo lỗi
          // gán lại giá trị notifi
          this.checkNotify = {
            isShow: true,
            type: NOTIFY_LIST.ErrorValidate.type,
            text: NOTIFY_LIST.ErrorValidate.text(valueText),
          };

          console.log(this.firstFocus )
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(30/10/2022)
     * Function: Xử lý validate dữ liệu khi click nút cất, cất và thêm
     */
    ValiDateRequired() {
      try {
        // nếu giá trị là invalid date thì xóa khỏi object
        FormatDate(this.currentEmployee.birthDay, "YYYY-MM-DD") ==
        "Invalid date"
          ? delete this.currentEmployee.birthDay
          : this.currentEmployee.birthDay
          ? (this.currentEmployee.birthDay = FormatDate(
              this.currentEmployee.birthDay,
              "YYYY-MM-DD"
            ))
          : "";

        // nếu giá trị là invalid date thì xóa khỏi object
        FormatDate(this.currentEmployee.issuaOn, "YYYY-MM-DD") == "Invalid date"
          ? delete this.currentEmployee.issuaOn
          : this.currentEmployee.issuaOn
          ? (this.currentEmployee.issuaOn = FormatDate(
              this.currentEmployee.issuaOn,
              "YYYY-MM-DD"
            ))
          : "";

        // xử lý bấm nút cất, cất và thêm validate các lỗi required
        FIELDS_REQUIRED.forEach((value) => {

          // kiểm tra giá trị có null không
          if (!this.currentEmployee[value.fielName]) {

              // thêm tên trường và message lỗi vào danh sách lỗi nếu chưa có lỗi đó
              if(!this.listErrors.has(value.fielName)){

                this.listErrors.set(
                value.fielName,
                NOTIFY_TEXT.requiredField(value.fieldText)

              );
            }

            // nếu chưa lấy trường nào thì mới nhận dữ liệu
            if (this.firstFocus == null) {
              this.firstFocus = value.fielName;
            }

          }
        });
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    /**
     * Author: Phạm Văn Đạt(02/11/2022)
     * Function: XỬ lý focus vào lỗi đầu tiên nếu như có lỗi
     */
    checkFocusCloseNotify(value){
      console.log(value);

      // chuyển trạng thái focus true ở lỗi đầu tiên
      this.fieldFocusValidate[value] = true;

      // set lại giá trị null cho check focus sau khi ẩn form thông tbaos
      this.checkFocusCloseNotify = null;
    },

    /**
     * Author: Phạm Văn Đạt(22/10/2022)
     * Function: THeo dõi thay đổi thông tin khách hàng
     */
    employeeDetail(value) {
      this.currentEmployee = value;
      console.log(this.currentEmployee);
    },
  },
  mounted() {},
};
</script>

<style scoped>
@import url(EmployeeDetail.css);
</style>
