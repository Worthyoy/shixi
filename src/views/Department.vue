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
                    <el-input placeholder=""></el-input>
                </el-form-item>
                <el-form-item>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="button">查询</el-button>
                </el-form-item>
            </el-form>
            <!-- 基于elementplus，table表格，表格内容为项目编号、项目名称、测评次数、测评序号、测评名称、测评类别、操作（暂停、恢复、删除、锁定、解锁、报告生成、报告更新、下载） -->
            <el-table :data="tableData" class="table" width="100%">
                <el-table-column type="selection" />
                <el-table-column prop="bianhao" label="编号" width="100"></el-table-column>
                <el-table-column prop="mingcheng" label="名称" width="100"></el-table-column>
                <el-table-column prop="fujibianhao" label="父级编号" width="100"></el-table-column>
                <el-table-column prop="beizhu" label="备注" width="100"></el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template #default>
                        <el-button type="text">删除</el-button>
                        <el-button type="text">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :total="100" class="pagination"></el-pagination>

            <!-- 基于elementplus弹框，内容为form表单，内容包含：客户名称的input、客户logo的图片上传、客户联系人的input、联系人职位的input、练习方式的input、项目说明的textare -->
            <el-dialog v-model="dialogVisible" title="新增项目">
                <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                    <el-form-item label="客户名称" prop="customerName">
                        <el-input v-model="form.customerName"></el-input>
                    </el-form-item>
                    <el-form-item label="客户logo" prop="customerLogo">
                        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
                            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :auto-upload="false"
                            :file-list="[]">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <el-button style="margin-left: 10px;" size="small" type="success"
                                @click="submitForm('form')">上传到服务器</el-button>
                            <div slot="tip" class="el-upload__tip"></div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="客户联系人" prop="customerContact">
                        <el-input v-model="form.customerContact"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人职位" prop="contactPosition">
                        <el-input v-model="form.contactPosition"></el-input>
                    </el-form-item>
                    <el-form-item label="练习方式" prop="practiceMode">
                        <el-input v-model="form.practiceMode"></el-input>
                    </el-form-item>
                    <el-form-item label="项目说明" prop="projectDescription">
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

const tableData=[{
    bianhao: '1',
    mingcheng: '项目1',
    fujibianhao: '1',
    beizhu: '备注1'
}, {
    bianhao: '1',
    mingcheng: '项目1',
    fujibianhao: '1',
    beizhu: '备注1'
},{
    bianhao: '1',
    mingcheng: '项目1',
    fujibianhao: '1',
    beizhu: '备注1'
},{
    bianhao: '1',
    mingcheng: '项目1',
    fujibianhao: '1',
    beizhu: '备注1'
}]
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
</style>