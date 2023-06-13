<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">邮件管理</div>
        </div>
        <!-- 基于elementplus，form表单，inline模式，新增按钮、删除按钮、锁定按钮、解锁按钮、创建日期的时间选择器、存续状态的下拉选择框-->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button @click="add()" type="primary" class="button">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">测试</el-button>
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
                    <el-option label="可用" value="可用"></el-option>
                    <el-option label="不可用" value="不可用"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">查询</el-button>
            </el-form-item>



        </el-form>
        <!-- 基于elementplus，table表格，表格内容为编号、状态、上次测试时间、创建日期、操作（修改、删除、测试、锁定、解锁） -->
        <el-table :data="tableData" style="width: 100%" class="table">
            <el-table-column type="selection" />
            <el-table-column prop="name" label="状态" width="180">
            </el-table-column>
            <el-table-column prop="time1" label="上次测试时间" width="180">
            </el-table-column>
            <el-table-column prop="time2" label="创建日期" width="180">
            </el-table-column>
            <el-table-column label="操作" width="380">
                <template #default>
                    <el-button type="primary" @click="handleEdit(scope.row)" size="small">修改</el-button>
                    <el-button type="primary" @click="handleDelete(scope.row)" size="small">删除</el-button>
                    <el-button type="primary" @click="handleTest(scope.row)" size="small">测试</el-button>
                    <el-button type="primary" @click="handleLock(scope.row)" size="small">锁定</el-button>
                    <el-button type="primary" @click="handleUnlock(scope.row)" size="small">解锁</el-button>
                </template>
            </el-table-column>
        </el-table>
       
        
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="100" class="pagination"></el-pagination>

        <!-- 基于elementplus弹框，内容为form表单，内容包含：名称的input，图标的上传、地址的input、端口的input、加密协议的input、用户名的input、密码的input、备注的textare -->
        <el-dialog v-model="dialogVisible" title="新增">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="form">
                <el-form-item label="名称" prop="customerName">
                    <el-input v-model="form.customerName" placeholder="请输入客户名称"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="customerLogo">
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
                <el-form-item label="地址" prop="customerContact">
                    <el-input v-model="form.customerContact" placeholder="请输入客户联系人"></el-input>
                </el-form-item>
                <el-form-item label="端口" prop="contactPosition">
                    <el-input v-model="form.contactPosition" placeholder="请输入联系人职位"></el-input>
                </el-form-item>
                <el-form-item label="加密协议" prop="practiceMode">
                    <el-input v-model="form.practiceMode" placeholder="请输入练习方式"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="projectDescription">
                    <el-input v-model="form.projectDescription" placeholder="请输入项目说明"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="projectDescription">
                    <el-input v-model="form.projectDescription" placeholder="请输入项目说明"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="projectDescription">
                    <el-input v-model="form.projectDescription" placeholder="请输入项目说明"></el-input>
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
const tableData = ref([{
    name:'存续',
    time1:'2021-08-01',
    time2:'2021-08-01'
},
{
    name:'存续',
    time1:'2021-08-01',
    time2:'2021-08-01'
},
{
    name:'存续',
    time1:'2021-08-01',
    time2:'2021-08-01'
},
{
    name:'存续',
    time1:'2021-08-01',
    time2:'2021-08-01'
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