<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">邮件模板管理</div>
        </div>
        <!-- 基于elementplus，form表单，inline模式，新增按钮、删除按钮、锁定按钮、解锁按钮、创建日期的时间选择器、存续状态的下拉选择框-->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button @click="add()" type="primary" class="button">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">锁定</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">解锁</el-button>
            </el-form-item>
            <el-form-item>
                <el-date-picker type="date" placeholder="选择日期" v-model="date" class="date"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-select v-model="status" placeholder="请选择">
                    <el-option label="存续" value="存续"></el-option>
                    <el-option label="暂停" value="暂停"></el-option>
                    <el-option label="删除" value="删除"></el-option>
                </el-select>
            </el-form-item> 
        </el-form>
        <!-- 基于elementplus，table表格，表格内容为编号、邮件标题、创建时间、有无附件、存续状态、备注 -->
        <el-table :data="tableData" style="width: 100%" class="table">
            <el-table-column type="selection" />
            <el-table-column prop="title" label="邮件标题" width="180"></el-table-column>
            <el-table-column prop="time" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="attachment" label="有无附件" width="180"></el-table-column>
            <el-table-column prop="status" label="存续状态" width="180"></el-table-column>
            <el-table-column prop="remark" label="备注" width="180"></el-table-column>
            <el-table-column label="操作" width="180">
                <template #default>
                    <el-button type="text" @click="edit(scope.row)">预览</el-button>
                    <el-button type="text" @click="deleteRow(scope.row)">删除</el-button>
                    <el-button type="text" @click="deleteRow(scope.row)">修改</el-button>
                    <el-button type="text" @click="deleteRow(scope.row)">锁定</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="100" class="pagination"></el-pagination>

        <!-- 基于elementplus弹框，内容为form表单，内容包含：主题的input，内容的textare、附件的上传、备注的textare -->
        <el-dialog v-model="dialogVisible" title="新增">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
                <el-form-item label="主题" prop="customerName">
                    <el-input v-model="form.customerName" placeholder="请输入主题"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="customerLogo">
                    <el-input v-model="form.customerLogo" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="附件" prop="customerContact">
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="false"
                        :file-list="[]">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitForm('form')">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip"></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注" prop="contactPosition">
                    <el-input v-model="form.contactPosition" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    <el-button @click="dialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        
        
    </div>
</template>
<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false);
//table数据
const tableData = ref([
    {
        title:'邮件标题',
        time:'2021-08-09',
        attachment:'有',
        status:'存续',
        remark:'备注'
    },
    {
        title:'邮件标题',
        time:'2021-08-09',
        attachment:'有',
        status:'存续',
        remark:'备注'
    },
    {
        title:'邮件标题',
        time:'2021-08-09',
        attachment:'有',
        status:'存续',
        remark:'备注'
    }
])
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
    customerName: [
        { required: true, message: '请输入客户名称', trigger: 'blur' }
    ],
    customerLogo: [
        { required: true, message: '请上传客户logo', trigger: 'blur' }
    ],
    customerContact: [
        { required: true, message: '请输入客户联系人', trigger: 'blur' }
    ],
    contactPosition: [
        { required: true, message: '请输入联系人职位', trigger: 'blur' }
    ],
    practiceMode: [
        { required: true, message: '请输入练习方式', trigger: 'blur' }
    ],
    projectDescription: [
        { required: true, message: '请输入项目说明', trigger: 'blur' }
    ]
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