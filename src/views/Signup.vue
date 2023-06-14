<template>
    <el-form class="login" :model="form" label-width="120px">
        <h2>Please sign up</h2>
        <el-form-item label="email">
            <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="mobile">
            <el-input v-model="form.mobile" />
        </el-form-item>
        <el-form-item label="telephone">
            <el-input v-model="form.telephone" />
        </el-form-item>
        <el-form-item label="wechat_num">
            <el-input v-model="form.wechat_num" />
        </el-form-item>
        <el-form-item label="telecom_num">
            <el-input v-model="form.telecom_num" />
        </el-form-item>
        <el-form-item label="username">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="password">
            <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="sysrole">
            <el-input v-model="form.sysrole" />
        </el-form-item>
        <el-form-item>
            <el-button style="width: 480px;" type="primary" @click="onSubmit">注册</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
//引入el-form、el-form-item、el-input、el-button等组件
import { ElForm, ElFormItem, ElInput, ElButton, ElMessageBox } from 'element-plus'
//引入路由
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import axios from "axios";
import { ElMessage } from 'element-plus'
//使用路由
const router = useRouter()
const form = ref({
    email: "3",
    mobile: "3",
    telephone: "3",
    wechat_num: "3",
    telecom_num: "3",
    username: "3334",
    password: "3",
    sysrole: "3",
    orgid: 0
})
const onSubmit = () => {
    axios.post('/api/user/', form.value).then((rsp) => {
        console.log(rsp.data);
        if (rsp.data.status == 'success') {
            router.push('/')
            ElMessage('Signup success.');
        } else {
            ElMessage('this is a message.');//提示消息框或按钮。将rsp.data传递给页面中的
        }
    }).catch((err) => {
        ElMessage('this is a err message.');
        console.log(err);
    })

}

</script>
<style scoped>
.el-form {
    position: absolute;
    left: 50%;
    top: 37%;
    margin-left: -300px;
    margin-top: -150px;
    width: 600px;
    height: 500px;
    border: 1px solid #ccc;
    padding: 10px 40px 0 0;
}

.login .s {
    display: flex;
    justify-content: space-between;
}

.login h2 {
    font-size: 30px;
    text-align: center;
    font-weight: bolder;
}
</style>