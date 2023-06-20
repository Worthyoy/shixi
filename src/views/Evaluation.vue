<!-- 测评管理 -->
<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">测评管理</div>
        </div>
        <!-- 基于elementplus，form表单，inline模式，新增按钮、开始按钮、暂停按钮、恢复按钮、删除按钮、锁定按钮、解锁按钮 -->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button @click="add()" type="primary" class="button">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button">开始</el-button>
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
        <el-table :data="currentTableData" class="table" width="100%">
            <el-table-column type="selection" />
            <el-table-column prop="number" label="编号" width="100"></el-table-column>
            <el-table-column prop="type" label="类型" width="100"></el-table-column>
            <el-table-column prop="name" label="名称" width="100"></el-table-column>
            <el-table-column prop="status" label="状态" width="100"></el-table-column>
            <el-table-column prop="project" label="所属项目" width="100"></el-table-column>
            <el-table-column prop="num" label="受测用户数" width="100"></el-table-column>
            <el-table-column prop="xianzhi" label="评率限制" width="100"></el-table-column>
            <el-table-column prop="templateNo" label="模板编号" width="100"></el-table-column>
            <el-table-column prop="emailNo" label="邮件服务器编号" width="100"></el-table-column>
            <el-table-column prop="serverNo" label="相应服务器编号" width="100"></el-table-column>
            <el-table-column prop="date" label="创建日期" width="100"></el-table-column>
            <el-table-column prop="is" label="数据是否加密" width="100"></el-table-column>
            <el-table-column prop="beizhu" label="备注" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template #default>
                    <el-button @click="dele(scope.row.id)" type="text">删除</el-button>
                    <el-button @click="stop(scope.row.recipient)" type="text">暂停发送</el-button>
                    <el-button @click="start()" type="text" :disabled="disableButton1">开始发送</el-button>
                    <el-button @click="resume(scope.row.recipient)" type="text">恢复发送</el-button>

                    <el-button @click="cancel(scope.row.recipient)" type="text">停止发送</el-button>

                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize" class="pagination"
            @current-change="handleCurrentChange" style="position: absolute;bottom: 4vh;"></el-pagination>
        <!-- 基于elementplus弹框，内容为form表单，内容包含：目标选择的下拉菜单，邮件模板选择下拉菜单、接收方评率限制下拉菜单、发送时段输入框、选择邮件服务器输入框、邮件发件人输入框、选择相应服务器输入框、备注输入框 -->
        <el-dialog v-model="dialogVisible" title="新增">
            <el-form :model="form2" :rules="rules" ref="form" label-width="180px" class="demo-ruleForm">
                <el-form-item label="目标选择" prop="mubiao">
                    <el-select v-model="form.mubiao" placeholder="请选择">
                        <el-option label="选项1" value="1"></el-option>
                        <el-option label="选项2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="邮件模板选择" prop="emailTemplate">
                    <el-select v-model="form.emailTemplate" placeholder="请选择">
                        <el-option label="选项1" value="1"></el-option>
                        <el-option label="选项2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收方评率限制" prop="pinglv">
                    <el-select v-model="form.pinglv" placeholder="请选择">
                        <el-option label="选项1" value="1"></el-option>
                        <el-option label="选项2" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发送时段" prop="shiduan">
                    <el-input v-model="form.shiduan"></el-input>
                </el-form-item>
                <el-form-item label="选择邮件服务器" prop="server">
                    <el-input v-model="form.server"></el-input>
                </el-form-item>
                <el-form-item label="邮件发件人" prop="people">
                    <el-input v-model="form.people"></el-input>
                </el-form-item>
                <el-form-item label="选择相应服务器" prop="server2">
                    <el-input v-model="form.server2"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="beizhu">
                    <el-input v-model="form.beizhu"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog v-model="dialogVisible" title="开始发送邮件">
            <el-form :model="form" label-width="180px" class="demo-ruleForm">
                <el-form-item label="选择发送对象">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="邮件编号">
                    <el-input v-model="form.user_id"></el-input>
                </el-form-item>
                <el-form-item label="邮件主题">
                    <el-input v-model="form.user_name"></el-input>
                </el-form-item>
                <el-form-item label="邮件内容">
                    <Editor v-model="form.content" :init="init"></Editor>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('form')">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog v-model="dialogVisible2" title="暂停发送邮件">
            <el-form :model="form1" label-width="180px" class="demo-ruleForm">
                <el-form-item label="选择暂停对象">
                    <el-input v-model="form1.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm1('form1')">确 定</el-button>

            </span>
        </el-dialog>
    </div>
</template>
<script lang="ts"  setup>
const format = (percentage) => (percentage === 100 ? 'Full' : `${percentage}%`)
//引入reactive
import {
    ElTable, ElTableColumn, ElPagination, ElButton, ElMessage, ElForm,
    ElFormItem, ElInput, ElDialog, ElTree, ElLoading
} from 'element-plus'

//引入路由
import { useRouter } from 'vue-router'

import { ref, onMounted, reactive, watch, computed } from 'vue'
import axios from 'axios';
import Editor from '@tinymce/tinymce-vue'

//变量定义
const input = ref("");
const finput = ref("");

const disableButton1 = ref(false)

const dialogVisible = ref(false);
const dialogVisible1 = ref(false);
const dialogVisible2 = ref(false);
//form  
const form = ref({
    "email": '1283543521@qq.com',
    user_id: '',
    user_name: '',
    content: '',
});
const form1 = ref({
    "email": '1283543521@qq.com',
});
//form2
const form2 = ref({
    "id": 0,
    "sender": "",
    "recipient": "",
    "subject": "",
    "content": "",
    "project": "",
    "user_count": "",
    "frequency_limit": "",
    "mail_server_id": 0,
    "response_server_id": 0,
    "data_encryption": true,
    "remark": ""
})


//tableData数据
const tableData = ref([]);
//页面初始化
onMounted(() => {
    openLoading()
    axios({
        method: 'get',
        url: '/api/mail/get_all',
    }).then(res => {

        tableData.value = res.data
        for (let i = 0; i < tableData.value.length; i++) {
            tableData.value[i].content = tableData.value[i].content.substring(0, 6) + "..."

        }

    })
    closeLoading()
});
const fetchData = () => {
    openLoading()
    axios({
        method: 'get',
        url: '/api/mail/get_all',
    }).then(res => {

        tableData.value = res.data
        for (let i = 0; i < tableData.value.length; i++) {
            tableData.value[i].content = tableData.value[i].content.substring(0, 6) + "..."
        }
    })
    closeLoading()
}
//筛选
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

//上锁与解锁

function handleClick() {
    // 禁用按钮1和按钮2
    disableButton1.value = true
}
function handleClick1() {
    // 禁用按钮1和按钮2
    disableButton1.value = false
}
//分页
const currentPage = ref(1)
const pageSize = 5
const offset = computed(() => ((currentPage.value - 1) * pageSize))
const totalPages = computed(() => Math.ceil(tableData.value.length / pageSize))
const pagedData = computed(() => {
    if (finput.value) {
        return tableData.value.filter(item => item.sender.toString().indexOf(finput.value) > -1).slice(offset.value, (offset.value + pageSize));
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
//查询
const search = () => {
    openLoading()
    const i = input.value
    //alert(i)
    axios.get(`/api/mail/get_mail/${i}`)
        .then(res => {

            // alert(res.data.name)

            tableData.value = []
            tableData.value.push(res.data)
            tableData.value[0].content = tableData.value[0].content.substring(0, 6) + "..."
        }).catch(error => {
            alert("查询失败")
        })
    closeLoading()
}
//删除数据
const dele = (id) => {
    axios.delete(`/api/mail/delete_mail/${id}`)
        .then(response => {

            fetchData()
        })
        .catch(error => {
            alert("删除失败")
        })
}
//add
const add = () => {

    dialogVisible1.value = true;

}
const submitForm2 = () => {
    openLoading()
    axios.post('/api/mail/post_new', form2.value)
        .then(response => {
            // 后端处理成功后执行的代码
            dialogVisible1.value = false;
            alert("添加成功")
            fetchData()
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            alert("添加失败")

        })
    closeLoading()
}
//开始发送邮件
const init = {
    language: 'zh_CN', //语言类型
    plugins: ['quickbars', 'link', 'table', 'image', 'emoticons'],
    toolbar: 'fullscreen undo redo restoredraft  | forecolor backcolor bold italic underline fontselect fontsizeselect  | formatselect  |\
      alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | cut copy paste pastetext| blockquote subscript superscript removeformat  | code selectall | indent2em lineheight formatpainter axupimgs |\
              table image media charmap emoticons hr pagebreak insertdatetime print preview ',
    fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
    font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',

    file_picker_callback: function (callback, value, meta) {
        // 这个函数是上传图片要执行的回调函数
        let filetype =
            ".pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4,.mkv, .avi,.wmv, .rmvb,.mov,.mpg,.mpeg,.webm, .jpg, .jpeg, .png, .gif"; //限制文件的上传类型
        let inputElem = document.createElement("input"); //创建文件选择
        inputElem.setAttribute("type", "file");
        inputElem.setAttribute("accept", filetype);
        inputElem.click();
        inputElem.onchange = () => {
            let upurl = "";
            let file = inputElem.files[0]; //获取文件信息
            const ph = 'http://127.0.0.1:8888/'
            let params = new FormData();
            // 这的myfile是和后端约定要的名字
            params.append("myfile", file);
            // file.type.slice(0, 5) == "image" ? upurl = "/template-html/multi-media": upurl = "/template-html/attachment";

            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            };
            upurl = '/uploadFile'
            http.post(upurl, params, config).then((res) => {
                console.log(res.data);
                if (res.data.msg == '上传成功') {
                    console.log(ph + res.data.imgUploadSrc)
                    callback(ph + res.data.imgUploadSrc, {
                        text: res.data.alt,
                        title: res.data.name,
                    });
                }
            }).catch(() => {
                alert("上传出错，服务器开小差了呢");
            });
        }
    }
}
const i = ref('')
const start = () => {

    dialogVisible.value = true;
}
const submitForm = () => {
    openLoading()
    // alert(JSON.stringify(form.value));
    axios.post('/api/mail/send_mail', form.value)
        .then(response => {
            // 后端处理成功后执行的代码
            dialogVisible.value = false;
            alert("发送成功")
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            alert("发送失败")
        })
    closeLoading()
}
//暂停发送邮件
const stop = (recipient) => {
    openLoading()
    axios.post('/api/mail/stop_mail', { "email": recipient })
        .then(response => {
            // 后端处理成功后执行的代码

            alert("暂停成功")
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            alert(error);
        })
    closeLoading()
}

//恢复发送邮件
const resume = (recipient) => {
    openLoading()
    axios.post('/api/mail/resume_mail', { "email": recipient })
        .then(response => {
            // 后端处理成功后执行的代码
            // dialogVisible1.value = false;
            alert("恢复成功")
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            alert("恢复失败")
        })
    closeLoading()
}
//取消发送邮件
const cancel = (recipient) => {
    axios.post('/api/mail/del_mail', { "email": recipient })
        .then(response => {
            // 后端处理成功后执行的代码
            // dialogVisible1.value = false;
            alert("取消成功")
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            alert("取消失败")
        })
    // dialogVisible1.value = true;
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
</style>