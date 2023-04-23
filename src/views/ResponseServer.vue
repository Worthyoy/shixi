<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">响应服务器管理</div>
        </div>
        <!-- 基于elementplus，form表单，inline模式，新增按钮、删除按钮、锁定按钮、解锁按钮、创建日期的时间选择器、存续状态的下拉选择框-->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button @click="add()" type="primary" class="button">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">修改</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 基于elementplus，table表格，表格内容为编号、标题、类别、协议、域名、端口、有无页面、创建日期、备注、操作（修改、删除） -->
        <el-table :data="tableData" border class="table">
            <el-table-column type="selection" />
            <el-table-column prop="title" label="标题" width="120"></el-table-column>
            <el-table-column prop="type" label="类别" width="120"></el-table-column>
            <el-table-column prop="xiyi" label="协议" width="120"></el-table-column>
            <el-table-column prop="yuming" label="域名" width="140"></el-table-column>
            <el-table-column prop="port" label="端口" width="120"></el-table-column>
            <el-table-column prop="doc" label="有无页面" width="100"></el-table-column>
            <el-table-column prop="time" label="创建日期" width="130"></el-table-column>
            <el-table-column prop="beizhu" label="备注" width="100"></el-table-column>
            <el-table-column label="操作" width="180">
                <template #default="scope">
                    <el-button type="primary" size="mini">修改</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
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
        title: '响应服务器1',
        type: '响应服务器',
        xiyi: 'http',
        yuming: 'www.baidu.com',
        port: '80',
        doc: '有',
        time: '2021-08-01',
        beizhu: '无'
    },
    {
        title: '响应服务器2',
        type: '响应服务器',
        xiyi: 'http',
        yuming: 'www.baidu.com',
        port: '80',
        doc: '有',
        time: '2021-08-01',
        beizhu: '无'
    },
    {
        title: '响应服务器3',
        type: '响应服务器',
        xiyi: 'http',
        yuming: 'www.baidu.com',
        port: '80',
        doc: '有',
        time: '2021-08-01',
        beizhu: '无'
    },
    {
        title: '响应服务器4',
        type: '响应服务器',
        xiyi: 'http',
        yuming: 'www.baidu.com',
        port: '80',
        doc: '有',
        time: '2021-08-01',
        beizhu: '无'
    },
    {
        title: '响应服务器5',
        type: '响应服务器',
        xiyi: 'http',
        yuming: 'www.baidu.com',
        port: '80',
        doc: '有',
        time: '2021-08-01',
        beizhu: '无'
    },
    {
        title: '响应服务器6',
        type: '响应服务器',
        xiyi: 'http',
        yuming: 'www.baidu.com',
        port: '80',
        doc: '有',
        time: '2021-08-01',
        beizhu: '无'
    },
    {
        title: '响应服务器7',
        type: '响应服务器',
        xiyi: 'http',
        yuming: 'www.baidu.com',
        port: '80',
        doc: '有',
        time: '2021-08-01',
        beizhu: '无'
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