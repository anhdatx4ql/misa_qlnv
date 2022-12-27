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
          <base-textarea :isFormat="true" v-model="i[item?.name]" :height="31"></base-textarea>
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
              @clickButton="deleteItemBankAccounts(i)"
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
      @clickButton="insertItemBackAccount"
    ></base-button>

    <base-button
      listClass="button-white"
      text="Xóa hết dòng"
      :frontSize="12"
      :height="24"
      @clickButton="removeBankAccounts"
    ></base-button>
  </div>
</template>

<script>
import { FIELDS_BACKACCOUNT, BANK_ACCOUNTS_MODEL } from "../../js/constants.js";
import { bankAccounts } from "../../js/Controllers/BankAccountsController.js";
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

      // danh sách lưu thông tin tài khoản ngân hàng,
      BANK_ACCOUNTS_MODEL,
    };
  },
  async created() {
    // gán giá trị
    //modelValue là chuỗi nhiều id của tài khoản ngân hàng. Get data
    await this.getDataBankAccounts(this.modelValue);
  },
  watch: {
    /**
     * Author: Phạm Văn Đạt(15/12/2022)
     * Function: THeo dõi sự thay đổi của list dữ liệu đưa vào
     * @param {*} value : giá trị model đưa vào
     */
    async modelValue(value) {
      try {
        await this.getDataBankAccounts(value);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(15/12/2022)
     * Function: Theo dõi giá trị
     * @param {*} value : giá trị mảng tài khoản ngân hàng
     */
    bankAccounts: {
      handler(newValue) {
        this.$emit("data", newValue);
      },
      deep: true,
    },
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt(22/12/2022)
     * Function: xthêm 1 item trong danh sách
     */
    insertItemBackAccount() {
      try {
        this.bankAccounts = [
          ...this.bankAccounts,
          {
            backAccountNumber: null,
            bankAccountName: null,
            bankAccountBranch: null,
            bankAccountCity: null,
          },
        ];
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/12/2022)
     * Function: xóa hết item trong danh sách
     */
    removeBankAccounts() {
      try {
        this.bankAccounts = [
          {
            backAccountNumber: null,
            bankAccountName: null,
            bankAccountBranch: null,
            bankAccountCity: null,
          },
        ];
        this.bankAccountRow = 1;

        console.log(this.bankAccounts);
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/12/2022)
     * Function: Xóa item khỏi danh sách
     */
    deleteItemBankAccounts(value) {
      try {
        let index = this.bankAccounts.findIndex((val) => val === value);

        if (index != null) {
          this.bankAccounts.splice(index, 1);
        }
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(21/12/2022)
     * Function: Xử lý lấy dữ liệu bankaccount
     */
    async getDataBankAccounts(value) {
      try {
        let arr = [];

        // tách chuỗi thành mảng id để lấy dữ liệu
        if (value) {
          arr = value.split(";");
        }
        console.log(arr)
        // nếu mảng không rỗng=> lấy dữ liệu
        if(arr.length > 0){
          // lấy dữ liệu tài khoản ngân hàng
          let result = await bankAccounts.getDataByIds(arr);

          // gán giữ liệu vừa lấy được
          if (result != null && result != []) {
            this.bankAccounts = result;
            this.bankAccountRow = result.length;
          } else {
            this.bankAccounts = BANK_ACCOUNTS_MODEL;
            this.bankAccountRow = 1;
          }
        }
       
      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(15/12/2022)
     * Function: Xử lý click thêm bankaccount
     */
    clickAddbankAccount() {
      this.bankAccountRow = this.bankAccountRow + 1;
    },
  },
};
</script>

<style scoped>
@import url(BaseBankAccount.css);
</style>
