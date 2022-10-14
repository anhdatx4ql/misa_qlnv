<template>
 <div class="combobox" v-click-away="handlerHideDropdown" ref="combobox">
  <div class="combobox-container" :style="'width: '+width+'px'">
    <div class="combobox-container-input">
      <input type="text" :disabled="(disabled!=null)?'disabled':''" :value="cbxValue.name" style="width:156px;">
    </div>
    <div class="combobox-actions">
      <button class="combobox-actions-button" @click="checkShowDropDown = !checkShowDropDown">
        <span class="background-icon-arrow-bottom icon-16" :class="{'background-icon-arrow-bottom-active':checkShowDropDown}"
        :style="(checkShowDropDown==true)?'transform: rotate(180deg);':'transform: rotate(0)'">
      </span>
      </button>
    </div>
  </div>
  <div class="dropdown-container" v-show="checkShowDropDown" :style="position+': 34px'">
    <div class="dropdown-items">
      <div class="dropdown-item" v-for="cbxListValue in cbxListValues" :key="cbxListValue.id">
        <m-button @click="selectValueCombobox(cbxListValue)" 
        :value="cbxListValue.id" :class="{'button-active':(cbxListValue.id == cbxValue.id)?true:false}">
        <span>{{cbxListValue.name}}</span>
        </m-button>
      </div>
    </div>
  </div>
 </div>
</template>

<script>
export default {
  name: 'MCombobox',
  props: {

    // Các giá trị có thể có
    listValues:Array(Object),

    // giá trị hiện tại
    value:Object,

    // chiều rộng
    width:{
      Type:Number,
      default:200
    },

    // input có nhập được hay không
    disabled:String,

    // top | bottom
    position:String
  },
  data(){
    return{
      cbxListValues:[],
      cbxValue:[],
      checkShowDropDown:false
    }
  },
  created(){
    this.cbxListValues = this.listValues;
    this.cbxValue = this.value;
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt
     * Function: Xử lý lấy giá trị khi click item dropdown
     * @param {} el 
     */
    selectValueCombobox(el){
      this.cbxValue = el;
      this.checkShowDropDown=false;
    },
    /**
     * Author: Phạm Văn Đạt
     * Function: Xử lý ẩn DropDown
     */
    handlerHideDropdown(){
      this.checkShowDropDown = false;
    }
  },
}
</script>

<style>
@import url(MCombobox.css)
</style>
