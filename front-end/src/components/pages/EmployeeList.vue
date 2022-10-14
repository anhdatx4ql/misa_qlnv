<template>
    <div class="content-top">
        <div class="content-top-left">
            <span class="content-top-left-title">Nhân viên</span>
        </div>
        <div class="content-top-right">
            <m-button><span>Thêm mới nhân viên</span></m-button>
        </div>
    </div>
    <div class=content-center>
        <div class="content-center-top">
            <m-input-text placeholder="Tìm theo mã, tên nhân viên"
            classIcon="input-icon-search">
            </m-input-text>
            <m-button class="content-center-button-left icon-ml-10">
                <span class="background-icon-reload icon-24 background-flex"></span>
            </m-button>
            <m-button class="content-center-button-left">
                <span class="background-icon-excel icon-24 background-flex"></span>
            </m-button>
        </div>
        <m-table></m-table>
        <m-paging></m-paging>
    </div>
    <div class="content-bottom"></div>
</template>
   
<script>
import {PAGING_ITEMS} from '../../constants.js'
export default {
    name: 'EmployeeList',
    props: {
    },
    data(){
        return{
            pagingItems:[]
        }
    },
    created(){
        this.pagingItems = PAGING_ITEMS;
    }
}
</script>
   
<style scoped>
span.content-top-left-title {
    color: #111;
    font-size: 24px;
    font-weight: 700;
}
.content-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 11px;
}

.content-center-top {
    display: flex;
    justify-content: end;
}

button.button.content-center-button-left {
    width: fit-content;
    background: none;
    min-width: 0;
    padding: 6px;
}

span.background-flex {
    display: flex;
}

.content-center-top {
    padding: 16px 16px 32px 16px;
}
</style>
   