<!-- 部门 -->
<template>
    <div class="box">
        <div class="left">
            <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
        </div>
        <div class="right">
            <el-form :inline="true" class="form">
                <el-form-item>
                    <el-button @click="add()" type="primary" class="button">新增</el-button>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" class="button">删除</el-button>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="input" placeholder="编号/名称" clearable></el-input>
                </el-form-item>
                <el-form-item>

                </el-form-item>
                <el-form-item>
                    <el-button @click="search()" type="primary" class="button">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 基于elementplus，table表格，表格内容为项目编号、项目名称、测评次数、测评序号、测评名称、测评类别、操作（暂停、恢复、删除、锁定、解锁、报告生成、报告更新、下载） -->
            <el-table :data="currentTableData" class="table" width="100%">
                <el-table-column type="selection" />
                <el-table-column prop="id" label="id" width="100"></el-table-column>
                <el-table-column prop="name" label="名称" width="100"></el-table-column>
                <el-table-column prop="comments" label="comments" width="100"></el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button @click="dele(scope.row.id)" type="text">删除</el-button>
                        <el-button @click="edit()" type="text">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination background :current-page="currentPage" :page-size="pageSize"
                layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange"
                @size-change="handleSizeChange" class="pagination"></el-pagination>

            <!-- 基于elementplus弹框，内容为form表单，内容包含：客户名称的input、客户logo的图片上传、客户联系人的input、联系人职位的input、练习方式的input、项目说明的textare -->
            <el-dialog v-model="dialogVisible" title="新增项目">
                <el-form :model="form" label-width="100px">
                    <el-form-item label="客户名称">
                        <el-input v-model="form.customerName"></el-input>
                    </el-form-item>
                    <el-form-item label="客户logo">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :auto-upload="false"
                            :file-list="[]">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success"
                                @click="submitForm('form')">上传到服务器</el-button>
                            <div slot="tip" class="el-upload__tip"></div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="客户联系人">
                        <el-input v-model="form.customerContact"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人职位">
                        <el-input v-model="form.contactPosition"></el-input>
                    </el-form-item>
                    <el-form-item label="练习方式">
                        <el-input v-model="form.practiceMode"></el-input>
                    </el-form-item>
                    <el-form-item label="项目说明">
                        <el-input type="textarea" v-model="form.projectDescription"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('form')">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script setup>
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus'
//引入路由
import { useRouter } from 'vue-router'
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios';
let currentPage = ref(1);
let pageSize = ref(3);
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
// let arr = reactive([])
// function change(){

// arr.push({
//     bianhao: '6',
//     mingcheng: '项目6',
//     fujibianhao: '6',
//     beizhu: '备注6'
//     })
// }
const input = ref('');
const mode = ref('');
const editForm = ref({});
const dialogVisible = ref(false);
const form = ref({
    customerName: '',
    customerLogo: '',
    customerContact: '',
    contactPosition: '',
    practiceMode: '',
    projectDescription: ''
})

const tableData = ref([]);

onMounted(() => {
    axios({
        method: 'get',
        url: '/api/organization/',
    }).then(res => {
        tableData.value = res.data.children;
        tableData.value.push(...res.data.children);
        tableData.value.push(...res.data.children);
        total.value = tableData.value.length;
        getCurrentPageData(1);
    })
    // 在这里可以执行一些需要等待DOM渲染完成之后才能执行的代码
});


const edit = () => {



}
const add = () => {

    dialogVisible.value = true;

}
const submitForm = () => {
    const { customerName } = form.value

    axios.post('/api/organization/', form.value)
        .then(response => {
            // 后端处理成功后执行的代码
            dialogVisible.value = false;
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            alert(error);
        })
}

const fetchData = () => {
    axios({
        method: 'get',
        url: '/api/organization/',
    }).then(res => {

        tableData.value = res.data.children
    })
}
const dele = (id) => {
    axios.delete(`/api/organization/${id}`)
        .then(response => {
            fetchData()
        })
        .catch(error => {
            alert(error)
        })
}

const search = () => {
    const a = input.value

}



const data = [{
    id: 1,
    label: '一级 1',
    children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
            id: 9,
            label: '三级 1-1-1'
        }, {
            id: 10,
            label: '三级 1-1-2'
        }]
    }]
}, {
    id: 2,
    label: '一级 2',
    children: [{
        id: 5,
        label: '二级 2-1'
    }, {
        id: 6,
        label: '二级 2-2'
    }]
}, {
    id: 3,
    label: '一级 3',
    children: [{
        id: 7,
        label: '二级 3-1'
    }, {
        id: 8,
        label: '二级 3-2'
    }]
}
]

const defaultProps = {
    children: 'children',
    label: 'label',
}


</script>
<style>
.box {
    display: flex;
    height: 100%;
}

.left {
    width: 200px;
    height: 100%;
    border-right: 1px solid #eee;
}

.right {
    flex: 1;
    height: 100%;
    padding-left: 20px;

}

.title {
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    font-size: 20px;
}

.el-table {
    margin-bottom: 20px;
}

.pagination {
    position: absolute;
    bottom: 5vh;
}
</style>