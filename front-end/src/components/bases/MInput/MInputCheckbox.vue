<template>
  <div class="checkbox">
    <label class="checkbox-container" :for="id">
      <input type="checkbox" :value="value" :id="id" style="display:none" @input="$emit('update:value',$event.target.value)">
      <span class="checkbox-container-icon"></span>
      <span class="checkbox-container-text" v-show="(text != null)?true:false">{{text}}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'MInputCheckbox',
  props: {
    value: String,
    text:{
      Type:String,
      default: null
    },
    id:String
  },
  emits:['update:value'],
  created() {

  },
  methods: {
  }
}
</script>

<style scoped>
  .checkbox {
      display: inline-block;
      background: white;
      width: 18px !important;
  }
  .checkbox-container-text{
    padding-left:10px;
    height:18px;
  }
  span.checkbox-container-icon {
    width: 16px;
    height: 16px;
    border: 1px solid #afafaf;
    display: flex;
    cursor: pointer;
  }

  label.checkbox-container {
      display: flex;
      align-items: center;
      justify-content: start;
      cursor: pointer;
  }

  input[type="checkbox"]:checked + .checkbox-container-icon {
    animation-name: input-checked;
    animation-duration: 0.2s;
    background: url(../../../assets/img/Sprites.64af8f61.svg) no-repeat -1224px -361px;
  }

  input[type="checkbox"]:not(:checked) + .checkbox-container-icon{
    animation-name: input-unchecked;
    animation-duration: 0.2s;
  }

  @keyframes input-checked {
    from {transform: rotate(-90deg);}
    to {transform: rotate(0);}
  }

  @keyframes input-unchecked {
    from {transform: rotate(0);}
    to {transform: rotate(-90deg);}
  }

</style>
