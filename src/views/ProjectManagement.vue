<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">项目管理</div>
        </div>
        <!-- 基于elementplus，form表单，inline模式，新增按钮、暂停按钮、恢复按钮、删除按钮、锁定按钮、解锁按钮 -->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button @click="add()" type="primary" class="button">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">暂停</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">恢复</el-button>
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
        </el-form>
        <!-- 基于elementplus，table表格，表格内容为项目编号、项目名称、测评次数、测评序号、测评名称、测评类别、操作（暂停、恢复、删除、锁定、解锁、报告生成、报告更新、下载） -->
        <el-table :data="tableData" class="table" width="100%">
            <el-table-column type="selection" />
            <el-table-column prop="projectNumber" label="项目编号" width="100"></el-table-column>
            <el-table-column prop="projectName" label="项目名称" width="100"></el-table-column>
            <el-table-column prop="evaluationNumber" label="测评次数" width="100"></el-table-column>
            <el-table-column prop="evaluationSerialNumber" label="测评序号" width="100"></el-table-column>
            <el-table-column prop="evaluationName" label="测评名称" width="100"></el-table-column>
            <el-table-column prop="evaluationCategory" label="测评类别" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template #default>
                    <el-button type="text">暂停</el-button>
                    <el-button type="text" >恢复</el-button>
                    <el-button type="text" >删除</el-button>
                    <el-button type="text" >锁定</el-button>
                    <el-button type="text" >解锁</el-button>
                    <el-button type="text">报告生成</el-button>
                    <el-button type="text" >报告更新</el-button>
                    <el-button type="text" >下载</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="100" class="pagination"></el-pagination>

        <!-- 基于elementplus弹框，内容为form表单，内容包含：客户名称的input、客户logo的图片上传、客户联系人的input、联系人职位的input、练习方式的input、项目说明的textare -->
        <el-dialog v-model="dialogVisible" title="新增项目">
            <!-- <el-form :model="form" :rules="rules" ref="form" label-width="100px"> here ref should be diff from model ! -->
            <el-form :model="form" ref="formref" :rules="rules" label-width="100px">
                <el-form-item label="客户名称" prop="customerName">
                    <el-input type="text" v-model="form.customerName"></el-input>
                </el-form-item>
                <el-form-item label="客户logo" prop="customerLogo">
                    <!-- <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="false"
                        :file-list="[]">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitForm('form')">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip"></div>
                    </el-upload> -->
                </el-form-item>
                <el-form-item label="客户联系人" prop="customerContact">
                    <el-input v-model="form.customerContact"></el-input>
                </el-form-item>
                <el-form-item label="联系人职位" prop="contactPosition">
                    <el-input v-model="form.contactPosition"></el-input>
                </el-form-item>
                <el-form-item label="练习方式" prop="practiceMode">
                    <el-input v-model="form.practiceMode"></el-input>
                </el-form-item>
                <el-form-item label="项目说明" prop="projectDescription">
                    <el-input type="textarea" v-model="form.projectDescription"></el-input>
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

const dialogVisible = ref(false);
//table数据
const tableData = ref([
    {
        projectNumber: '001',
        projectName: '项目1',
        evaluationNumber: '1',
        evaluationSerialNumber: '1',
        evaluationName: '测评1',
        evaluationCategory: '类别1'
    },
    {
        projectNumber: '002',
        projectName: '项目2',
        evaluationNumber: '2',
        evaluationSerialNumber: '2',
        evaluationName: '测评2',
        evaluationCategory: '类别2'
    },
    {
        projectNumber: '003',
        projectName: '项目3',
        evaluationNumber: '3',
        evaluationSerialNumber: '3',
        evaluationName: '测评3',
        evaluationCategory: '类别3'
    },
    {
        projectNumber: '004',
        projectName: '项目4',
        evaluationNumber: '4',
        evaluationSerialNumber: '4',
        evaluationName: '测评4',
        evaluationCategory: '类别4'
    },
    {
        projectNumber: '005',
        projectName: '项目5',
        evaluationNumber: '5',
        evaluationSerialNumber: '5',
        evaluationName: '测评5',
        evaluationCategory: '类别5'
    },
    {
        projectNumber: '006',
        projectName: '项目6',
        evaluationNumber: '6',
        evaluationSerialNumber: '6',
        evaluationName: '测评6',
        evaluationCategory: '类别6'
    },
    {
        projectNumber: '007',
        projectName: '项目7',
        evaluationNumber: '7',
        evaluationSerialNumber: '7',
        evaluationName: '测评7',
        evaluationCategory: '类别7'
    },
    {
        projectNumber: '008',
        projectName: '项目8',
        evaluationNumber: '8',
        evaluationSerialNumber: '8',
        evaluationName: '测评8',
        evaluationCategory: '类别8'
    },
    {
        projectNumber: '009',
        projectName: '项目9',
        evaluationNumber: '9',
        evaluationSerialNumber: '9',
        evaluationName: '测评9',
        evaluationCategory: '类别9'
    }]);
const add = () => {
    dialogVisible.value = true;
}
const cancelForm = () => {
    // couldn't put reset in add()
    if(formref){
        const form = unref(formref)
        form.resetFields();
    }
    dialogVisible.value = false
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
const formref = ref(null)
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
// const submitForm = (formName) => {
//     console.log(formName);
//     console.log(form.value);
// }
// 提交验证！
const submitForm = async () => {
    // need unref first !! then check
    const form = unref(formref)
    if(!form) return
    try{
        await form.validate()
        console.log('huhuhuuuu',form.value)
    } catch (error) {
        console.log('noooo',form.value)
    }
}
//图片上传
// const imageUrl = ref('');
// const handleAvatarSuccess = (res, file) => {
//     imageUrl.value = URL.createObjectURL(file.raw);
// };
// const beforeAvatarUpload = (file) => {
//     const isJPG = file.type === 'image/jpeg';
//     const isLt2M = file.size / 1024 / 1024 < 2;

//     if (!isJPG) {
//         this.$message.error('上传头像图片只能是 JPG 格式!');
//     }
//     if (!isLt2M) {
//         this.$message.error('上传头像图片大小不能超过 2MB!');
//     }
//     return isJPG && isLt2M;
// };

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