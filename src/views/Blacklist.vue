<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">黑名单管理</div>
        </div>
        <!-- 基于elementplus，form表单，inline模式，新增按钮、暂停按钮、恢复按钮、删除按钮、锁定按钮、解锁按钮 -->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button @click="add()" type="primary" class="button">添加</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="muldelete()" type="primary" class="button">删除</el-button>
            </el-form-item>
        </el-form>
        <!-- 基于elementplus，table表格，表格内容为项目编号、项目名称、测评次数、测评序号、测评名称、测评类别、操作（暂停、恢复、删除、锁定、解锁、报告生成、报告更新、下载） -->
        <el-table ref="multipleTableRef" :row-key="getRowKeys" @selection-change="handleSelectionChange" :data="tableData" class="table" width="100%">
            <el-table-column :reserve-selection="true" type="selection" />
            <el-table-column prop="id" label="编号" width="40" align="center"></el-table-column>
            <el-table-column prop="jti" label="tokenID" width="300" align="center"></el-table-column>
            <el-table-column prop="uid" label="用户id" width="40" align="center"></el-table-column>
            <el-table-column prop="username" label="用户名" width="80" align="center"></el-table-column>
            <el-table-column prop="createdbyuid" label="创建者ID" align="center" width="40"></el-table-column>
            <el-table-column prop="createusername" label="创建者" width="80" align="center"></el-table-column>
            <el-table-column prop="operatetime" label="操作时间" width="180" align="center"></el-table-column>
            <el-table-column prop="comments" label="备注" width="100" header-align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="80">
                <template #default="scope">
                    <!-- <el-button link type="primary">{{ scope.row.b_status === '禁用' ? '启用' : '禁用' }}</el-button> -->
                    <el-button link type="primary" @click="handleDelete(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="100" class="pagination"></el-pagination>

        <!-- 基于elementplus弹框，内容为form表单，内容包含：客户名称的input、客户logo的图片上传、客户联系人的input、联系人职位的input、练习方式的input、项目说明的textare -->
        <el-dialog v-model="dialogVisible" title="新增项目">
            <el-form :model="form" :rules="rules" ref="formref" label-width="100px">
                <el-form-item label="用户id" prop="uid">
                    <el-input v-model="form.uid" style="width: 200px;" />
                </el-form-item>
                <el-form-item label="备注" prop="comments">
                    <el-input v-model="form.comments" type="textarea"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelForm()">取 消</el-button>
                <el-button type="primary" @click="submitForm()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script setup>
import { ref,unref } from 'vue'
import { getlist, getItem, addlist, delItem, mulDel } from '../api/blacklist'
const dialogVisible = ref(false);
//table数据
const formref = ref(null)
const tableData = ref([]);
const getTabledata = () => {
    getlist().then(res => {
        console.log('get blacklist!',res.data)
        tableData.value=res.data.children
    })
}
getTabledata()
const add = () => {
    dialogVisible.value = true;
}
//表单
const form = ref({
    uid: '',
    comments: ''
});
const rules = ref({
    uid: [
        { required: true, message: '请输入用户id', trigger: 'blur' }
    ]
});
const submitForm = async () => {
    const refform = unref(formref)
    if(!refform) return
    try{
        await refform.validate()
        addlist(form.value).then(res => {
            console.log('post new form success!',res.data)
            alert(res.data)
            getTabledata()
            dialogVisible.value = false
            refform.resetFields()
        })
    } catch (error) {
        console.log('no! form add failed! ',error)
    }
}
const cancelForm = () => {
    if(formref){
        const form = unref(formref)
        form.resetFields();
    }
    dialogVisible.value = false
}
// 多选框
const multipleTableRef = ref()
const multipleSelection = ref([])
const select_order_number = ref('')
const select_orderId = ref([])
const getRowKeys = (row) => {
    return row.id;
}
const handleSelectionChange = (val) => {
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
    console.log(select_orderId.value);
    console.log(select_order_number.value)
    console.log(multipleSelection.value)
}
// 删除
const handleDelete = (id) => {
    delItem(id).then(res => {
        alert('sucdel')
        getTabledata()
    })
}
const muldelete = () => {
    console.log(multipleSelection.value)
    console.log(select_orderId.value)
    // const data = {data:}
    mulDel(select_orderId.value).then(res => {
        multipleTableRef.value.clearSelection()
        getTabledata()
    }, err => {
        console.log(err)
    })
}
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