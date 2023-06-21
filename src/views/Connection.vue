<!-- 客户 -->
<template>
    <div class="header">
        <div class="title">客户面板</div>
    </div>

    <el-form :inline="true" class="form">
        <el-form-item>
            <el-button @click="add()" type="primary" class="button">新增</el-button>
        </el-form-item>
    </el-form>
    <el-table :data="tableData" :border="parentBorder" style="width: 100%">
        <el-table-column type="expand">
        </el-table-column>
        <el-table-column label="项目编号" prop="c_id" />
        <el-table-column label="项目名称" prop="c_name" />
        <el-table-column label="测评次数" prop="t_number" />
        <el-table-column label="测评序号" prop="t_id" />
        <el-table-column label="测评名称" prop="t_name" />
        <el-table-column label="测评类别" prop="t_type" />
        <el-table-column label="报告状态" prop="t_status" />
        <el-table-column label="操作" width="300px">
            <template #default="scope">
                <el-button type="primary" link @click="stop(scope.row.c_id)">暂停</el-button>
                <el-button type="primary" link @click="resume(scope.row.c_id)">恢复</el-button>
                <el-button type="primary" link @click="create()">生成报告</el-button>
                <el-button type="primary" link @click="download()">报告下载</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="新增项目">
        <el-form :model="form" label-width="100px">
            <el-form-item label="项目编号">
                <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="项目名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="测评次数">
                <el-input v-model="form.count"></el-input>
            </el-form-item>
            <el-form-item label="项目序号">
                <el-input v-model="form.id1"></el-input>
            </el-form-item>
            <el-form-item label="测评名称">
                <el-input v-model="form.name1"></el-input>
            </el-form-item>
            <el-form-item label="测评类别">
                <el-input v-model="form.cate"></el-input>
            </el-form-item>
            <el-form-item label="报告状态">
                <el-input v-model="form.status"></el-input>
            </el-form-item>


        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus';
const dialogVisible = ref(false);
const form = ref({
    "id": "3",
    "name": "2023年年度测评",
    "count": "7",
    "id1": "3",
    "name1": "2023年年度测评",
    "cate": '重度测评',
    "status": "进行中"
})
const add = () => {

    dialogVisible.value = true;

}
const a = ref("")
const b = ref("")
const stop = (c_id) => {
    a.value = c_id - 1

    tableData.value[a.value].t_status = "暂停中"
    //ElMessage(tableData.value[a.value].t_status)
    ElMessage("暂停成功")

}
const resume = (c_id) => {
    b.value = c_id - 1
    tableData.value[b.value].t_status = "进行中"
    ElMessage("恢复成功")

}
const create = () => {

    ElMessage("生成报告成功")

}
const download = () => {

    ElMessage("报告下载成功")

}
const submitForm = () => {
    dialogVisible.value = false;
    tableData.value.push({
        c_id: '3',
        c_name: '2023年度测评',
        t_number: '7',
        t_id: '3',
        t_name: '2023年度测评',
        t_type: '重度测评',
        t_status: "进行中",


    })
    ElMessage("新增成功")
}
const parentBorder = ref(false)
const childBorder = ref(false)
const tableData = ref([
    {
        c_id: '1',
        c_name: '2022年度测评',
        t_number: '5',
        t_id: '1',
        t_name: '2022年度测评',
        t_type: '重度测评',
        t_status: "进行中",


    },
    {
        c_id: '2',
        c_name: '2023年度测评',
        t_number: '3',
        t_id: '2',
        t_name: '2023年度测评',
        t_type: '轻度测评',
        t_status: "进行中",

    }
])
</script>



<style lang="less" scoped>
.title {
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    font-size: 20px;
}

.el-table {
    margin-top: 20px;
}
</style>
