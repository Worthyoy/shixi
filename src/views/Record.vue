<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">日志管理</div>
        </div>
        <!-- 基于elementplus，form表单，inline模式，新增按钮、暂停按钮、恢复按钮、删除按钮、锁定按钮、解锁按钮 -->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button type="primary" class="button" @click="deleteRecord">删除</el-button>
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

        <el-table ref="multipleTableRef" :data="currentTableData" class="table" width="100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" />
            <el-table-column prop="name" label="用户"></el-table-column>
            <el-table-column prop="type" label="类型"></el-table-column>
            <el-table-column prop="time" label="时间"></el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" class="pagination"
            @current-change="handleCurrentChange" style="position: absolute;bottom: 4vh;"></el-pagination>


    </div>
</template>
<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';
onMounted(async () => {
    await getTabledata()
    getCurrentPageData(1)
    total.value = tableData.value.length;
    console.log(total.value)
})
let currentPage = ref(1);
let pageSize = ref(5);
let total = ref(0);
let currentTableData = ref([])
function getCurrentPageData(val) {
    let begin = (val - 1) * pageSize.value;
    let end = val * pageSize.value;
    currentTableData.value = tableData.value.slice(
        begin,
        end
    );
    console.log(currentTableData.value);
}
const multipleTableRef = ref()
const select_orderId = ref([])
const multipleSelection = ref([])
const select_order_number = ref('')

const handleSelectionChange = (val) => {
    console.log('change');
    // 来回切换页面，也保留上次选中情况
    multipleSelection.value = val;
    select_order_number.value = multipleSelection.value.length;
    select_orderId.value = [];
    if (val) {
        undefined;
        val.forEach((row) => {
            undefined;
            if (row) {
                undefined;
                select_orderId.value.push(row.id);
            }
        });
    }
}
async function getTabledata() {
    await axios.get('/api/log/sign_in').then((res) => {
        tableData.value = res.data.children.map((value) => {
            return {
                name: value.username,
                type: value.action,
                time: value.timestamp,
                id: value.id
            }
        });
    })
}
function deleteRecord() {
    select_orderId.value.forEach(async (item) => {
        await axios.delete('/api/log/register/' + item).then(async (res) => {
            await getTabledata()
            getCurrentPageData(currentPage.value)
            total.value = tableData.value.length;
        })
    })

    // axios.delete('/api/log/sign_in').then((res) => {
    //     tableData.value = res.data.children.map((value) => {
    //         return {
    //             name: value.username,
    //             type: value.action,
    //             time: value.timestamp,

    //         }
    //     });
    // })
}
function handleCurrentChange(val) {
    getCurrentPageData(val);
    currentPage.value = val;
};
const dialogVisible = ref(false);
//table数据
const tableData = ref([{
    type: '登陆',
    time: '2021-01-01 12:00:00',
}, {
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