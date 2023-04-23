<!-- 客户 -->
<script setup>
import { ref } from 'vue'

const parentBorder = ref(false)
const childBorder = ref(false)
const tableData = [
    {
        c_id: '1',
        c_name: '2023年度测评',
        t_number: '10',
        t_id: '1012',
        t_name: '2023年度测评',
        t_type: '重度测评',
        t_status:"进行中",
        family: [
            {
                t_id: '1',
                t_type: '邮件',
                t_name: '3月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '2',
                t_type: 'wifi',
                t_name: '4月测评',
                t_status: '未开始',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '3',
                t_type: 'u盘',
                t_name: '5月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
        ],
    },
    {
        c_id: '2',
        c_name: '2023年度测评',
        t_number: '10',
        t_id: '1012',
        t_name: '2023年度测评',
        t_type: '重度测评',
        t_status:"进行中",
        family: [
            {
                t_id: '1',
                t_type: '邮件',
                t_name: '3月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '2',
                t_type: 'wifi',
                t_name: '4月测评',
                t_status: '未开始',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '3',
                t_type: 'u盘',
                t_name: '5月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
        ],
    },
    {
        c_id: '3',
        c_name: '2023年度测评',
        t_number: '10',
        t_id: '1012',
        t_name: '2023年度测评',
        t_type: '重度测评',
        t_status:"进行中",
        family: [
            {
                t_id: '1',
                t_type: '邮件',
                t_name: '3月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '2',
                t_type: 'wifi',
                t_name: '4月测评',
                t_status: '未开始',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '3',
                t_type: 'u盘',
                t_name: '5月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
        ],
    },
    {
        c_id: '4',
        c_name: '2023年度测评',
        t_number: '10',
        t_id: '1012',
        t_name: '2023年度测评',
        t_type: '重度测评',
        t_status:"进行中",
        family: [
            {
                t_id: '1',
                t_type: '邮件',
                t_name: '3月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '2',
                t_type: 'wifi',
                t_name: '4月测评',
                t_status: '未开始',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '3',
                t_type: 'u盘',
                t_name: '5月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
        ],
    },
    {
        c_id: '5',
        c_name: '2023年度测评',
        t_number: '10',
        t_id: '1012',
        t_name: '2023年度测评',
        t_type: '重度测评',
        t_status:"进行中",
        family: [
            {
                t_id: '1',
                t_type: '邮件',
                t_name: '3月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '2',
                t_type: 'wifi',
                t_name: '4月测评',
                t_status: '未开始',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '3',
                t_type: 'u盘',
                t_name: '5月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
        ],
    },
    {
        c_id: '6',
        c_name: '2023年度测评',
        t_number: '10',
        t_id: '1012',
        t_name: '2023年度测评',
        t_type: '重度测评',
        t_status:"进行中",
        family: [
            {
                t_id: '1',
                t_type: '邮件',
                t_name: '3月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '2',
                t_type: 'wifi',
                t_name: '4月测评',
                t_status: '未开始',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
            {
                t_id: '3',
                t_type: 'u盘',
                t_name: '5月测评',
                t_status: '已完成',
                t_project: 'c1',
                t_number: '20',
                t_astrict: '30',
                t_template: 't456',
                t_mail: 'c123',
                t_response: 'r458',
                t_date: '2021-03-01',
                t_remark: '无',
            },
        ],
    },
]
</script>

<template>
    <div class="header">
        <div class="title">客户面板</div>
    </div>
    <el-table :data="tableData" :border="parentBorder" style="width: 100%">
        <el-table-column type="expand">
            <template #default="props">
                <div m="4">
                    <el-table :data="props.row.family" :border="childBorder">
                        <el-table-column type="selection" width="100" />
                        <el-table-column label="编号" prop="t_id" />
                        <el-table-column label="测评类型" prop="t_type" />
                        <el-table-column label="名称" prop="t_name" />
                        <el-table-column label="状态" prop="t_status" />
                        <el-table-column label="所属项目" prop="t_project" />
                        <el-table-column label="受测用户数" prop="t_number" />
                        <el-table-column label="频率限制" prop="t_astrict" />
                        <el-table-column label="模板编号和名称" prop="t_template" />
                        <el-table-column label="邮件服务器编号和名称" prop="t_mail" />
                        <el-table-column label="响应服务器编号和名称" prop="t_response" />
                        <el-table-column label="创建日期" prop="t_date" />
                        <el-table-column label="备注" prop="t_remark" />
                        <el-table-column label="操作" width="200px">
                            <template #default="props">
                                <el-button type="warning" link>开始</el-button>
                                <el-button type="warning" link>暂停</el-button>
                                <el-button type="warning" link>恢复</el-button>
                                <el-button type="warning" link>修改</el-button>
                                <el-button type="warning" link>删除</el-button>
                                <el-button type="warning" link>公钥上传</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="项目编号" prop="c_id" />
        <el-table-column label="项目名称" prop="c_name" />
        <el-table-column label="测评次数" prop="t_number" />
        <el-table-column label="测评序号" prop="t_id" />
        <el-table-column label="测评名称" prop="t_name" />
        <el-table-column label="测评类别" prop="t_type" />
        <el-table-column label="报告状态" prop="t_status" />
        <el-table-column label="操作" width="300px">
            <template #default="props">
                <el-button type="primary" link>暂停</el-button>
                <el-button type="primary" link>恢复</el-button>
                <el-button type="primary" link>生成报告</el-button>
                <el-button type="primary" link>报告下载</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<style lang="less" scoped>
    .title {
        height: 50px;
        line-height: 50px;
        font-weight: bold;
        font-size: 20px;
    }
    .el-table {
        margin-top: 20px;
    }
</style>
