<template>
  <div class="combobox-field" v-show="(comboboxField !=null)">
    {{comboboxField}} <span v-show="iconRed" style="color:red;"> *</span>
  </div>
 <div class="combobox" v-click-away="handlerHideDropdown" ref="combobox">
  <div class="combobox-container" :style="'width: '+width+'px'">
    <div class="combobox-container-input" v-show="icon">
      <input type="text" :disabled="disabled ? '' : disabled" @input.prevent="handlerInput"
      :value="cbxValue.name" style="width:156px;">
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
      <div class="dropdown-item" v-for="(cbxListValue, index) in cbxListValues" :key="cbxListValue.id">
        <m-button @click="selectValueCombobox(cbxListValue)" class="button-combobox"
        :tabindex="index"
        :value="cbxListValue.id" 
        :class="{'button-active':(checkFocusItemSearch == cbxListValue.id || cbxListValue.id == cbxValue.id)?true:false}">
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
    value:{
      Type:Object,
      default:{
        id:null,
        name:null
      }
    },

    // chiều rộng
    width:{
      Type:Number,
      default:200
    },

    // input có nhập được hay không
    disabled:Boolean,

    // top | bottom
    position:String,
    icon:{
      Type: Boolean,
      default:true
    },

    //comboboxField
    comboboxField:{
      Type:String,
      default:null
    },

    // kiểm tra có dấu * hay không
    iconRed:{
      Type:String,
      default:false
    }
  },
  data(){
    return{
      // danh sách giá trị hiển thị
      cbxListValues:[],

      // giá trị hiện tại
      cbxValue:{},

      // kiểm tra xem drop down có hiển thị hay không
      checkShowDropDown:false,

      // lấy 1 giá trị để focus đúng với giá trị gần nhất
      checkFocusItemSearch:{
        Type:Number,
        default:-1
      }
    }
  },
  created(){
    // khởi tạo giá trị danh sách dropdown
    this.cbxListValues = this.listValues;

    // khởi tạo giá trị hiện tại
    this.cbxValue = this.value;
  },
  methods: {
    /**
     * Author: Phạm Văn Đạt
     * Function: Xử lý lấy giá trị khi click item dropdown
     * @param {} el 
     */
    selectValueCombobox(el){
      this.checkFocusItemSearch =null;
      this.cbxValue = el;
      this.checkShowDropDown=false;
    },
    /**
     * Author: Phạm Văn Đạt
     * Function: Xử lý ẩn DropDown
     */
    handlerHideDropdown(){
      this.checkShowDropDown = false;
    },

    /**
     * Author: Phạm Văn Đạt
     * Function: Xử lý tìm kiếm dữ liệu trong combobox
     * @param {*} event 
     */
    handlerInput(event){
      let text = event.target.value;

      this.cbxValue= {
        id:null,
        name:text
      };
      let me = this;

      // xét giá trị null cho text focus
      me.checkFocusItemSearch = -1;
      console.log(me.checkFocusItemSearch );

      if(text){
        setTimeout(() => {
        me.cbxListValues = [];

        // tìm kiếm những giá trị giống giá trị tìm kiếm đưa lên đầu
        for(let i=0;i<me.listValues.length;i++){
          console.log(me.listValues[i].name.search(text))
          if(me.listValues[i].name.search(text) != -1){
            me.cbxListValues.push(me.listValues[i])
          }
        }

        // những giá trị khác thì đưa về sau
        for(let i=0;i<me.listValues.length;i++){
          if(me.listValues[i].name.search(text) == -1){
            me.cbxListValues.push(me.listValues[i])
          }
        }

        // gán focus vào giá trị gần giá trị tìm kiếm nhất
        if(text){
          me.checkFocusItemSearch = me.cbxListValues[0].id;
        }
        
      }, 300);
      }
      
    }
  },
}
</script>

<style>
@import url(MCombobox.css)
</style>
