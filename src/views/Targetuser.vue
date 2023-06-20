<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为人员管理 -->
        <div class="header">
            <div class="title">被测用户管理</div>
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
            <el-form-item>
                <el-button-group>
                    <el-button @click="getTrick()">查看中招情况</el-button>
                    <el-button @click="getTabledata()">获取全部数据</el-button>
                </el-button-group>
            </el-form-item>
            <!-- <el-form-item>
                <el-button type="primary" class="button">导入</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">下载</el-button>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="编号/人名"></el-input>
            </el-form-item> -->
            <!-- 查询 to be -->
            <el-form-item>
                <el-button :icon="Search" @click="getSearchinfo()">查询信息</el-button>
                <el-button @click="clearFilter">清除筛选</el-button>
            </el-form-item>
        </el-form>

        <!-- Table信息列表：基于elementplus，table表格，表格内容为编号、状态、上次测试时间、创建日期、操作（修改、删除、测试、锁定、解锁） -->
        <el-table ref="multipleTableRef" :row-key="getRowKeys" @selection-change="handleSelectionChange" :data="tableData" :row-class-name="tableRowClassName" style="width: 100%" class="table">
            <el-table-column fixed type="selection" :reserve-selection="true" width="30"/>
            <el-table-column label="ID" fixed prop="id" width="40" align="center" sortable></el-table-column>
            <el-table-column label="用户名" prop="username" width="80" align="center"></el-table-column>
            <el-table-column label="邮箱" prop="email" width="180" align="center"></el-table-column>
            <el-table-column label="组织号" prop="orgid" align="center"></el-table-column>
            <el-table-column label="职位" prop="position" align="center"></el-table-column>
            <el-table-column label="客户代表ID" prop="representativeID" align="center"></el-table-column>
            <el-table-column label="客户代表" prop="representativeusername" align="center"></el-table-column>
            <el-table-column label="是否冻结" prop="isfreezed" width="100" align="center" :filters="[{ text: '冻结', value: true },{ text: '正常', value: false },]" :filter-method="filterFre" filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.isfreezed ? 'warning' : 'success'" disable-transitions>
                      {{ scope.row.isfreezed ? '冻结' : '正常' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="是否锁定" prop="islocked" width="100" align="center" :filters="[{ text: '锁定', value: true },{ text: '正常', value: false },]" :filter-method="filterLock" filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.islocked ? 'warning' : 'success'" disable-transitions>
                      {{ scope.row.islocked ? '锁定' : '正常' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="电话号" prop="mobile" align="center"></el-table-column>
            <el-table-column label="座机号" prop="telephone" align="center"></el-table-column>
            <el-table-column label="微信号" prop="wechat_num" align="center"></el-table-column>
            <el-table-column label="电报" prop="telecom_num" align="center"></el-table-column>
            <el-table-column label="创建者ID" prop="createdbyuid" width="100" align="center" sortable></el-table-column>
            <el-table-column label="创建者" prop="createusername" align="center"></el-table-column>
            <el-table-column label="创建时间" prop="createtime" width="180" align="center" sortable></el-table-column>
            <el-table-column label="冻结者ID" prop="freezedbyuid" align="center" sortable></el-table-column>
            <el-table-column label="冻结者" prop="freezeusername" align="center"></el-table-column>
            <el-table-column label="冻结时间" prop="freezetime" width="180" align="center" sortable></el-table-column>
            <el-table-column label="锁定者ID" prop="lockedbyuid" align="center" sortable></el-table-column>
            <el-table-column label="锁定者" prop="lockusername" align="center"></el-table-column>
            <el-table-column label="锁定时间" prop="lockedtime" width="180" align="center" sortable></el-table-column>
            <el-table-column label="修改者ID" prop="modifiedbyuid" align="center" sortable></el-table-column>
            <el-table-column label="修改者" prop="modifyusername" align="center"></el-table-column>
            <el-table-column label="修改时间" prop="modifiedtime" width="180" align="center" sortable></el-table-column>
            <el-table-column label="备注" prop="comments" width="280" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" fixed="right" width="280" align="center">
                <template #default="scope">
                    <!-- 这里查看中招情况 -->
                    <el-button link type="primary" @click="handleDetail(scope.row.id)" :disabled="scope.row.islocked|scope.row.isfreezed ? true: false">查看</el-button>
                    <el-button link type="primary" @click="handleDelete(scope.row.id)" :disabled="scope.row.islocked|scope.row.isfreezed ? true: false">删除</el-button>
                    <el-button link type="primary" @click="handleEdit(scope.row.id)" :disabled="scope.row.islocked|scope.row.isfreezed ? true: false">修改</el-button>
                    <el-button link type="primary" @click="scope.row.islocked ? handleUnlock(scope.row.id) : handleLock(scope.row.id)" :disabled="scope.row.isfreezed ? true: false">{{ scope.row.islocked ? '解锁' : '锁定' }}</el-button>
                    <el-button link type="primary" @click="scope.row.isfreezed ? handleUnfreeze(scope.row.id) : handleFreeze(scope.row.id)" :disabled="scope.row.islocked ? true: false">{{ scope.row.isfreezed ? '解冻' : '冻结' }}</el-button>
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
                <el-form-item label="对接人ID" prop="representativeID">
                    <el-input v-model="form.representativeID" placeholder="请输入对接人ID"></el-input>
                </el-form-item>
                <el-form-item label="组织号" prop="orgid">
                    <el-input v-model="form.orgid" placeholder="请输入组织号"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="position">
                    <el-input v-model="form.position" placeholder="请输入职位"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="form.mobile" placeholder="请输入手机"></el-input>
                </el-form-item>
                <el-form-item label="座机" prop="telephone">
                    <el-input v-model="form.telephone" placeholder="请输入座机"></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="wechat_num">
                    <el-input v-model="form.wechat_num" placeholder="put here!" readonly></el-input>
                </el-form-item>
                <el-form-item label="电报" prop="telecom_num">
                    <el-input v-model="form.telecom_num" placeholder="请输入电报"></el-input>
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

        <!-- detail中招情况查看 -->
        <el-dialog v-model="detaildialogVisible" title="用户中招信息">
            <el-table :data="UserDetail" style="width: 100%" class="table">
                <el-table-column label="ID" fixed prop="id" width="40" align="center" sortable></el-table-column>
                <el-table-column label="用户ID" prop="taguid" width="80" align="center"></el-table-column>
                <el-table-column label="用户名" prop="username" align="center"></el-table-column>
                <el-table-column label="项目ID" prop="taskid" align="center"></el-table-column>
                <el-table-column label="项目名称" prop="taskname" align="center"></el-table-column>
                <el-table-column label="中招时间" prop="tricktime" align="center"></el-table-column>
                <el-table-column label="行为" prop="action" align="center"></el-table-column>
                <el-table-column label="输入内容" prop="inputContent" align="center"></el-table-column>
                <el-table-column label="微信号" prop="comments" align="center"></el-table-column>
            </el-table>
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
                <el-form-item label="系统角色" prop="representativeID">
                    <el-input v-model="editform.representativeID" placeholder="请输入系统角色"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="position">
                    <el-input v-model="editform.position" placeholder="请输入职位"></el-input>
                </el-form-item>
                <el-form-item label="组织号" prop="orgid">
                    <el-input v-model="editform.orgid" placeholder="请输入组织号"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="comments">
                    <el-input v-model="editform.comments" placeholder="请输入备注"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input v-model="editform.mobile" placeholder="请输入手机"></el-input>
                </el-form-item>
                <el-form-item label="座机" prop="telephone">
                    <el-input v-model="editform.telephone" placeholder="请输入座机"></el-input>
                </el-form-item>
                <el-form-item label="微信" prop="wechat_num">
                    <el-input v-model="editform.wechat_num" placeholder="请输入微信"></el-input>
                </el-form-item>
                <el-form-item label="电报" prop="telecom_num">
                    <el-input v-model="editform.telecom_num" placeholder="请输入电报"></el-input>
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
                <el-form-item label="组织号" prop="orgid">
                    <el-input v-model="searchForm.orgid" placeholder="mobile"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="position">
                    <el-input v-model="searchForm.position" placeholder="mobile"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="comments">
                    <el-input v-model="searchForm.comments" placeholder="null"></el-input>
                </el-form-item>
                <el-form-item label="创建者ID" prop="createdbyuid">
                    <el-input v-model="searchForm.createdbyuid" placeholder="null"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" prop="createtime">
                    <el-date-picker
                        v-model="searchForm.createtime"
                        type="datetime"
                        placeholder="Select date and time"
                    />
                </el-form-item>
                <el-form-item label="修改者ID" prop="modifiedbyuid">
                    <el-input v-model="searchForm.modifiedbyuid" placeholder="null"></el-input>
                </el-form-item>
                <el-form-item label="修改时间" prop="modifiedtime">
                    <el-date-picker
                        v-model="searchForm.modifiedtime"
                        type="datetime"
                        placeholder="Select date and time"
                    />
                </el-form-item>
                <el-divider />
                <el-form-item label="是否锁定" prop="status_lock">
                    <el-select v-model="searchForm.status_lock" placeholder="Select" size="large">
                        <el-option label="是" value=true />
                        <el-option label="否"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="锁定者ID" prop="lockedbyuid">
                    <el-input v-model="searchForm.lockedbyuid" placeholder="null"></el-input>
                </el-form-item>
                <el-form-item label="锁定时间" prop="lockedtime">
                    <el-date-picker
                        v-model="searchForm.lockedtime"
                        type="datetime"
                        placeholder="Select date and time"
                    />
                </el-form-item>
                <el-form-item label="是否冻结" prop="status_freeze">
                    <el-select v-model="searchForm.status_freeze" placeholder="Select" size="large">
                        <el-option label="是" value=true />
                        <el-option label="否"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="冻结者ID" prop="freezedbyuid">
                    <el-input v-model="searchForm.freezedbyuid" placeholder="null"></el-input>
                </el-form-item>
                <el-form-item label="冻结时间" prop="freezetime">
                    <el-date-picker
                        v-model="searchForm.freezetime"
                        type="datetime"
                        placeholder="Select date and time"
                    />
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
import { ref,unref } from 'vue'
import axios from 'axios'
import http from '../api/http'
import { getAlluser, addtaguser, getAtaguser, tagEdit, tagopera, multagopera,tagSearch, getTagTrick,AuserTrick} from '../api/user'
import { Search } from '@element-plus/icons-vue'
import { InfoFilled } from '@element-plus/icons-vue'

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
    // 获取列表table数据
    getAlluser().then(res => {
        console.log('get all user info list!',res.data)
        tableData.value=res.data.children
    })
}
getTabledata()
const getTrick = () => {
    detaildialogVisible.value = true
    getTagTrick().then(res => {
        console.log('get all trick info list!',res.data)
        UserDetail.value=res.data.children
    })
}
const tableRowClassName = ({row,rowIndex}) => {
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
    telephone: '',
    representativeID: '',
    telecom_num: '',
    wechat_num: '',
    username: '',
    comments: '',
    orgid: '',
    position: '',
})
const editform = ref({
    email: '',
    username: '',
    comments: '',
    representativeID: '',
    orgid: 0,
    position: '',
    mobile: '',
    telephone: '',
    wechat_num: '',
    telecom_num: '',
})
const searchForm = ref({
    id: '',
    partial_name: '',
    email: '',
    orgid: '',
    position: '',
    representativeID: '',
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
const rules = ref({
    username: [
        { required: true, message: '请输入用户名称', trigger: 'blur' }
    ],
    email: [
        { required: true, validator: checkEmail, trigger: 'blur' }
    ],
    representativeID: [
        { required: true, message: '请输入对接人ID', trigger: 'blur' }
    ],
    orgid: [
        { required: true, message: '请输入所属组织', trigger: 'blur' }
    ],
    position: [
        { required: true, message: '请输入职位', trigger: 'blur' }
    ],
})

// add new 提交验证！
const submitForm = async () => {
    // need unref first !! then check otherwise error
    const refform = unref(formref)
    if(!refform) return
    try{
        await refform.validate()
        console.log('huhuhuuuu',form.value)
        addtaguser(form.value).then(res => {
            console.log('post new form success!',res.data)
            alert(res.data.message)
            getTabledata()
            adddialogVisible.value = false
            refform.resetFields()
        })
    } catch (error) {
        console.log('no! form add failed! ',form.value)
    }
}
const cancelForm = () => {
    // couldn't put reset in add()
    if(formref){
        const form = unref(formref)
        form.resetFields();
    }
    adddialogVisible.value = false
}
// 搜索框
const searchselect = ref('')
const searchinput = ref('')
// 多选框
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
    AuserTrick(id).then(res => {
        UserDetail.value=res.data
    })
    console.log(UserDetail.value)
}
const submitEdit = () => {
    const refform = unref(editformref)
    try{
        console.log(editid.value)
        console.log(editform.value)
        tagEdit(editid.value,editform.value).then(res => {
            console.log('subchange',res.data)
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
    } catch(error) {
        console.log('error in edit submit!')
    }
}
const handleEdit = (id) => {
    editdialogVisible.value = true
    editid.value = id
    getAtaguser(id).then(res => {
        UserDetail.value = res.data
        editform.value.email=UserDetail.value.email
        editform.value.mobile=UserDetail.value.mobile
        editform.value.telephone=UserDetail.value.telephone
        editform.value.telecom_num=UserDetail.value.telecom_num
        editform.value.wechat_num=UserDetail.value.wechat_num
        editform.value.username=UserDetail.value.username
        editform.value.representativeID=UserDetail.value.representativeID
        editform.value.orgid=UserDetail.value.orgid
        editform.value.position=UserDetail.value.position
        editform,value.comments=UserDetail.value.comments
        console.log(editform.value)
    })

    // ismod.value = true
    // console.log(ismod.value)
}
const cancelEdit = () => {
    if(editformref){
        const form = unref(editformref)
        form.resetFields();
    }
    editdialogVisible.value = false
}
const handleDelete = (id) => {
    // axios({
    //     method:'patch',
    //     url: 'http://172.16.113.158:5000/user/actionforauser/'+id,
    //     data: {"operate": "delete"}
    // })
    tagopera(id, "delete").then(res => {
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
    tagopera(id, "lock").then(res => {
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
    tagopera(id, "unlock").then(res => {
        console.log(res.data)
        alert('已解锁！')
        getTabledata()
    })
}
const handleFreeze = (id) => {
    tagopera(id, "freeze").then(res => {
        console.log(res.data)
        getTabledata()
        alert('已冻结！')
    })
}
const handleUnfreeze = (id) => {
    tagopera(id, "unfreeze").then(res => {
        console.log(res.data)
        getTabledata()
        alert('已解冻！')
    })
}
// toolbar工具条多选操作
const muldel = () => {
    console.log(multipleSelection.value)
    console.log(select_orderId.value)
    try{
        // axios({
        //     method:'patch',
        //     url: 'http://172.16.113.158:5000/user/action/delete',
        //     data: {"data": select_orderId.value}
        // })
        multagopera("delete", select_orderId.value).then(res => {
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
    // axios({
    //     method:'post',
    //     url: 'http://172.16.113.158:5000/user/',
    //     data:{
    //         "email": "string",
    //         "mobile": "string",
    //         "telephone": "string",
    //         "wechat_num": "string",
    //         "telecom_num": "string",
    //         "username": "tjqtest0",
    //         "password": "string",
    //         "sysrole": "sysadmin",
    //         "orgid": 0,
    //         "position": "string"
    //     }
    // }).then(res => {
    //     console.log('posttted',res.data)
    // })
}
const mulfro = () => {
    console.log(multipleSelection.value)
    try{
        multagopera("freeze", select_orderId.value).then(res => {
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
    try{
        multagopera("unfreeze", select_orderId.value).then(res => {
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
    try{
        multagopera("lock", select_orderId.value).then(res => {
            console.log(res.data)
            multipleTableRef.value.clearSelection()
            getTabledata()
        })
    } catch (error) {
        console.log('mullock error!')
    }
}
const mulunlock = () => {
    console.log(multipleSelection.value)
    try{
        multagopera("unlock", select_orderId.value).then(res => {
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
        console.log('mulunlock error!')
    }
}
const getSearchinfo = () => {
    searchTableVisible.value = true
}
const submitsearchForm = () => {
    console.log(searchForm.value)
    tagSearch(searchForm.value).then(res => {
        tableData.value = res.data.children
        searchTableVisible.value= false
    }, err => {
        console.log(err)
    })
}
const cancelsearchForm = () => {
    if(searchref){
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