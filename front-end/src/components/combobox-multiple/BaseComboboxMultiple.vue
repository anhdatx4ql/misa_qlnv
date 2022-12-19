
<!-- 
  Author: Phạm Văn Đạt(12/12/2022)
  Function: Basecombobox chọn nhiều
 -->

<template>
  <div class="combobox-multiple-container" v-click-away="handlerHideDropdown">
    <!-- start field name -->
    <div v-if="fieldName != null" class="input-container-field-label">
      {{ fieldName }}
    </div>
    <!-- end field name -->

    <!-- start content -->
    <div class="combobox-multiple-container-content">
      <!-- start input combobox -->
      <div class="combobox-multiple-container-content-input">
        <div
          v-for="item in modelValue"
          :key="item"
          class="combobox-multiple-container-content-item"
          :class="{'select-item-multiple':isMultiple}"
        >

          <!-- nếu chọn nhiều -->
          <span v-for="field in listField" :key="field">
            {{ (field.view && isMultiple) ? item[field.fieldName] : "" }}</span
          >
          <span v-if="isMultiple" class="background-icon-close-small w-h-16 flex" @click="deleteItemData(item)"></span>

        </div>

        <!-- input chọn nhiều -->
        <base-input-text :placeholder="placeholder" v-if="isMultiple"></base-input-text>

        <!-- input chọn ít -->
        <base-input-text v-else :placeholder="placeholder" v-model="valutInput"></base-input-text>

      </div>
      <!-- end input combobox -->

      <!-- start input button -->
      <div class="combobox-multiple-container-content-actions" :class="position" >
        <base-button
          v-if="iconSum"
          @clickButton="clickIconSum"
          :height="height"
          listClass="button-white"
          classButtonIcon="background-icon-sum w-24 h-24 flex"
        ></base-button>

        <base-button
        :height="height"
        :class="{'dropdown-active':showDropDown}"
        @clickButton="loadingData"
          listClass="button-white"
          classButtonIcon="background-icon-arrow-bottom w-24 h-24 flex"
        ></base-button>
      </div>
      <!-- end input combobox -->
    </div>
    <!-- end content -->

    <!-- start dropdown -->
    <div v-show="showDropDown" @scroll="handlerscrollDropDown" class="combobox-multiple-dropdown">
      <table v-if="currentListData.length > 0" >
        <thead>
          <tr>
            <th
              v-for="field in listField"
              :key="field"
              :class="field.class"
              :style="'width:' + field.width + 'px;' + field.style"
            >
              {{ field.name }}
            </th>
            <th style="width: 36px" ></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in currentListData"
            :key="item"
            @click="itemDropdownTable(item)"
          >
            <td
              v-for="field in listField"
              :key="field.name"
              :style="'width:' + field.width + 'px;' + field.style"
            >
              {{ item[field.fieldName] }}
            </td>
            <td>
              <span
                v-show="checkExistItemData(item)"
                class="background-checked flex w-h-16"
              ></span>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else>
        <p>Loading dữ liệu</p>
      </div>

    </div>
    <!-- end dropdown -->
  </div>
</template>

<script>
export default {
  name: "BaseComboboxMultiple",
  props: {

    // nhắc nhở trong input
    placeholder:{
      Type: String,
      default: null,
    },

    // tên trường truyền vào
    fieldName: {
      Type: String,
      default: null,
    },

    // check hiển thị icon +
    iconSum: {
      Type: Boolean,
      default: false,
    },

    // các trường hiển thị trong combobox drop down
    listField: {
      Type: Array,
      default: [],
    },

    // dữ liệu gửi vào
    listData: {
      Type: Array,
      default: [],
    },

    // listDataFocus
    modelValue: {
      Type: Array,
      default: [],
    },

    // vị trí hiển thị drop down
    position: {
      Type: String,
      default: 'bottom'
    },

    // đưuọc chọn nhiều
    isMultiple:{
      Type: Boolean,
      default: true
    },

    // chiều cao combobox mặc định
    height:{
      Type: Number,
      default: 32
    }
  },
  data() {

    return{

      // hien thi dropdown
      showDropDown: false,

      // value input chọn ít
      valutInput: null,

      // giá trị hiển thị
      currentListData: []

    };

  },
  created() {

    // khởi tạo giá trị ban đầu
    this.currentListData = this.listData;
  },
  mounted() {},
  watch:{
    /**
     * Author: Phạm Văn Đạt(13/12/2022)
     * Function: Xử lý tìm kiếm giá trị
     * @param {*} value : giá trị text tìm kiếm
     */
    valutInput(value){
      console.log(value);
    },

    /**
     * Author: Phạm Văn Đạt(18/12/2022)
     * Function: theo dõi giá trị mới đưa vào
     * @param {*} value :giá trị data truyền vào
     */
    listData(value){
      this.currentListData = [...value];
    }
  },
  methods: {

    /**
     * Author: Phạm Văn Đạt(18/12/2022)
     * Function: Xử lý load dữ liệu
     */
    loadingData(){
      try{
        this.showDropDown = !this.showDropDown;
        if(this.listData.length == 0){
          this.$emit('loadData',true);
        }else{
          this.$emit('loadData',false);
        }
      }catch(e){
        console.log(e)
      }
    },

    /**
     * Author: Phạm Văn Đạt(17/12/2022)
     * Function: Xử lý load dữ liệu khi cuộn đến cuối trang
     * @param {*} event : Sự kiện scroll
     */
    handlerscrollDropDown(event){
      try{
        
        let scrollHeight = event.target.scrollHeight;
        let scrollTop = event.target.scrollTop;
        let clientHeight = event.target.clientHeight;

        if(clientHeight + scrollTop >= scrollHeight){
          this.$emit('loadData',true);
        }else{
          this.$emit('loadData',false);
        }
      }catch(e){
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(14/12/2022)
     * Function: Xử lý click icon sum
     * @param {*} e : Sự kiện click
     */
    clickIconSum(){
      try{  
        this.$emit('clickIconSum');
      }catch(e){
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(13/12/2022)
     * Function: Xử lý ẩn DropDown
     */
     handlerHideDropdown() {
      this.showDropDown = false;
    },

    /**
     * Author: Phạm Văn Đạt(12/12/2022)
     * Function: Xử lý click item
     * @param {*} item : thông tin dữ liệu vừa click
     */
    itemDropdownTable(item) {
      try {
        // xử lý chọn nhiều
        if(this.isMultiple == true){
          // kiểm tra xem item vừa chọn đã chọn trước đó hay chưa
          let checkExistsItem = this.checkExistItemData(item);

          // nếu chưa chọn thì thêm vào
          if (checkExistsItem == false) {
            let arr = [...this.modelValue, item];
            console.log(arr);
            this.$emit("update:modelValue", arr);
          }
          // nếu chọn rồi thì xóa đi
          else {
            this.deleteItemData(item);
          }

          console.log(this.modelValue);
        }else{
          // xử lý chọn 1
          this.$emit("update:modelValue", [item]);
          this.showDropDown = false;

          // lấy text hiển thị
          const result = this.listField.filter(l => l.view  == true);
          if(result){

            console.log(item)

            this.valutInput = item[result[0].fieldName];

            console.log(item[result[0].fieldName])
          }
        }
        
        console.log( this.showDropDown)

      } catch (e) {
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(12/12/2022)
     * Function: Xử lý xóa item truyền vào
     * @param {*} item : giá trị item đưa vào
     */
    deleteItemData(item){
      try{
        // chọn nhiều mới có chức năng này
        if(this.isMultiple == true){
          let index = null;

          // kiểm tra phần tử nằm ở vị trí nào
          for (let i = 0; i < this.modelValue.length; i++) {
            if (item == this.modelValue[i]) {
              index = i;
            }
          }

          // nếu tồn tại index tương tự với item thì xóa đi
          if (index != null) {
            let arrCurent = this.modelValue;

            // không thể thao tác trực tiếp với biến v-model => tạo biến trung gian
            arrCurent.splice(index, 1);
            this.$emit("update:modelValue", this.modelValue);
          }
        }
        
      }catch(e){
        console.log(e);
      }
    },

    /**
     * Author: Phạm Văn Đạt(12/12/2022)
     * Function: Xử lý kiểm tra item vừa click đã có trong list chưa
     * @param {*} item : giá trị item đưa vào
     */
    checkExistItemData(item) {
      try {
        for (let i = 0; i < this.modelValue.length; i++) {
          if (item == this.modelValue[i]) {
            return true;
          }
        }

        return false;
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style>
@import url(BaseComboboxMultiple.css);
</style>
