<template>
 <div class="input-container">
  <div class="input-container-field-label" v-if="(fieldLabel!=null)?true:false">
    <span>{{fieldLabel}}</span>
  </div>
  <div class="input-container-content" :style="'height: '+height+';width: '+width+'px'">
    <input :type="type" :value="value" :style="'height: '+height" :placeholder="placeholder">
    <button class="input-container-content-icon icon-20 icon-mr-10" :class="classIcon"
     v-if="(classIcon == null)?false:true">
  </button>
  </div>
  <div class="input-container-error" v-show="(errorText!=null)?true:false">
    <span>{{errorText}}</span>
  </div>
 </div>
</template>

<script>
export default {
  name: 'MInput',
  props: {
    fieldLabel:String,
    type: String,
    value:{
      Type: String,
      default: ""
    },
    classIcon:{
      Type:String,
      default:null
    },
    height:{
      Type:String,
      default:"32px"
    },
    placeholder:String,
    width:{
      Type:Number,
      default:240
    }
  },
  data(){
    return {
      errorText: null
    }
  },
  created() {
    console.log(this.height)
  }
}
</script>

<style>
@import url(MInputText.css)
</style>
