<!-- 测评管理 -->
<template>
    <div>
        <!-- 基于elementplus，标题模块，标题为项目管理 -->
        <div class="header">
            <div class="title">测评任务管理</div>
        </div>
        <!-- 基于elementplus，form表单，inline模式，新增按钮、开始按钮、暂停按钮、恢复按钮、删除按钮、锁定按钮、解锁按钮 -->
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-button @click="add()" type="primary" class="button">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="sendwin()" type="primary" class="button">多个任务发送</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button" @click="handleClick">锁定</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="button" @click="handleClick1">解锁</el-button>
            </el-form-item>
            <el-form-item>
                <el-input v-model="input" placeholder="请输入编号" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="search()" type="primary" class="button">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-input v-model="finput" placeholder="请输入过滤条件" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item>
                <el-button @click="filter()" type="primary" class="button">筛选</el-button>
              </el-form-item> -->
        </el-form>
        <!-- 基于elementplus，table表格，表格内容为项目编号、项目名称、测评次数、测评序号、测评名称、测评类别、操作（暂停、恢复、删除、锁定、解锁、报告生成、报告更新、下载） -->
        <el-table :data="pagedData" v-model:selected-row-keys="selectedRowKeys" @selection-change="handleSelectionChange"
            :page-size="pageSize" class="table" width="100%">
            <el-table-column type="selection" />
            <el-table-column prop="id" label="任务编号" width="100"></el-table-column>
            <el-table-column prop="sender" label="发送人" width="100"></el-table-column>
            <el-table-column prop="recipient" label="收件人" width="100"></el-table-column>
            <el-table-column prop="sent_at" label="发送时间" width="100"></el-table-column>
            <el-table-column prop="subject" label="主题" width="100"></el-table-column>
            <el-table-column prop="content" label="内容" width="100"></el-table-column>
            <el-table-column prop="project" label="所属项目" width="100"></el-table-column>
            <el-table-column prop="user_count" label="首测用户数" width="100"></el-table-column>
            <el-table-column prop="frequency_limit" label="频率限制" width="100"></el-table-column>
            <el-table-column prop="mail_server_id" label="邮件服务器编号" width="100"></el-table-column>
            <el-table-column prop="response_server_id" label="相应服务器编号" width="100"></el-table-column>
            <!-- <el-table-column prop="data_encryption" label="数据是否加密" width="100"></el-table-column> -->
            <el-table-column prop="remark" label="备注" width="100"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template #default="scope">
                    <el-button @click="dele(scope.row.id)" type="text">删除</el-button>
                    <el-button @click="stop(scope.row.recipient)" type="text">暂停发送</el-button>
                    <el-button @click="start()" type="text" :disabled="disableButton1">开始发送</el-button>
                    <el-button @click="resume(scope.row.recipient)" type="text">恢复发送</el-button>

                    <el-button @click="cancel(scope.row.recipient)" type="text">停止发送</el-button>

                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :current-page="currentPage" :total="tableData.length"
            :page-size="pageSize" @current-change="handleCurrentChange">
        </el-pagination>
        <!-- 基于elementplus弹框，内容为form表单，内容包含：目标选择的下拉菜单，邮件模板选择下拉菜单、接收方评率限制下拉菜单、发送时段输入框、选择邮件服务器输入框、邮件发件人输入框、选择相应服务器输入框、备注输入框 -->
        <el-dialog v-model="dialogVisible1" title="新增">
            <el-form :model="form2" label-width="180px" class="demo-ruleForm">

                <el-form-item label="发送人">
                    <el-input v-model="form2.sender"></el-input>
                </el-form-item>
                <el-form-item label="收件人">
                    <el-input v-model="form2.recipient"></el-input>
                </el-form-item>
                <el-form-item label="主题">
                    <el-input v-model="form2.subject"></el-input>
                </el-form-item>
                <!-- <el-form-item label="内容">
                    <el-input v-model="form2.content"></el-input>
                </el-form-item> -->
                <el-form-item label="所属项目">
                    <el-input v-model="form2.project"></el-input>
                </el-form-item>
                <el-form-item label="受测用户数">
                    <el-input v-model="form2.user_count"></el-input>
                </el-form-item>
                <el-form-item label="接收方频率限制">
                    <el-select v-model="form2.frequency_limit" placeholder="请选择">
                        <el-option label="5/s" value="5/s"></el-option>
                        <el-option label="10/s" value="10/s"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="邮件服务器编号">
                    <el-input v-model="form2.mail_server_id"></el-input>
                </el-form-item>
                <el-form-item label="响应服务器编号">
                    <el-input v-model="form2.response_server_id"></el-input>
                </el-form-item>
                <el-form-item label="数据是否加密">
                    <el-select v-model="form2.data_encryption" placeholder="请选择">
                        <el-option label="是" value="true"></el-option>
                        <el-option label="否" value="false"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="备注">
                    <el-input v-model="form2.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="submitForm2('form2')">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog v-model="dialogVisible" title="开始发送邮件">
            <el-form :model="form" label-width="180px" class="demo-ruleForm">
                <el-form-item label="选择发送对象">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="发送时间">
                    <el-input v-model="form.send_time"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.user_id"></el-input>
                </el-form-item>
                <el-form-item label="用户id">
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
        <el-dialog v-model="dialogVisible3" title="开始发送邮件">
            <el-form :model="form" label-width="180px" class="demo-ruleForm">
                <el-form-item label="发送时间">
                    <el-input v-model="form.send_time"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.user_id"></el-input>
                </el-form-item>
                <el-form-item label="用户id">
                    <el-input v-model="form.user_name"></el-input>
                </el-form-item>
                <el-form-item label="邮件内容">
                    <Editor v-model="form.content" :init="init"></Editor>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="submitForm3('form')">确 定</el-button>
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
        <!-- <el-dialog v-model="dialogVisible" title="开始发送邮件">
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
        </el-dialog> -->

        <!-- <el-dialog v-model="dialogVisible2" title="暂停发送邮件">
            <el-form :model="form1" label-width="180px" class="demo-ruleForm">
                <el-form-item label="选择暂停对象">
                    <el-input v-model="form1.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm1('form1')">确 定</el-button>

            </span>
        </el-dialog> -->
    </div>
</template>
<script setup>
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
const dialogVisible3 = ref(false);
//form  
const form = ref({
    "email": '',
    send_time: "2023.6.20.19:",
    user_id: '',
    user_name: '',
    content: '',
});
const form1 = ref({
    "email": '',
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
//批量发送
const selectedRowKeys = ref([])
const selectedRevs = ref([])
const handleSelectionChange = (selectedRows) => {
    // 判断是否有选择的数据
    if (selectedRows.length > 0) {
        const Revs = selectedRows.map(item => item.recipient)
        selectedRevs.value = Revs
    }
}
const sendwin = () => {
    dialogVisible3.value = true;
}
const submitForm3 = () => {
    for (let i = 0; i < selectedRevs.value.length; i++) {
        const item = selectedRevs.value[i]
        form.value.email = item

        send2()
        ElMessage("成功发送第" + (i + 1) + "封")
    }
    dialogVisible3.value = false;
}
const send2 = () => {
    openLoading()

    axios.post('/api/mail/send_mail', form.value)
        .then(response => {
            // 后端处理成功后执行的代码
            dialogVisible.value = false;

        })
        .catch(error => {
            // 后端处理失败后执行的代码
            ElMessage("发送失败")
        })
    closeLoading()
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
    //ElMessage(i)
    axios.get(`/api/mail/get_mail/${i}`)
        .then(res => {

            // ElMessage(res.data.name)

            tableData.value = []
            tableData.value.push(res.data)
            tableData.value[0].content = tableData.value[0].content.substring(0, 6) + "..."
        }).catch(error => {
            ElMessage("查询失败")
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
            ElMessage("删除失败")
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
            ElMessage("添加成功")
            fetchData()
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            ElMessage("添加失败")

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
                ElMessage("上传出错，服务器开小差了呢");
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
    // ElMessage(JSON.stringify(form.value));
    axios.post('/api/mail/send_mail', form.value)
        .then(response => {
            // 后端处理成功后执行的代码
            dialogVisible.value = false;
            ElMessage("发送成功")
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            ElMessage("发送失败")
        })
    closeLoading()
}
//暂停发送邮件
const stop = (recipient) => {
    openLoading()
    axios.post('/api/mail/stop_mail', { "email": recipient })
        .then(response => {
            // 后端处理成功后执行的代码

            ElMessage("暂停成功")
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            ElMessage(error);
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
            ElMessage("恢复成功")
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            ElMessage("恢复失败")
        })
    closeLoading()
}
//取消发送邮件
const cancel = (recipient) => {
    axios.post('/api/mail/del_mail', { "email": recipient })
        .then(response => {
            // 后端处理成功后执行的代码
            // dialogVisible1.value = false;
            ElMessage("停止成功")
        })
        .catch(error => {
            // 后端处理失败后执行的代码
            ElMessage("停止失败")
        })
    // dialogVisible1.value = true;
}
</script>

<style scoped>
.demo-progress .el-progress--line {
    margin-bottom: 15px;
    width: 350px;
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