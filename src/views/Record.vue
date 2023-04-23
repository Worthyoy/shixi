<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">日志管理</div>
        </div>
        <!-- 基于elementplus，form表单，inline模式，新增按钮、暂停按钮、恢复按钮、删除按钮、锁定按钮、解锁按钮 -->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button type="primary" class="button">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-input placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">查询</el-button>
            </el-form-item>
        </el-form>
        
        <el-table :data="tableData" class="table" width="100%">
            <el-table-column type="selection" />
            <el-table-column prop="type" label="类型" ></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="100" class="pagination"></el-pagination>

        
    </div>
</template>
<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false);
//table数据
const tableData = ref([{
    type: '登陆',
    time: '2021-01-01 12:00:00',
},{
    type: '登陆',
    time: '2021-01-01 12:00:00',
}]);


</script>
<style scoped>
.title {
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    font-size: 20px;
}

.el-table {
    margin-bottom: 20px;
}
</style>