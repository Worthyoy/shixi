<template>
  <div class="box">
    <div class="left">
      <el-tree :data="data" :props="defaultProps" :render-content="renderContent" @node-click="handleNodeClick" />
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
        <el-form-item>
          <el-input v-model="finput" placeholder="请输入筛选条件" clearable></el-input>
        </el-form-item>

      </el-form>
      <el-table :data="pagedData" v-model:selected-row-keys="selectedRowKeys" @selection-change="handleSelectionChange"
        :page-size="pageSize" class="table" width="100%">
        <el-table-column type="selection" />
        <el-table-column prop="id" label="id" width="100"></el-table-column>
        <el-table-column prop="name" label="名称" width="100"></el-table-column>
        <el-table-column prop="comments" label="comments" width="100"></el-table-column>
        <el-table-column prop="level" label="level" width="100"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button @click="find(scope.row.id)" type="text">删除</el-button>
            <el-button @click="edit(scope.row.id)" type="text">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :current-page="currentPage" :total="tableData.length"
        :page-size="pageSize" @current-change="handleCurrentChange">
      </el-pagination>
      <el-dialog v-model="dialogVisible3" title="新增项目">
        <el-form :model="form3">
          <el-form-item label="邮件内容">
            <Editor v-model="form3.e_content" :init="init"></Editor>
          </el-form-item>
          <el-form-item>
            <el-button>取消</el-button>
            <el-button type="primary" @click="updateContent()">
              确定修改
            </el-button>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form3')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog v-model="dialogVisible" title="新增项目">
        <el-form :model="form" label-width="100px">
          <el-form-item label="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="comments">
            <el-input v-model="form.comments"></el-input>
          </el-form-item>
          <el-form-item label="level">
            <el-input v-model="form.level"></el-input>
          </el-form-item>
          <el-form-item label="客户logo" for="fileInput">
            <input type="file" id="fileInput" ref="fileInput" @change="handleFileChange">
          </el-form-item>
          <el-form-item label="logoname">
            <el-input type="text" id="textInput" v-model="inputText"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="success" @click="handleSubmit">上传logo</el-button>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog v-model="dialogVisible1" title="修改项目">
        <el-form :model="form1" label-width="100px">
          <el-form-item label="name">
            <el-input v-model="form1.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="logopath" >
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
            </el-form-item> -->
          <el-form-item label="comments">
            <el-input v-model="form1.comments"></el-input>
          </el-form-item>
          <el-form-item label="level">
            <el-input v-model="form1.level"></el-input>
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
import {
  ElTable, ElTableColumn, ElPagination, ElButton, ElMessage, ElForm,
  ElFormItem, ElInput, ElDialog, ElTree, ElLoading
} from 'element-plus'

//引入路由
import { useRouter } from 'vue-router'

import { ref, onMounted, reactive, watch, computed } from 'vue'
import axios from 'axios';

//上传logo
const file = ref(null);
const inputText = ref("");

function handleFileChange(event) {
  file.value = event.target.files[0]; // 保存文件到响应式变量中
}

async function handleSubmit() {
  const formData = new FormData();
  formData.append("file", file.value);
  formData.append("inputText", inputText.value);
  axios.post('/api/organization/logo', formData)
    .then(response => {
      // 后端处理成功后执行的代码
      alert("上传成功")
    })
    .catch(error => {
      // 后端处理失败后执行的代码
      alert("上传失败");
    })
  // 处理响应
}
//分页
const currentPage = ref(1)
const pageSize = 5
const offset = computed(() => ((currentPage.value - 1) * pageSize))
const totalPages = computed(() => Math.ceil(tableData.value.length / pageSize))
const pagedData = computed(() => {
  if (finput.value) {
    return tableData.value.filter(item => item.comments.toString().indexOf(finput.value) > -1).slice(offset.value, (offset.value + pageSize));
  } else {
    return tableData.value.slice(offset.value, (offset.value + pageSize));
  }
});

// 过滤函数
const filter = () => {
  currentPage.value = 1;
}
const handleCurrentChange = (val) => {
  currentPage.value = val;
}
//加载
const loading = ref(false)
const openLoading = () => {
  loading.value = ElLoading.service({
    lock: true,
    text: '正在努力加载中...',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
const closeLoading = () => {
  loading.value.close()
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
    dele2(item)
  }
}
//变量定义
const input = ref("");
const finput = ref("");
const dialogVisible = ref(false);
const dialogVisible1 = ref(false);
const dialogVisible3 = ref(false);
const form = ref({
  "name": "",
  "logopath": "N/A",
  "istoporg": false,
  "higherorgid": 0,
  "islocked": false,
  "comments": "",
  "level": ""
})
const form1 = ref({
  "name": "",
  "logopath": "N/A",
  "istoporg": false,
  "higherorgid": 0,
  "islocked": false,
  "comments": "string"
})

const tableData = ref([]);
//页面初始化
onMounted(() => {
  openLoading()
  axios({
    method: 'get',
    url: '/api/organization/',
  }).then(res => {

    tableData.value = res.data.children
  })
  closeLoading()
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
const bianji = () => {

  dialogVisible3.value = true;

}
const fetchData = () => {
  openLoading()
  axios({
    method: 'get',
    url: '/api/organization/',
  }).then(res => {

    tableData.value = res.data.children
  })
  closeLoading()
}
//新增提交
const submitForm = () => {
  openLoading()
  alert(sessionStorage.getItem('Authorization'))
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
      alert("提交失败");
    })
  closeLoading()
}
//修改提交
const submitForm1 = () => {
  openLoading()
  alert(i.value)
  axios.put('/api/organization/' + i.value, form1.value, {
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
      alert("修改失败")
    })
  closeLoading()
}
//单个删除
const a = ref("")
const b = ref("")
const find = (id) => {
  a.value = id
  if (tableData.value[a.value - 1].level == "1") {
    for (let i = 0; i < tableData.value.length; i++) {
      if (tableData.value[i].level.charAt(0) == "1") {
        b.value = tableData.value[i].id
        dele()
      }
    }
  }
  else if (tableData.value[a.value - 1].level == "2") {
    for (let i = 0; i < tableData.value.length; i++) {
      if (tableData.value[i].level.charAt(0) == "2") {
        b.value = tableData.value[i].id
        dele()
      }
    }
  }
  else if (tableData.value[a.value - 1].level == "3") {
    for (let i = 0; i < tableData.value.length; i++) {
      if (tableData.value[i].level.charAt(0) == "3") {
        b.value = tableData.value[i].id
        dele()
      }
    }
  }
  else if (tableData.value[a.value - 1].level == "1-1") {
    for (let i = 0; i < tableData.value.length; i++) {
      if (tableData.value[i].level.substring(0, 3) == "1-1") {
        b.value = tableData.value[i].id
        dele()
      }
    }
  }
  else if (tableData.value[a.value - 1].level == "2-1") {
    for (let i = 0; i < tableData.value.length; i++) {
      if (tableData.value[i].level.substring(0, 3) == "2-1") {
        b.value = tableData.value[i].id
        dele()
      }
    }
  }
  else if (tableData.value[a.value - 1].level == "3-1") {
    for (let i = 0; i < tableData.value.length; i++) {
      if (tableData.value[i].level.substring(0, 3) == "3-1") {
        b.value = tableData.value[i].id
        dele()
      }
    }
  }
  else {
    b.value = id
    dele()
  }
}
const dele = () => {
  openLoading()
  axios.delete(`/api/organization/` + b.value)
    .then(response => {

      fetchData()
    })
    .catch(error => {
      alert("删除失败")
    })
  closeLoading()
}
const dele2 = (id) => {
  openLoading()
  axios.delete(`/api/organization/${id}`)
    .then(response => {

      fetchData()
    })
    .catch(error => {
      alert("删除失败")
    })
  closeLoading()
}
//查询
const search = () => {
  openLoading()
  const i = input.value
  //alert(i)
  axios.get(`/api/organization/${i}`)
    .then(res => {

      // alert(res.data.name)

      tableData.value = []
      tableData.value.push(res.data)
    }).catch(error => {
      alert("查询失败")
    })
  closeLoading()
}

//分级

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
    label: '二级 2-1',
    children: [{
      id: 9,
      label: '三级 2-1-1'
    }, {
      id: 10,
      label: '三级 2-1-2'
    }]
  }]
}, {
  id: 3,
  label: '一级 3',
  children: [{
    id: 7,
    label: '二级 3-1',
    children: [{
      id: 9,
      label: '三级 3-1-1'
    }, {
      id: 10,
      label: '三级 3-1-2'
    }]
  }]
}
]

const defaultProps = {
  children: 'children',
  label: 'label',
}

const handleNodeClick = (node) => {
  if (node.label == "一级 1") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      //tableData.value=res.data.children.slice(0,3);
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.charAt(0) === "1") {
          tableData.value.push(res.data.children[i]);
        }
      }
    })

  } else if (node.label == "一级 2") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.charAt(0) === "2") {
          tableData.value.push(res.data.children[i]);
        }
      }
    })
  } else if (node.label == "一级 3") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.charAt(0) === "3") {
          tableData.value.push(res.data.children[i]);
        }
      }
    })
  }
  else if (node.label == "二级 1-1") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.substring(0, 3) === "1-1") {
          tableData.value.push(res.data.children[i]);
        }
      }
    })
  }
  else if (node.label == "二级 2-1") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.substring(0, 5) === "1-1-1") {
          tableData.value.push(res.data.children[i]);
        }
      }
    })
  }
  else if (node.label == "二级 3-1") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.substring(0, 5) === "1-1-1") {
          tableData.value.push(res.data.children[i]);
        }
      }
    })
  }
  else if (node.label == "三级 1-1-1") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.substring(0, 5) === "1-1-1") {
          tableData.value.push(res.data.children[i]);
        }
      }
    })
  }
  else if (node.label == "三级 1-1-2") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.substring(0, 5) === "1-1-2") {
          tableData.value.push(res.data.children[i]);
        }
      }
    })
  }
  else if (node.label == "三级 2-1-1") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.substring(0, 5) === "2-1-1") {
          tableData.value.push(res.data.children[i]);
        }
      }
    })
  }
  else if (node.label == "三级 2-1-2") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.substring(0, 5) === "2-1-2") {
          tableData.value.push(res.data.children[i]);
        }
      }
    })
  }
  else if (node.label == "三级 3-1-1") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.substring(0, 5) === "3-1-1") {
          tableData.value.push(res.data.children[i]);
        }
      }
    })
  }
  else if (node.label == "三级 3-1-2") {
    axios({
      method: 'get',
      url: '/api/organization/',
    }).then(res => {
      tableData.value = []
      for (let i = 0; i < res.data.children.length; i++) {
        if (res.data.children[i].level.substring(0, 5) === "3-1-2") {
          tableData.value.push(res.data.children[i]);
        }
      }
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
pagination {
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