<template>
    <div>
        <!-- 系统用户管理：展示所有系统用户 -->
        <div class="header">
            <div class="title">系统用户管理</div>
        </div>
        <!-- Toolbar工具条：基于elementplus，form表单，inline模式，新增按钮、删除按钮、锁定按钮、解锁按钮、创建日期的时间选择器、存续状态的下拉选择框-->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button @click="add()" type="primary" class="button">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="muldel()" type="primary" class="button">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button @click="mulfro()" type="primary" class="button">冻结</el-button>
                    <el-button @click="mulunfro()" type="primary" class="button">解冻</el-button>
                </el-button-group>
            </el-form-item>
            <el-form-item>
                <el-button-group>
                    <el-button @click="mullock()" type="primary" class="button">锁定</el-button>
                    <el-button @click="mulunlock()" type="primary" class="button">解锁</el-button>
                </el-button-group>
            </el-form-item>
            <!-- 查询 to be -->
            <el-form-item>
                <el-button :icon="Search" @click="getSearchinfo()">查询信息</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="clearFilter">清除筛选</el-button>
                <el-button @click="getTabledata()">获取全部数据</el-button>
            </el-form-item>
        </el-form>

        <!-- Table信息列表：基于elementplus，table表格，表格内容为编号、状态、上次测试时间、创建日期、操作（修改、删除、测试、锁定、解锁） -->
        <el-table ref="multipleTableRef" :row-key="getRowKeys" @selection-change="handleSelectionChange" :data="tableData"
            :row-class-name="tableRowClassName" style="width: 100%" class="table">
            <el-table-column fixed type="selection" :reserve-selection="true" width="30" />
            <el-table-column fixed prop="id" label="id" width="60" align="center" sortable></el-table-column>
            <el-table-column prop="username" label="用户名" width="80" align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column>
            <el-table-column prop="sysrole" label="系统角色" width="100" align="center"
                :filters="[{ text: '系统管理员', value: '系统管理员' }, { text: '项目管理员', value: '项目管理员' }, { text: '日志管理员', value: '日志管理员' }, { text: '客户代表', value: '客户代表' },]"
                :filter-method="filterRole" filter-placement="bottom-end"></el-table-column>
            <el-table-column prop="isfreezed" label="是否冻结" width="100" align="center"
                :filters="[{ text: '冻结', value: true }, { text: '正常', value: false },]" :filter-method="filterFre"
                filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.isfreezed ? 'warning' : 'success'" disable-transitions>
                        {{ scope.row.isfreezed ? '冻结' : '正常' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="islocked" label="是否锁定" width="100" align="center"
                :filters="[{ text: '锁定', value: true }, { text: '正常', value: false },]" :filter-method="filterLock"
                filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.islocked ? 'warning' : 'success'" disable-transitions>
                        {{ scope.row.islocked ? '锁定' : '正常' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createdbyuid" label="创建者" width="100" align="center" sortable></el-table-column>
            <el-table-column prop="createusername" label="创建者" width="100" align="center" sortable></el-table-column>
            <el-table-column prop="createtime" label="创建时间" width="180" align="center" sortable></el-table-column>
            <el-table-column prop="comments" label="备注" width="180" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" width="280" align="center">
                <template #default="scope">
                    <el-button link type="primary" @click="handleDetail(scope.row.id)"
                        :disabled="scope.row.islocked | scope.row.isfreezed ? true : false">查看</el-button>
                    <el-button link type="primary" @click="handleDelete(scope.row.id)"
                        :disabled="scope.row.islocked | scope.row.isfreezed ? true : false">删除</el-button>
                    <el-button link type="primary" @click="handleEdit(scope.row.id)"
                        :disabled="scope.row.islocked | scope.row.isfreezed ? true : false">修改</el-button>
                    <el-button link type="primary"
                        @click="scope.row.islocked ? handleUnlock(scope.row.id) : handleLock(scope.row.id)"
                        :disabled="scope.row.isfreezed ? true : false">{{ scope.row.islocked ? '解锁' : '锁定' }}</el-button>
                    <el-button link type="primary"
                        @click="scope.row.isfreezed ? handleUnfreeze(scope.row.id) : handleFreeze(scope.row.id)"
                        :disabled="scope.row.islocked ? true : false">{{ scope.row.isfreezed ? '解冻' : '冻结' }}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="100" class="pagination"></el-pagination>

        <!-- add新增弹框：基于elementplus弹框，内容为form表单，内容包含：单位名称的select、部门名称的select、用户名的input、邮箱的input、角色的input、用户密码的input、岗位类别的select、职位的input、手机的input、备注的input、下载的按钮、导入的按钮 -->
        <el-dialog v-model="adddialogVisible" title="新增">
            <el-form :model="form" :rules="rules" ref="formref" label-width="80px" class="form">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item label="系统角色" prop="sysrole">
                    <!-- <el-input v-model="form.sysrole" placeholder="请输入系统角色"></el-input> -->
                    <el-select v-model="form.sysrole" placeholder="Select" size="large">
                        <el-option v-for="item in loginUserRole === 'sysadmin' ? sysroleOptions : proroleOptions "
                            :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="form.mobile" placeholder="请输入手机"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="comments">
                    <el-input v-model="form.comments" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm()">提交</el-button>
                    <el-button @click="cancelForm()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- detail查看弹框 -->
        <el-dialog v-model="detaildialogVisible" title="用户信息">
            <el-form :model="UserDetail">
                <el-form-item label="用户id" prop="id">
                    <el-input v-model="UserDetail.id" disabled></el-input>
                </el-form-item>
                <el-form-item label="用户名:" prop="username">
                    <el-input v-model="UserDetail.username" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="系统角色" prop="sysrole">
                    <el-input v-model="UserDetail.sysrole" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="UserDetail.email" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createtime">
                    <el-input v-model="UserDetail.createtime" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="创建者ID" prop="createdbyuid">
                    <el-input v-model="UserDetail.createdbyuid" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="创建者" prop="createusername">
                    <el-input v-model="UserDetail.createusername" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="UserDetail.mobile" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="comments">
                    <el-input v-model="UserDetail.comments" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="是否锁定" prop="islocked">
                    <el-input v-model="UserDetail.islocked" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="锁定者ID" prop="lockedbyuid">
                    <el-input v-model="UserDetail.lockedbyuid" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="锁定者" prop="lockusername">
                    <el-input v-model="UserDetail.lockusername" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="锁定时间" prop="lockedtime">
                    <el-input v-model="UserDetail.lockedtime" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="是否冻结" prop="isfreezed">
                    <el-input v-model="UserDetail.isfreezed" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="冻结者ID" prop="freezedbyuid">
                    <el-input v-model="UserDetail.freezedbyuid" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="冻结者" prop="freezeusername">
                    <el-input v-model="UserDetail.freezeusername" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="冻结时间" prop="freezetime">
                    <el-input v-model="UserDetail.freezetime" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="修改者ID" prop="modifiedbyuid">
                    <el-input v-model="UserDetail.modifiedbyuid" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="修改者" prop="modifyusername">
                    <el-input v-model="UserDetail.modifyusername" placeholder="null" readonly></el-input>
                </el-form-item>
                <el-form-item label="修改时间" prop="modifiedtime">
                    <el-input v-model="UserDetail.modifiedtime" placeholder="null" readonly></el-input>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- edit修改弹框 -->
        <el-dialog v-model="editdialogVisible" title="修改">
            <el-form :model="editform" ref="editformref" label-width="80px" class="form">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="editform.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editform.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editform.mobile" placeholder="请输入手机"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="editform.password" placeholder="请输入密码" type="password" show-password></el-input>
                </el-form-item>
                <el-form-item label="系统角色" prop="sysrole">
                    <el-input v-model="editform.sysrole" placeholder="请输入系统角色"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="comments">
                    <el-input v-model="editform.comments" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitEdit()">提交</el-button>
                    <el-button @click="cancelEdit()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!-- search查询弹框 -->
        <el-dialog v-model="searchTableVisible" title="查询信息">
            <el-form :model="searchForm" :inline="true" ref="searchref" class="demo-form-inline">
                <el-form-item label="用户id" prop="id">
                    <el-input v-model="searchForm.id"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="searchForm.email" placeholder="email"></el-input>
                </el-form-item>
                <el-form-item label="用户名:" prop="partial_name">
                    <el-input v-model="searchForm.partial_name" placeholder="name"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="searchForm.mobile" placeholder="mobile"></el-input>
                </el-form-item>
                <el-form-item label="系统角色" prop="sysrole">
                    <el-select v-model="searchForm.sysrole" placeholder="Select" size="large">
                        <el-option v-for="item in roleOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="comments">
                    <el-input v-model="searchForm.comments" placeholder="null"></el-input>
                </el-form-item>
                <el-form-item label="创建者ID" prop="createdbyuid">
                    <el-input v-model="searchForm.createdbyuid" placeholder="null"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createtime">
                    <el-date-picker v-model="searchForm.createtime" type="datetime" placeholder="Select date and time" />
                </el-form-item>
                <el-form-item label="修改者ID" prop="modifiedbyuid">
                    <el-input v-model="searchForm.modifiedbyuid" placeholder="null"></el-input>
                </el-form-item>
                <el-form-item label="修改时间" prop="modifiedtime">
                    <el-date-picker v-model="searchForm.modifiedtime" type="datetime" placeholder="Select date and time" />
                </el-form-item>
                <el-divider />
                <!-- <el-form-item label="状态">
                    <el-input
                        v-model="searchinput"
                        placeholder="Please input id"
                        class="input-with-select"
                    >
                        <template #prepend>
                            <el-select v-model="searchselect" placeholder="Select status" style="width: 115px" clearable>
                                <el-option label="冻结" value = "isfreezed" />
                                <el-option label="锁定" value = "islocked" />
                            </el-select>
                            <el-date-picker
                                v-model=" searchselect === 'islocked' ? searchForm.lockedtime : searchForm.freezetime "
                                type="datetime"
                                placeholder="Select date and time"
                            />
                        </template>
                    </el-input>
                </el-form-item> -->
                <el-form-item label="是否锁定" prop="status_lock">
                    <el-select v-model="searchForm.status_lock" placeholder="Select" size="large">
                        <el-option label="是" value=true />
                        <el-option label="否" />
                    </el-select>
                </el-form-item>
                <el-form-item label="锁定者ID" prop="lockedbyuid">
                    <el-input v-model="searchForm.lockedbyuid" placeholder="null"></el-input>
                </el-form-item>
                <el-form-item label="锁定时间" prop="lockedtime">
                    <el-date-picker v-model="searchForm.lockedtime" type="datetime" placeholder="Select date and time" />
                </el-form-item>
                <el-form-item label="是否冻结" prop="status_freeze">
                    <el-select v-model="searchForm.status_freeze" placeholder="Select" size="large">
                        <el-option label="是" value=true />
                        <el-option label="否" />
                    </el-select>
                </el-form-item>
                <el-form-item label="冻结者ID" prop="freezedbyuid">
                    <el-input v-model="searchForm.freezedbyuid" placeholder="null"></el-input>
                </el-form-item>
                <el-form-item label="冻结时间" prop="freezetime">
                    <el-date-picker v-model="searchForm.freezetime" type="datetime" placeholder="Select date and time" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitsearchForm()">查询</el-button>
                    <el-button @click="cancelsearchForm()">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script setup>
import { ref, unref } from 'vue'
// import axios from 'axios'
import http from '../api/http'
import { getdata, addNew, getAsysuser, sysEdit, Opera, mulOpera, sysSearch } from '../api/user'
import { Search } from '@element-plus/icons-vue'
import { InfoFilled } from '@element-plus/icons-vue'

const loginUserRole = sessionStorage.getItem('sysrole')
// import qs from 'qs'
const adddialogVisible = ref(false);
const detaildialogVisible = ref(false);
const editdialogVisible = ref(false);
const searchTableVisible = ref(false)
// const ismod = ref(false)
// table数据
const tableData = ref([])
const UserDetail = ref([])
const searchData = ref([])
const formref = ref(null)
const editformref = ref(null)
const searchref = ref(null)
const add = () => {
    adddialogVisible.value = true;
}
const getTabledata = () => {
    getdata().then(res => {
        console.log('get all user info list!', res.data)
        tableData.value = res.data.children
    })
}
getTabledata()
const tableRowClassName = ({ row, rowIndex }) => {
    if (row.islocked === true) {
        return 'warning-row'
    } else if (row.isfreezed === true) {
        return 'success-row'
    }
    return ''
}
// 表单
const form = ref({
    email: '',
    mobile: '',
    username: '',
    password: '',
    sysrole: '',
    comments: '',
})
const editform = ref({
    email: '',
    mobile: '',
    username: '',
    password: '',
    sysrole: '',
    comments: '',
})
const searchForm = ref({
    id: '',
    partial_name: '',
    email: '',
    sysrole: '',
    createtime: '',
    createdbyuid: '',
    mobile: '',
    comments: '',
    status_freeze: '',
    lockedbyuid: '',
    lockedtime: '',
    status_lock: '',
    freezedbyuid: '',
    freezetime: '',
    modifiedbyuid: '',
    modifiedtime: ''
})
const checkEmail = (rule, value, callback) => {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (!value) {
        return callback(new Error("邮箱不能为空"));
    }
    setTimeout(() => {
        if (mailReg.test(value)) {
            callback();
        } else {
            callback(new Error("请输入正确的邮箱格式"));
        }
    }, 100);
}
// const checkPhone = (rule, value, callback) => {
//   const phoneReg = /^1[34578]\d{9}$$/;
//   if (!value) {
//     return callback(new Error("电话号码不能为空"));
//   }
//   setTimeout(() => {
//     if (!Number.isInteger(+value)) {
//       callback(new Error("请输入数字值"));
//     } else {
//       if (phoneReg.test(value)) {
//         callback();
//       } else {
//         callback(new Error("电话号码格式不正确"));
//       }
//     }
//   }, 100);
// }
const rules = ref({
    // username: [
    //     { required: true, message: '请输入用户名称', trigger: 'blur' }
    // ],
    email: [
        { required: true, validator: checkEmail, trigger: 'blur' }
    ],
    // mobile: [
    //     { required: true, validator: checkPhone, trigger: 'blur' }
    // ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    sysrole: [
        { required: true, message: '请输入系统角色', trigger: 'blur' }
    ]
})

// add new 提交验证！
const sysroleOptions = [
    {
        value: '系统管理员',
        label: '系统管理员',
    },
    {
        value: '项目管理员',
        label: '项目管理员',
    },
    {
        value: '客户代表',
        label: '客户代表',
    },
]
const proroleOptions = [
    {
        value: '项目管理员',
        label: '项目管理员',
    },
    {
        value: '客户代表',
        label: '客户代表',
    },
]
const submitForm = async () => {
    // need unref first !! then check otherwise error
    const refform = unref(formref)
    if (!refform) return
    try {
        await refform.validate()
        console.log('huhuhuuuu', form.value)
        // 1.http({
        //     method:'post',
        //     url: '/sysuser/',
        //     data: form.value,
        // })
        // 2.http.post('/sysuser/',form.value)
        addNew(form.value).then(res => {
            console.log('post new form success!', res.data)
            alert(res.data.message)
            getTabledata()
            adddialogVisible.value = false
            refform.resetFields()
        })
    } catch (error) {
        console.log('no! form add failed! ', error)
    }
}
const cancelForm = () => {
    // couldn't put reset in add()
    if (formref) {
        const form = unref(formref)
        form.resetFields();
    }
    adddialogVisible.value = false
}
// 搜索框
const searchselect = ref('')
const searchinput = ref('')
// 多选框、筛选操作
const multipleTableRef = ref()
const multipleSelection = ref([])
const select_order_number = ref('')
const select_orderId = ref([])
const editid = ref()
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
const filterFre = (value, row) => {
    return row.isfreezed === value
}
const filterLock = (value, row) => {
    return row.islocked === value
}
const filterRole = (value, row) => {
    return row.sysrole === value
}
const clearFilter = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    multipleTableRef.value.clearFilter()
}
// 列表单项操作、修改、查看
// const detailrule = ref({
//     id: [
//         { required: true, message: '请输入id', trigger: 'blur' }
//     ],
//     name: [
//         { required: true, message: '请上传name', trigger: 'blur' }
//     ],
// })
const handleDetail = (id) => {
    detaildialogVisible.value = true
    console.log(id)
    getAsysuser(id).then(res => {
        UserDetail.value = res.data
    })
    console.log(UserDetail.value)
}
const submitEdit = () => {
    const refform = unref(editformref)
    try {
        console.log(editid.value)
        console.log(editform.value)
        sysEdit(editid.value, editform.value).then(res => {
            console.log('subchange', res.data)
            refform.resetFields()
            getTabledata()
        }, err => {
            let _resp = err.response
            switch (_resp.status) {
                case 400:
                    alert('nonono!bad request in submit!')
            }
        })
        editdialogVisible.value = false
    } catch (error) {
        console.log('error in edit submit!')
    }
}
const handleEdit = (id) => {
    editdialogVisible.value = true
    editid.value = id
    getAsysuser(id).then(res => {
        UserDetail.value = res.data
        editform.value.email = UserDetail.value.email
        editform.value.mobile = UserDetail.value.mobile
        editform.value.username = UserDetail.value.username
        editform.value.sysrole = UserDetail.value.sysrole
        editform.value.comments = UserDetail.value.comments
        console.log(editform.value)
    })
    // ismod.value = true
    // console.log(ismod.value)
}
const cancelEdit = () => {
    if (editformref) {
        const form = unref(editformref)
        form.resetFields();
    }
    editdialogVisible.value = false
}
const handleDelete = (id) => {
    Opera(id, "delete").then(res => {
        console.log(res.data)
        alert('删除成功！')
        getTabledata()
    }, err => {
        let _resp = err.response
        switch (_resp.status) {
            case 400:
                alert('nonono!bad request in delete!')
        }
    })
}
const handleLock = (id) => {
    Opera(id, "lock").then(res => {
        console.log(res.data)
        alert('已锁定！')
        getTabledata()
    }, err => {
        let _resp = err.response
        switch (_resp.status) {
            case 400:
                alert('nonono!bad request in lock!')
        }
    })
}
const handleUnlock = (id) => {
    Opera(id, "unlock").then(res => {
        console.log(res.data)
        getTabledata()
        alert('已解锁！')
    })
}
const handleFreeze = (id) => {
    Opera(id, "freeze").then(res => {
        console.log(res.data)
        getTabledata()
        alert('已冻结！')
    })
}
const handleUnfreeze = (id) => {
    Opera(id, "unfreeze").then(res => {
        console.log(res.data)
        getTabledata()
        alert('已解冻！')
    })
}
// toolbar工具条多选操作
const muldel = () => {
    console.log(multipleSelection.value)
    console.log(select_orderId.value)
    try {
        // axios({
        //     method:'patch',
        //     url: '/api/sysuser/action/delete',
        //     data: 
        // })
        mulOpera("delete", select_orderId.value).then(res => {
            console.log(res.data)
            multipleTableRef.value.clearSelection()
            console.log(select_orderId.value);
            console.log(select_order_number.value)
            console.log(multipleSelection.value)
            getTabledata()
        })
    } catch (error) {
        console.log('muldel error!')
    }
}
const mulfro = () => {
    console.log(multipleSelection.value)
    try {
        mulOpera("freeze", select_orderId.value).then(res => {
            console.log(res.data)
            multipleTableRef.value.clearSelection()
            getTabledata()
        })
    } catch (error) {
        console.log('mulfre error!')
    }
}
const mulunfro = () => {
    console.log(multipleSelection.value)
    try {
        mulOpera("unfreeze", select_orderId.value).then(res => {
            console.log(res.data)
            multipleTableRef.value.clearSelection()
            getTabledata()
        })
    } catch (error) {
        console.log('mulunfrezz error!')
    }
}
const mullock = () => {
    console.log(multipleSelection.value)
    try {
        mulOpera("lock", select_orderId.value).then(res => {
            console.log(res.data)
            multipleTableRef.value.clearSelection()
            getTabledata()
        })
    } catch (error) {
        console.log('mullock error!', error)
    }
}
const mulunlock = () => {
    console.log(multipleSelection.value)
    try {
        mulOpera("unlock", select_orderId.value).then(res => {
            console.log(res.data)
            multipleTableRef.value.clearSelection()
            getTabledata()
        }, err => {
            let _resp = err.response
            switch (_resp.status) {
                case 400:
                    alert('nonono!bad request in unlock!')
            }
        })
    } catch (error) {
        console.log('mulunlock error!', error)
    }
}
const getSearchinfo = () => {
    // console.log(searchselect.value)
    // console.log(searchinput.value)
    searchTableVisible.value = true
    // try{
    // axios({
    //     method:'post',
    //     url: '/api/sysuser/search',
    //     headers: {
    //         Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjg3MDUwMDEyLCJqdGkiOiJjNDIzOGM2ZS02MzY2LTRkNDktOTc1YS00NWExMWNhMjczMjYiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2ODcwNTAwMTIsImV4cCI6MTY4NzEzNjQxMn0.c5H8FlCs8p5NjGVYKJqf8vIvKRpzgqywPRCQ_qO6rb8'
    //     },
    // data: 
    // })
    //     sysSearch({"sysrole": searchinput.value}).then(res => {
    //         console.log(res.data)
    //         searchData.value = res.data.children
    //     }, err => {
    //         let _resp = err.response
    //         switch (_resp.status) { 
    //             case 400:
    //                 alert('nonono!bad req!')
    //         }
    //     })
    // } catch (error) {
    //     console.log('nop error!')
    // }
}
const submitsearchForm = () => {
    console.log(searchForm.value)
    sysSearch(searchForm.value).then(res => {
        tableData.value = res.data.children
        searchTableVisible.value = false
    }, err => {
        console.log(err)
    })
}
const cancelsearchForm = () => {
    if (searchref) {
        const form = unref(searchref)
        form.resetFields();
    }
    searchTableVisible.value = false
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

.input-with-select .el-input-group__prepend {
    background-color: var(--el-fill-color-blank);
}
</style>
<style>
.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>