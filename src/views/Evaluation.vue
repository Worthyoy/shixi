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
        <el-table :data="tableData" class="table" width="100%">
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
                    <el-button type="text">暂停</el-button>
                    <el-button type="text">开始</el-button>
                    <el-button type="text">恢复</el-button>
                    <el-button type="text">修改</el-button>
                    <el-button type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination background layout="prev, pager, next" :total="100" class="pagination"></el-pagination>
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
    </div>
</template>
<script setup>
//引入reactive
import { reactive, ref } from 'vue';
//dialogVisible
const dialogVisible = ref(false);
//form  
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
});
//form2
const from2 = reactive({
    mubiao: '',
    emailTemplate: '',
    pinglv: '',
    shiduan: '',
    server: '',
    people: '',
    server2: '',
    beizhu: ''
})


//tableData数据
const tableData = reactive([
    {
        number: '1',
        type: '1',
        name: '测评1',
        status: '1',
        project: '项目1',
        num: '1',
        xianzhi: '1',
        templateNo: '1',
        emailNo: '1',
        serverNo: '1',
        date: '2021-07-01',
        is: '1',
        beizhu: '1'
    },
    {
        number: '2',
        type: '2',
        name: '测评2',
        status: '2',
        project: '项目2',
        num: '2',
        xianzhi: '2',
        templateNo: '2',
        emailNo: '2',
        serverNo: '2',
        date: '2021-07-02',
        is: '2',
        beizhu: '2'
    },
    {
        number: '3',
        type: '3',
        name: '测评3',
        status: '3',
        project: '项目3',
        num: '3',
        xianzhi: '3',
        templateNo: '3',
        emailNo: '3',
        serverNo: '3',
        date: '2021-07-03',
        is: '3',
        beizhu: '3'
    },
    {
        number: '4',
        type: '4',
        name: '测评4',
        status: '4',
        project: '项目4',
        num: '4',
        xianzhi: '4',
        templateNo: '4',
        emailNo: '4',
        serverNo: '4',
        date: '2021-07-04',
        is: '4',
        beizhu: '4'
    }]
);
//add
const add = () => {
    dialogVisible.value = true;
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