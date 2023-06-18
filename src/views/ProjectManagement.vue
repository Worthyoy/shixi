<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">项目管理</div>
        </div>
        <!-- toolbar工具栏：基于elementplus，form表单，inline模式，新增按钮、暂停按钮、恢复按钮、删除按钮、锁定按钮、解锁按钮 -->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button @click="add()" type="primary" class="button">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="muldel()" type="primary" class="button">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="mulfre()" type="primary" class="button">冻结</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="mulunfre()" type="primary" class="button">解冻</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="mullock()" type="primary" class="button">锁定</el-button>
            </el-form-item>
            <el-form-item>
                <!-- <el-button @click="mullock()" :type="[islock ? 'warning' : 'success']" class="button">
                    <p v-if="islock">解锁</p>
                    <p v-if="!islock">锁定</p>
                </el-button> -->
                <el-button @click="mulunlock()" type="primary" class="button">解锁</el-button>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchinput" placeholder="Please input" class="input-with-select">
                    <template #prepend>
                        <el-select v-model="searchselect" placeholder="Select" style="width: 115px">
                            <!-- <el-option label="id" value="id" /> -->
                            <el-option label="sysrole" value="sysrole" />
                            <!-- <el-option label="orgid" value="orgid" /> -->
                        </el-select>
                    </template>
                    <template #append>
                        <el-button :icon="Search" @click="getSearchinfo()" />
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <!-- 基于elementplus，table表格，表格内容为项目编号、项目名称、测评次数、测评序号、测评名称、测评类别、操作（暂停、恢复、删除、锁定、解锁、报告生成、报告更新、下载） -->
        <el-table ref="multipleTableRef" :row-key="getRowKeys" @selection-change="handleSelectionChange"
            :data="currentTableData" class="table" border width="100%">
            <el-table-column fixed type="selection" />
            <el-table-column fixed type="expand" label="展开">
                <!-- 展开后显示项目下的任务 -->
                <template #default="props">
                    <!-- 任务表 -->
                    <el-table></el-table>
                    <div m="4">
                        <p m="t-0 b-2">{{ props.row.projectName }}</p>
                        <p m="t-0 b-2">{{ props.row.evaluationNumber }}</p>
                        <p m="t-0 b-2">{{ props.row.evaluationSerialNumber }}</p>
                        <p m="t-0 b-2">{{ props.row.evaluationCategory }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed prop="projectNumber" label="项目编号" width="100"></el-table-column>
            <el-table-column prop="projectName" label="项目名称" width="120"></el-table-column>
            <el-table-column label="项目管理员" width="80"></el-table-column>
            <el-table-column prop="evaluationNumber" label="测评次数" width="100"></el-table-column>
            <el-table-column prop="evaluationSerialNumber" label="测评序号" width="100"></el-table-column>
            <el-table-column prop="evaluationName" label="测评名称" width="100"></el-table-column>
            <el-table-column prop="evaluationCategory" label="测评类别" width="100"></el-table-column>
            <el-table-column label="联系人" width="80"></el-table-column>
            <el-table-column label="联系方式" width="100"></el-table-column>
            <el-table-column label="备注" width="200"></el-table-column>
            <el-table-column fixed="right" label="操作" width="400">
                <template #default="scope">
                    <el-button @click="handleEdit(scope.row.id)" size="small">修改</el-button>
                    <el-button @click="handleDelete(scope.row.id)" size="small">删除</el-button>
                    <el-button @click="handleLock(scope.row.id)" size="small">锁定</el-button>
                    <el-button @click="handleUnlock(scope.row.id)" size="small">解锁</el-button>
                    <el-button @click="handleFreeze(scope.row.id)" size="small">冻结</el-button>
                    <el-button @click="handleUnfreeze(scope.row.id)" size="small">解冻</el-button>
                    <!-- <el-button @click="handleDetail(scope.row.id)" size="small">报告生成</el-button>
                    <el-button @click="handleDetail(scope.row.id)" size="small">报告更新</el-button>
                    <el-button @click="handleDetail(scope.row.id)" size="small">下载</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" class="pagination"
            @current-change="handleCurrentChange" style="position: absolute;bottom: 4vh;"></el-pagination>

        <!-- 基于elementplus弹框，内容为form表单，内容包含：客户名称的input、客户logo的图片上传、客户联系人的input、联系人职位的input、练习方式的input、项目说明的textare -->
        <el-dialog v-model="adddialogVisible" title="新增项目">
            <el-form :model="form" :rules="rules" ref="formref" label-width="100px">
                <el-form-item label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="项目管理员">
                    <el-input v-model="form.manager"></el-input>
                </el-form-item>
                <el-form-item label="客户名称" prop="customerName">
                    <el-input v-model="form.customerName"></el-input>
                </el-form-item>
                <!-- <el-form-item label="客户logo" prop="customerLogo">
                    <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                        :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :auto-upload="false"
                        :file-list="[]">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success"
                            @click="submitForm('form')">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip"></div>
                    </el-upload>
                </el-form-item> -->
                <el-form-item label="客户联系人" prop="customerContact">
                    <el-input v-model="form.customerContact"></el-input>
                </el-form-item>
                <el-form-item label="联系人职位" prop="contactPosition">
                    <el-input v-model="form.contactPosition"></el-input>
                </el-form-item>
                <el-form-item label="联系方式" prop="practiceMode">
                    <el-input v-model="form.practiceMode"></el-input>
                </el-form-item>
                <el-form-item label="项目说明备注" prop="projectDescription">
                    <el-input type="textarea" v-model="form.projectDescription"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelForm()">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script setup>
import { ref, unref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
onMounted(() => {
    getCurrentPageData(1)
    total.value = tableData.value.length;
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
function handleCurrentChange(val) {
    getCurrentPageData(val);
    currentPage.value = val;
};
const adddialogVisible = ref(false);
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
    },
    {
        projectNumber: '010',
        projectName: '项目10',
        evaluationNumber: '10',
        evaluationSerialNumber: '10',
        evaluationName: '测评10',
        evaluationCategory: '类别10'
    },
    {
        projectNumber: '011',
        projectName: '项目11',
        evaluationNumber: '11',
        evaluationSerialNumber: '11',
        evaluationName: '测评11',
        evaluationCategory: '类别11'
    }]);
// const get
const add = () => {
    adddialogVisible.value = true;
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
//表单
const formref = ref(null)
const form = ref({
    name: '',
    manager: '',
    customerName: '',
    customerLogo: '',
    customerContact: '',
    contactPosition: '',
    practiceMode: '',
    projectDescription: ''
});
const rules = ref({
    name: [
        { required: true, message: '请输入项目名称', trigger: 'blur' }
    ],
    manager: [
        { required: true, message: '请输入项目管理员', trigger: 'blur' }
    ],
    customerName: [
        { required: true, message: '请输入客户名称', trigger: 'blur' }
    ],
    // customerLogo: [
    //     { required: true, message: '请上传客户logo', trigger: 'blur' }
    // ],
    customerContact: [
        { required: true, message: '请输入客户联系人', trigger: 'blur' }
    ],
    contactPosition: [
        { required: true, message: '请输入联系人职位', trigger: 'blur' }
    ],
    practiceMode: [
        { required: true, message: '请输入联系方式', trigger: 'blur' }
    ],
    projectDescription: [
        { required: true, message: '请输入项目说明', trigger: 'blur' }
    ]
});
// const submitForm = (formName) => {
//     console.log(formName);
// }
// add new 提交验证！
const submitForm = async () => {
    // need unref first !! then check otherwise error
    const refform = unref(formref)
    if (!refform) return
    try {
        await refform.validate()
        console.log('huhuhuuuu', form.value)
        // axios({
        //     method:'post',
        //     url: 'http://172.16.113.158:5000/user/',
        //     data: form.value,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(res => {
        //     console.log('post new form success!',res.data)
        //     alert(res.data.message)
        //     getTabledata()
        adddialogVisible.value = false
        // })
    } catch (error) {
        console.log('no! form add failed! ', form.value)
    }
}
const cancelForm = () => {
    if (formref) {
        const form = unref(formref)
        form.resetFields();
    }
    adddialogVisible.value = false
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
const handleEdit = () => {
}
const handleLock = () => {
}
const handleUnlock = () => {
}
const handleFreeze = () => {
}
const handleUnfreeze = () => {
}
// 搜索框
const searchselect = ref('')
const searchinput = ref('')
// toolbar工具条多选操作
const mullock = () => {
}
const mulunlock = () => {
}
const mulfre = () => {
}
const mulunfre = () => {
}
const muldel = () => {
}
const getSearchinfo = () => { }
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

.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}
</style>