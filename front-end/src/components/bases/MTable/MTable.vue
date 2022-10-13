<template>
 <div class="table-content">

  <div class="table-container" ref="table">

      <div class="table-header">
        <div class="thead">
          <div class="tr" ref="trThead">

            <div class="th" style="width:40px">
              <m-input-checkbox style="width:40px" id="1"></m-input-checkbox>
            </div>

            <div class="th" v-for="field in fields" :key="field.name" :style="'width:'+field.width+'px'">{{field.name}}</div>
          
          </div>
        </div>
      </div>
      <div class="table-body">
        <div class="tbody" ref="tbody" @scroll="hanclerScroll">
          <div class="tr" v-for="employee in employees" :key="employee">

            <div class="td" style="width:40px">
              <m-input-checkbox style="width:40px" :id="employee"></m-input-checkbox>
            </div>
            <div class="td" v-for="field in fields" :key="field.name" :style="'width:'+field.width+'px'">{{field.name}}</div>
          
          </div>
         
        </div>
      </div>
    </div>
 </div>
</template>

<script>
import {TABLE_FIELDS} from "../../../constants"

export default {
  name: 'MTable',
  props: {
  },
  data(){
    return {
      // các trường hiển thị dữ liệu
      fields: [],
      employees:15
    }
  },
  created(){
    this.fields = TABLE_FIELDS;
  },
  methods: {
    hanclerScroll(e){
      this.$refs.trThead.style.transform = "translateX(-"+e.target.scrollLeft+"px)"

    }
  },
  mounted(){
    
  },
  computed: {
  
  }
  
}
</script>

<style scoped>
@import url(MTable.css)
</style>
