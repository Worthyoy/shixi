<template>
    <div class="box">
      <div class="left">
        <el-tree
          :data="data"
          :props="defaultProps"
          :render-content="renderContent"
          @node-click="handleNodeClick"
        />
      </div>
      <div class="right">
        <el-form :inline="true" class="form">
          <el-form-item>
            <el-button @click="add()" type="primary" class="button">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="deleall()" type="primary" class="button">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-input v-model="input" placeholder="请输入编号" clearable></el-input>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item>
            <el-button @click="search()" type="primary" class="button">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="pagedData" v-model:selected-row-keys="selectedRowKeys" 
                  @selection-change="handleSelectionChange" :page-size="pageSize" class="table" width="100%">
          <el-table-column type="selection" />
          <el-table-column prop="id" label="id" width="100"></el-table-column>
          <el-table-column prop="name" label="名称" width="100"></el-table-column>
          <el-table-column prop="comments" label="comments" width="100"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="scope">
              <el-button @click="dele(scope.row.id)" type="text">删除</el-button>
              <el-button @click="edit(scope.row.id)" type="text">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next"
        :current-page="currentPage"
        :total="tableData.length"
        :page-size="pageSize"
        @current-change="handleCurrentChange">
        </el-pagination>
        <el-dialog v-model="dialogVisible" title="新增项目" >
          <el-form :model="form" label-width="100px">
            <el-form-item label="name" >
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="logopath" >
              <el-input v-model="form.logopath"></el-input>
            </el-form-item>
            <el-form-item label="istoporg" >
              <el-input v-model="form.istoporg"></el-input>
            </el-form-item>
            <el-form-item label="higherorgid" >
              <el-input v-model="form.higherorgid"></el-input>
            </el-form-item>
            <el-form-item label="isslocked" >
              <el-input v-model="form.islocked"></el-input>
            </el-form-item>
            <el-form-item label="comments" >
              <el-input v-model="form.comments"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog v-model="dialogVisible1" title="修改项目" >
          <el-form :model="form1" label-width="100px">
            <el-form-item label="name" >
              <el-input v-model="form1.name"></el-input>
            </el-form-item>
            <el-form-item label="logopath" >
              <el-input v-model="form1.logopath"></el-input>
            </el-form-item>
            <el-form-item label="istoporg" >
              <el-input v-model="form1.istoporg"></el-input>
            </el-form-item>
            <el-form-item label="higherorgid" >
              <el-input v-model="form1.higherorgid"></el-input>
            </el-form-item>
            <el-form-item label="isslocked" >
              <el-input v-model="form1.islocked"></el-input>
            </el-form-item>
            <el-form-item label="comments" >
              <el-input v-model="form1.comments"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="submitForm1('form')">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ElTable, ElTableColumn, ElPagination, ElButton, ElMessage, ElForm, 
           ElFormItem, ElInput, ElDialog, ElTree} from 'element-plus'
  
  //引入路由
  import { useRouter } from 'vue-router'
  
  import { ref, onMounted, reactive, watch, computed } from 'vue'
  import axios from 'axios';
  
  //分页
  const currentPage = ref(1)
  const pageSize = 5
  const offset = computed(() => ((currentPage.value - 1) * pageSize))
  const totalPages = computed(() => Math.ceil(tableData.value.length / pageSize))
  const pagedData = computed(() => tableData.value.slice(offset.value, (offset.value + pageSize)))
  const handleCurrentChange = (val) => {
  currentPage.value = val;
}

// 批量删除勾选

const selectedRowKeys = ref([])
const selectedIds = ref([])
const handleSelectionChange = (selectedRows) => {
  // 判断是否有选择的数据
  if (selectedRows.length > 0) {
    const ids = selectedRows.map(item => item.id)
    selectedIds.value = ids
  } 
}
const deleall = () => {

    for (let i = 0; i < selectedIds.value.length; i++) {
    const item = selectedIds.value[i]
    dele(item)
    } 
}
//变量定义
const input = ref("");

const dialogVisible = ref(false);
const dialogVisible1 = ref(false);
const form = ref({
  "name": "",
  "logopath": "N/A",
  "istoporg": false,
  "higherorgid": 0,
  "islocked": false,
  "comments": "string"
})
const form1 = ref({
  "name": "",
  "logopath": "N/A",
  "istoporg": false,
  "higherorgid": 0,
  "islocked": false,
  "comments": "string"
})

const tableData= ref([]);
//页面初始化
onMounted(() => {
    axios({
        method:'get',
        url: '/api/organization/',
    }).then(res => {
        
        tableData.value=res.data.children
    })
  // 在这里可以执行一些需要等待DOM渲染完成之后才能执行的代码
});
//新增和修改的弹窗
const i = ref('')
const edit = (id) => {
    i.value = id
    dialogVisible1.value = true;
}
const add = () => {
   
    dialogVisible.value = true;
  
}
const fetchData = () => {
   
  axios({
        method:'get',
        url: '/api/organization/',
    }).then(res => {
        
        tableData.value=res.data.children
    })
 
}
//新增提交
const submitForm = () => {
    axios.post('/api/organization/', form.value, {
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('Authorization')
        }
    })
        .then(response => {
            // 后端处理成功后执行的代码
            dialogVisible.value = false;
            fetchData()
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            alert(error);
        })
}
//修改提交
const submitForm1 = () => {
    alert(i.value)
    axios.put('/api/organization/'+i.value, form1.value,{
        headers: {
            "Authorization": "Bearer " + sessionStorage.getItem('Authorization')
        }
    })
        .then(response => {
            alert("修改成功")
            // 后端处理成功后执行的代码
            dialogVisible1.value = false;
            fetchData()
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            alert(error);
        })

}
//单个删除
const dele = (id) => {
    axios.delete(`/api/organization/${id}`)
    .then(response => {
      
      fetchData()
    })
    .catch(error => {
      alert(error)
    })
}
//查询
const search = () => {
   const i = input.value
   //alert(i)
   axios.get(`/api/organization/${i}`)
   .then(res => {
       
        // alert(res.data.name)

        tableData.value=[]
        tableData.value.push(res.data)
    }) .catch(error => {
      alert(error)
    })

}

//分级
let filteredData = tableData;
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

const handleNodeClick = (node) => {
    if(node.label=="一级 1"){
        axios({
        method:'get',
        url: '/api/organization/',
    }).then(res => {
        tableData.value=res.data.children.slice(0,3);
    })
    
    }else if(node.label=="一级 2"){
        axios({
        method:'get',
        url: '/api/organization/',
    }).then(res => {
        tableData.value=res.data.children.slice(3,5);
    })
    }else if(node.label=="一级 3"){
        axios({
        method:'get',
        url: '/api/organization/',
    }).then(res => {
        tableData.value=res.data.children.slice(5);
    })
    }
}

const renderContent = (h, { node, data, store }) => {
  const level = node.level
  let content = null

  switch (level) {
    case 1:
      content = h('span', { class: 'level-1' }, data.label)
      break
    case 2:
      content = h('span', { class: 'level-2' }, data.label)
      break
    case 3:
      content = h('span', { class: 'level-3' }, data.label)
      break
    default:
      content = h('span', {}, data.label)
  }

  return content
}

</script>
<style scoped>
.pagination {
  margin-top: 20px;
  display: flex;  
  justify-content: flex-end;
}

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
</style>
