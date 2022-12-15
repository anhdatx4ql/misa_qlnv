<!-- 
  Author: Phạm Văn Đạt(25/10/2022)
  Function: Base tài khoản ngân hàng
 -->
<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="item in fieldBankAccount"
          :key="item"
          :style="'width: ' + item.width + 'px;'"
        >
          {{ item.fieldName }}
        </th>
        <th style="width: 40px"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in bankAccounts" :key="i">
        <td
          v-for="item in fieldBankAccount"
          :key="item"
          :style="'width: ' + item.width + 'px;'"
        >
          <base-textarea
            @valueChange="flowbankAccounts = $event"
            v-model.trim="bankAccounts[item.name]"
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

  <div class="tab-content-control">
    <base-button
      class="icon-mr-10"
      v-tooltip="'Ctrl + Insert'"
      listClass="button-white"
      text="Thêm dòng"
      :frontSize="12"
      :height="24"
      @clickButton="
        bankAccounts.push({
          backAccountNumber: null,
          backAccountName: null,
          backAccountBrand: null,
          backAccountAddress: null,
        })
      "
    ></base-button>

    <base-button
      listClass="button-white"
      text="Xóa hết dòng"
      :frontSize="12"
      :height="24"
    ></base-button>
  </div>
</template>

<script>
import { FIELDS_BACKACCOUNT } from "../../js/constants.js";

export default {
  name: "BaseBankAccount",
  props: {
    // dữ liệu thông  tin tài khoàn ngân hàng
    modelValue: {
      Type: Array,
      default: [],
    },
  },
  data() {
    return {
      // các trường của tài khoản ngân hàng
      fieldBankAccount: FIELDS_BACKACCOUNT,

      //  thông tin tài khoản ngân hàng
      bankAccounts: [],

      // số cột của bảng
      bankAccountRow: 1,

      // theo dõi giá trị bankAccounts bj thay dodoir
      flowbankAccounts: false,
    };
  },
  created() {
    // gán giá trị
    this.bankAccounts = this.modelValue;

    // lấy số lượng cột
    this.bankAccountRow = this.rowCount;
  },
  watch: {
    /**
     * Author: Phạm Văn Đạt(15/12/2022)
     * Function: THeo dõi sự thay đổi của list dữ liệu đưa vào
     * @param {*} value : giá trị model đưa vào
     */
    modelValue(value) {
      try {
        console.log(value);
        this.bankAccounts = value;
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(15/12/2022)
     * Function: Theo dõi giá trị
     * @param {*} value : giá trị mảng tài khoản nh
     */
    bankAccounts: {
      handler(vewValue) {
        this.$emit('update:modelValue',vewValue);
      },
      deep: true,
    },
    /**
     * Author: Phạm Văn Đạt(15/12/2022)
     * Function: kiểm tra xem giá trị trong object có thay đổi hay không
     * @param {*} value : true | false
     */
    flowbankAccounts(value) {
      try {
        if (value == true) {

          this.$emit('update:modelValue',this.bankAccounts);

          this.flowbankAccounts = false;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(15/12/2022)
     * Function: Xử lý click thêm bankaccount
     */
    clickAddbankAccount() {
      this.bankAccountRow = this.bankAccountRow + 1;

      this.console.log(this.bankAccounts);
    },
  },
};
</script>

<style scoped>
@import url(BaseBankAccount.css);
</style>
