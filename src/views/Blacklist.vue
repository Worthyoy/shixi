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
                <el-button type="primary" class="button">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">禁用</el-button>
            </el-form-item>
        </el-form>
        <!-- 基于elementplus，table表格，表格内容为项目编号、项目名称、测评次数、测评序号、测评名称、测评类别、操作（暂停、恢复、删除、锁定、解锁、报告生成、报告更新、下载） -->
        <el-table :data="tableData" class="table" width="100%">
            <el-table-column type="selection" />
            <el-table-column prop="b_id" label="编号" width="100"></el-table-column>
            <el-table-column prop="b_type" label="类型" width="100"></el-table-column>
            <el-table-column prop="b_value" label="值" width="100"></el-table-column>
            <el-table-column prop="b_addpeople" label="添加人" width="100"></el-table-column>
            <el-table-column prop="b_addtime" label="添加时间" width="100"></el-table-column>
            <el-table-column prop="b_status" label="状态" width="100"></el-table-column>
            <el-table-column prop="b_remark" label="备注" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button link type="primary">{{scope.row.b_status === '禁用' ? '启用' : '禁用'}}</el-button>
                    <el-button link type="primary" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="100" class="pagination"></el-pagination>

        <!-- 基于elementplus弹框，内容为form表单，内容包含：客户名称的input、客户logo的图片上传、客户联系人的input、联系人职位的input、练习方式的input、项目说明的textare -->
        <el-dialog v-model="dialogVisible" title="新增项目">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="编号" prop="b_id">
                    <el-input v-model="form.b_id"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="b_type">
                    <el-input v-model="form.b_type"></el-input>
                </el-form-item>
                <el-form-item label="值" prop="b_value">
                    <el-input v-model="form.b_value"></el-input>
                </el-form-item>
                <el-form-item label="添加人" prop="b_addpeople">
                    <el-input v-model="form.b_addpeople"></el-input>
                </el-form-item>
                <el-form-item label="添加时间" prop="b_addtime">
                    <el-input v-model="form.b_addtime"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="b_remark">
                    <el-input v-model="form.b_remark"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="b_status">
                    <el-select v-model="form.b_status" >
                        <el-option label="禁用" value="1"/>
                        <el-option label="启用" value="1"/>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>
<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false);
//table数据
const tableData = ref([
    {
        b_id: '001',
        b_type: 'IP',
        b_value: '1',
        b_addpeople: '某某某',
        b_addtime: '2023-02-05',
        b_status: '启用',
        b_remark: '无'
    },
    {
        b_id: '002',
        b_type: 'UA',
        b_value: '1',
        b_addpeople: '某某某',
        b_addtime: '2023-02-05',
        b_status: '启用',
        b_remark: '无'
    },
    {
        b_id: '003',
        b_type: 'JWTKEY',
        b_value: '1',
        b_addpeople: '某某某',
        b_addtime: '2023-02-05',
        b_status: '禁用',
        b_remark: '无'
    },
    {
        b_id: '004',
        b_type: 'IP',
        b_value: '1',
        b_addpeople: '某某某',
        b_addtime: '2023-02-05',
        b_status: '禁用',
        b_remark: '无'
    },
    {
        b_id: '005',
        b_type: 'IP',
        b_value: '1',
        b_addpeople: '某某某',
        b_addtime: '2023-02-05',
        b_status: '启用',
        b_remark: '无'
    },{
        b_id: '006',
        b_type: 'IP',
        b_value: '1',
        b_addpeople: '某某某',
        b_addtime: '2023-02-05',
        b_status: '启用',
        b_remark: '无'
    },
    {
        b_id: '007',
        b_type: 'IP',
        b_value: '1',
        b_addpeople: '某某某',
        b_addtime: '2023-02-05',
        b_status: '禁用',
        b_remark: '无'
    },
   
]);
const add = () => {
    dialogVisible.value = true;
}
//表单
const form = ref({
    customerName: '',
    customerLogo: '',
    customerContact: '',
    contactPosition: '',
    practiceMode: '',
    projectDescription: ''
});
const rules = ref({
    b_id: [
        { required: true, message: '请输入编号', trigger: 'blur' }
    ],
    b_type: [
        { required: true, message: '请上传类型', trigger: 'blur' }
    ],
    b_value: [
        { required: true, message: '请输入值', trigger: 'blur' }
    ],
    b_addpeople: [
        { required: true, message: '请输入添加人', trigger: 'blur' }
    ],
    b_addtime: [
        { required: true, message: '请输入添加时间', trigger: 'blur' }
    ],
    b_remark: [
        { required: true, message: '请输入备注', trigger: 'blur' }
    ],
    b_status: [
        { required: true, message: '请选择状态', trigger: 'blur' }
    ],
});
const submitForm = (formName) => {
    console.log(formName);
}
//图片上传
const imageUrl = ref('');
const handleAvatarSuccess = (res, file) => {
    imageUrl.value = URL.createObjectURL(file.raw);
};
const beforeAvatarUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
};

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