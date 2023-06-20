<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">项目管理</div>
        </div>
        <!-- toolbar工具栏：基于elementplus，form表单，inline模式，新增按钮、暂停按钮、恢复按钮、删除按钮、锁定按钮、解锁按钮 -->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button @click="add()" type="text" class="button">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="muldel()" type="text" class="button">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="mulfre()" type="text" class="button">冻结</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="mulunfre()" type="text" class="button">解冻</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="mullock()" type="text" class="button">锁定</el-button>
            </el-form-item>
            <el-form-item>
                <!-- <el-button @click="mullock()" :type="[islock ? 'warning' : 'success']" class="button">
                    <p v-if="islock">解锁</p>
                    <p v-if="!islock">锁定</p>
                </el-button> -->
                <el-button @click="mulunlock()" type="text" class="button">解锁</el-button>
            </el-form-item>
            <el-form-item>
                <el-input v-model="searchinput" placeholder="Please input" class="input-with-select">
                    <template #prepend>
                        <el-select v-model="searchselect" placeholder="Select" style="width: 115px">
                            <!-- <el-option label="id" value="id" /> -->
                            <el-option label="name" value="name" />
                            <!-- <el-option label="orgid" value="orgid" /> -->
                        </el-select>
                    </template>
                    <template #append>
                        <el-button :icon="Search" @click="getSearchinfo(searchinput)" />
                    </template>
                </el-input>
            </el-form-item>
        </el-form>
        <!-- 基于elementplus，table表格，表格内容为项目编号、项目名称、测评次数、测评序号、测评名称、测评类别、操作（暂停、恢复、删除、锁定、解锁、报告生成、报告更新、下载） -->
        <el-table ref="multipleTableRef" :row-key="getRowKeys" @selection-change="handleSelectionChange"
            :data="currentTableData" class="table" :border="true" width="100%" :row-style="rowClassName">
            <el-table-column fixed type="selection" :selectable="selectable" />
            <!-- <el-table-column fixed type="expand" label="展开">
                <template #default="props">
                    <el-table></el-table>
                    <div m="4">
                        <p m="t-0 b-2">{{ props.row.projectName }}</p>
                        <p m="t-0 b-2">{{ props.row.evaluationNumber }}</p>
                        <p m="t-0 b-2">{{ props.row.evaluationSerialNumber }}</p>
                        <p m="t-0 b-2">{{ props.row.evaluationCategory }}</p>
                    </div>
                </template>
            </el-table-column> -->
            <el-table-column fixed prop="projectNumber" label="项目编号" width="100">

            </el-table-column>
            <el-table-column prop="projectName" label="项目名称" width="120">
                <template #default="scope">
                    <span v-if="!scope.row.isModify">{{ scope.row.projectName }}</span>
                    <el-input v-else v-model="scope.row.projectName"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="项目管理员" width="80">
                <template #default="scope">
                    <span v-if="!scope.row.isModify">{{ scope.row.projectManaer }}</span>
                    <el-input v-else v-model="scope.row.projectManaer"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="evaluationNumber" label="测评次数" width="100">
                <template #default="scope">
                    <span v-if="!scope.row.isModify">{{ scope.row.evaluationNumber }}</span>
                    <el-input v-else v-model="scope.row.evaluationNumber"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="evaluationSerialNumber" label="测评序号" width="100">
                <template #default="scope">
                    <span v-if="!scope.row.isModify">{{ scope.row.evaluationSerialNumber }}</span>
                    <el-input v-else v-model="scope.row.evaluationSerialNumber"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="evaluationName" label="测评名称" width="100">
                <template #default="scope">
                    <span v-if="!scope.row.isModify">{{ scope.row.evaluationName }}</span>
                    <el-input v-else v-model="scope.row.evaluationName"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="evaluationCategory" label="测评类别" width="100">
                <template #default="scope">
                    <span v-if="!scope.row.isModify">{{ scope.row.evaluationCategory }}</span>
                    <el-input v-else v-model="scope.row.evaluationCategory"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="联系人" width="80">
                <template #default="scope">
                    <span v-if="!scope.row.isModify">{{ scope.row.contact_person_name }}</span>
                    <el-input v-else v-model="scope.row.contact_person_name"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="联系方式" width="100">
                <template #default="scope">
                    <span v-if="!scope.row.isModify">{{ scope.row.contact_way }}</span>
                    <el-input v-else v-model="scope.row.contact_way"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="备注" width="200">
                <template #default="scope">
                    <span v-if="!scope.row.isModify">{{ scope.row.comments }}</span>
                    <el-input v-else v-model="scope.row.comments"></el-input>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="400">
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.row.projectNumber)">
                        <span v-if="!scope.row.isModify">修改</span>
                        <el-icon v-else>
                            <Check />
                        </el-icon>
                    </el-button>
                    <el-button @click="openDeleteMessage(scope.row.projectNumber)" size="small">删除</el-button>
                    <el-button @click="handleLock(scope.row.projectNumber)" size="small">锁定</el-button>
                    <el-button @click="handleUnlock(scope.row.projectNumber)" size="small">解锁</el-button>
                    <el-button @click="handleFreeze(scope.row.projectNumber)" size="small">冻结</el-button>
                    <el-button @click="handleUnfreeze(scope.row.projectNumber)" size="small">解冻</el-button>
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
                <el-form-item label="测评名称" prop="customerName">
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
                <el-form-item label="项目类型" prop="contactPosition">
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
                <el-button type="primary" @click="submitForm()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script setup>
import { ref, unref, onMounted } from 'vue'
import { Search, Check } from '@element-plus/icons-vue'
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
onMounted(async () => {
    await getTabledata()
    getCurrentPageData(1)
    total.value = tableData.value.length;
})
async function getTabledata() {
    await axios({
        method: 'get',
        url: '/api/project/',
    }).then(res => {
        tableData.value = res.data.children.map(item => {
            return {
                projectNumber: item.id,
                projectName: item.name,
                projectManaer: "hwy",
                contact_person_name: item.contact_person_name,
                contact_way: "hwy",
                evaluationNumber: item.evaluation_count,
                evaluationSerialNumber: item.tests_number,
                evaluationName: item.test_name,
                evaluationCategory: item.test_category,
                freeze: item.isfreeze,
                lock: item.ispause,
                isModify: false, // by default it is false. if user modifies the record, it will be true.
                comments: item.comments
            }
        });
    })
}
function openMulDeleteMessage(item) {
    console.log('item', item.length)
    if (item.length) {

        ElMessageBox.confirm(
            '是否确认删除所有选中项目?',
            'Warning',
            {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning',
            }
        )
            .then(() => {
                item.value.forEach(async (item) => {
                    await handleDelete(item.projectNumber);
                })
                ElMessage({
                    type: 'success',
                    message: 'Delete completed',
                })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: 'Delete canceled',
                })
            })

    } else {
        ElMessage({
            type: 'info',
            message: '没有选中如何项目',
        })
    }
}
function openDeleteMessage(id) {
    ElMessageBox.confirm(
        '是否确认删除此项目\nID: ' + id + '?',
        'Warning',
        {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
        }
    )
        .then(() => {
            handleDelete(id)
            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}
async function handleDelete(id) {
    console.log(id)
    axios.delete(`/api/project/${id}`)
        .then(async response => {

            await getTabledata()
            console.log(form.value)
            getCurrentPageData(currentPage.value)
            total.value = tableData.value.length;
        })
        .catch(error => {
            alert(error)
        })
}
function rowClassName({ row, column, rowIndex, columnIndex }) {
    if (row.freeze) {
        return "background: rgba(182,227,244,0.5) !important;"
    } else {
        return ""
    }
}
function selectable(row, index) {
    return row.lock
}
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
const tableData = ref([]);
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
    return row.projectNumber;
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
    try {
        let data = {
            "name": form.value.name,
            "custoid": 0,
            "owneruid": 0,
            "comments": "string",
            "organization_id": 0,
            "test_name": form.value.customerName,
            "test_category": form.value.contactPosition,
            "contact_person_name": form.value.customerContact,
            "project_administrator_name": form.value.manager,
            "tests_number": 0
        }
        axios({
            method: 'post',
            url: '/api/project/',
            data: data,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async res => {
            console.log('post new form success!', res.data)
            await getTabledata()
            getCurrentPageData(1)
            total.value = tableData.value.length;
            adddialogVisible.value = false
        })
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
const handleEdit = (id) => {
    currentTableData.value.map((value) => {
        if (value.projectNumber == id) {
            value.isModify = !value.isModify;
            getCurrentPageData(currentPage.value)
            if (!value.isModify) {
                console.log("axios", value)
                let data = {
                    "name": value.projectName,
                    "custoid": 0,
                    "owneruid": 0,
                    "comments": value.comments,
                    "organization_id": 0,
                    "test_name": value.evaluationName,
                    "test_category": value.evaluationCategory,
                    "contact_person_name": value.contact_person_name,
                    "project_administrator_name": value.projectManaer,
                    "tests_number": 0
                }
                axios({
                    method: 'post',
                    url: '/api/project/' + id + '/modify',
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(async res => {
                    console.log('post new form success!', res.data)
                    await getTabledata()
                    getCurrentPageData(1)
                    total.value = tableData.value.length;
                    adddialogVisible.value = false
                })
            }
        } else { value.isModify = false; }
    })
}
const handleLock = async (id) => {
    axios({
        method: 'patch',
        url: '/api/project/' + id + '/pause',
    }).then(async (res) => {
        if (res.data.message == "项目已恢复。") {
            ElMessage({ message: id + '暂停成功', type: 'success' })
            await getTabledata()
            getCurrentPageData(currentPage.value)
            total.value = tableData.value.length;
        } else {
            console.log(res.data);
            alert('err', res.data)
        }
    }).catch((err) => {
        ElMessage({ message: id + '已经暂停', type: 'error' })
    })
}
const handleUnlock = async (id) => {
    axios({
        method: 'put',
        url: '/api/project/' + id + '/pause',
    }).then(async (res) => {
        if (res.data.message == "项目已暂停。") {
            ElMessage({ message: id + '恢复成功', type: 'success' })
            await getTabledata()
            getCurrentPageData(currentPage.value)
            total.value = tableData.value.length;
        } else {
            console.log(res.data);
        }
    })
}
const handleFreeze = async (id) => {
    axios({
        method: 'patch',
        url: '/api/project/' + id,
    }).then(async (res) => {
        if (res.data.status == "success") {
            ElMessage({ message: id + 'Freeze Success', type: 'success' });
            await getTabledata()
            getCurrentPageData(currentPage.value)
            total.value = tableData.value.length;
        } else {
            alert('err')
        }
    }).catch((err) => {
        ElMessage({ message: 'The project has been frozen', type: 'error' })
    })
}
const handleUnfreeze = async (id) => {
    console.log('handleUnfreeze')
    axios({
        method: 'put',
        url: '/api/project/' + id,
    }).then(async (res) => {
        if (res.data.status == "success") {
            ElMessage({ message: id + 'Unfreeze Success', type: 'success' })
            await getTabledata()
            getCurrentPageData(currentPage.value)
            total.value = tableData.value.length;
        } else {
            alert('err')
        }
    })
}
// 搜索框
const searchselect = ref('')
const searchinput = ref('')
// toolbar工具条多选操作
const mullock = () => {
    multipleSelection.value.forEach(async (item) => {
        await handleLock(item.projectNumber);
    })
}
const mulunlock = () => {
    multipleSelection.value.forEach(async (item) => {
        await handleUnlock(item.projectNumber);
    })
}
const mulfre = () => {
    multipleSelection.value.forEach(async (item) => {
        await handleFreeze(item.projectNumber);
    })
}
const mulunfre = () => {
    multipleSelection.value.forEach(async (item) => {
        await handleUnfreeze(item.projectNumber);
    })
}
const muldel = (rows) => {
    if (rows) {
        rows.forEach((row) => {
            // TODO: improvement typing when refactor table
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            multipleTableRef.value
        })
    } else {
        openMulDeleteMessage(multipleSelection.value)
    }
}
const getSearchinfo = async (name) => {
    console.log('getSearchinfo', name, searchinput.value);
    await axios({
        method: 'get',
        url: '/api/project/search/' + name,
    }).then((res) => {
        tableData.value = res.data.children.map(item => {
            return {
                projectNumber: item.id,
                projectName: item.name,
                projectManaer: "hwy",
                contact_person_name: item.contact_person_name,
                contact_way: "hwy",
                evaluationNumber: item.evaluation_count,
                evaluationSerialNumber: item.tests_number,
                evaluationName: item.test_name,
                evaluationCategory: item.test_category,
                freeze: item.isfreeze,
                lock: item.ispause,
                isModify: false, // by default it is false. if user modifies the record, it will be true.
                comments: item.comments
            }
        });
        getCurrentPageData(currentPage.value)
        total.value = tableData.value.length;
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



.rowName {
    background: deeppink !important;
    color: whitesmoke
}

.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}
</style>