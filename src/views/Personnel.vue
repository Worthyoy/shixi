<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">人员管理</div>
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
                <el-button type="primary" class="button">冻结</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">解冻</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">导入</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">下载</el-button>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="编号/人名"></el-input>
            </el-form-item>
            <el-form-item>
                
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">查询</el-button>
            </el-form-item>



        </el-form>
        <!-- 基于elementplus，table表格，表格内容为编号、状态、上次测试时间、创建日期、操作（修改、删除、测试、锁定、解锁） -->
        <el-table :data="tableData" style="width: 100%" class="table">
            <el-table-column type="selection" />
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="danwei" label="单位" width="180">
            </el-table-column>
            <el-table-column prop="bumen" label="部门" width="180">
            </el-table-column>
            <el-table-column prop="leibie" label="触发类别" width="180">
            </el-table-column>
            <el-table-column prop="shijian" label="触发时间" width="180">
            </el-table-column>
            <el-table-column label="操作" width="380">
                <template #default>
                    <el-button type="primary" @click="handleEdit(scope.row)" size="small">查看</el-button>
                    <el-button type="primary" @click="handleDelete(scope.row)" size="small">删除</el-button>
                    <el-button type="primary" @click="handleTest(scope.row)" size="small">修改</el-button>
                    <el-button type="primary" @click="handleLock(scope.row)" size="small">冻结</el-button>
                    <el-button type="primary" @click="handleUnlock(scope.row)" size="small">解冻</el-button>
                </template>
            </el-table-column>
        </el-table>
       
        
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="100" class="pagination"></el-pagination>

        <!-- 基于elementplus弹框，内容为form表单，内容包含：单位名称的select、部门名称的select、用户名的input、邮箱的input、角色的input、用户密码的input、岗位类别的select、职位的input、手机的input、备注的input、下载的按钮、导入的按钮 -->
        <el-dialog v-model="dialogVisible" title="新增">
            <el-form :model="form"  ref="form" label-width="80px" class="form">
                <el-form-item label="单位名称" >
                    <el-input v-model="form.customerName" placeholder="请输入单位名称"></el-input>
                </el-form-item>
                <el-form-item label="部门名称" prop="customerLogo">
                    <el-input v-model="form.customerLogo" placeholder="请输入部门名称"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="customerContact">
                    <el-input v-model="form.customerContact" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="contactPosition">
                    <el-input v-model="form.contactPosition" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="practiceMode">
                    <el-input v-model="form.practiceMode" placeholder="请输入角色"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="projectDescription">
                    <el-input v-model="form.projectDescription" placeholder="请输入用户密码"></el-input>
                </el-form-item>
                <el-form-item label="岗位类别" prop="projectDescription">
                    <el-input v-model="form.projectDescription" placeholder="请输入岗位类别"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="projectDescription">
                    <el-input v-model="form.projectDescription" placeholder="请输入职位"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="projectDescription">
                    <el-input v-model="form.projectDescription" placeholder="请输入手机"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="projectDescription">
                    <el-input v-model="form.projectDescription" placeholder="请输入备注"></el-input>
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
        name: '王小虎',
        danwei: '21所',
        bumen: '软件部门',
        leibie: 'a类别',
        shijian: '2021-2-1',
    },
    {
        name: '王小虎',
        danwei: '21所',
        bumen: '软件部门',
        leibie: 'a类别',
        shijian: '2021-2-1',
    },
    {
        name: '王小虎',
        danwei: '21所',
        bumen: '软件部门',
        leibie: 'a类别',
        shijian: '2021-2-1',
    },
    {
        name: '王小虎',
        danwei: '21所',
        bumen: '软件部门',
        leibie: 'a类别',
        shijian: '2021-2-1',
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