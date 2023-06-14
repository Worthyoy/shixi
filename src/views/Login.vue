<template>
    <el-form class="login" :model="form" label-width="120px">
        <h2>Please sign in</h2>
        <el-form-item label="账号">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.region" />
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item label="验证码" class="s">
            <el-input v-model="form.date1" style="width: 418px;" />
            <!-- 点击可变的验证码图片 -->
            <img width="60" height="30"
                src="https://img0.baidu.com/it/u=2673243120,3070690751&fm=253&fmt=auto&app=138&f=JPEG?w=417&h=211" alt="">
        </el-form-item>
        <el-form-item id="btn_box">
            <el-button style="width: 480px;" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        <el-form-item id="btn_box">
            <el-button style="width: 480px;" type="primary" @click="signup">注册</el-button>
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
    name: 'xxx@xxx',
    region: '123',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: ''
})
const onSubmit = () => {
    axios.post('/api/auth/login', {
        email: form.value.name,
        password: form.value.region,
    }).then((rsp) => {
        console.log(rsp.data);
        if (rsp.data.status == 'success') {
            sessionStorage.setItem('Authorization', rsp.data.Authorization); //存储Authorization到页面中
            console.log(sessionStorage.getItem('Authorization'))
            router.push('/home')
        } else {
            ElMessage('this is a message.');//提示消息框或按钮。将rsp.data传递给页面中的
        }
    }).catch((err) => {
        ElMessage('this is a err message.');
        console.log(err);
    })

}
function signup() {
    router.push('/signup')
}

</script>
<style scoped>
.el-form {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -300px;
    margin-top: -150px;
    width: 600px;
    height: 300px;
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

#btn_box .el-form-item__content {
    flex-wrap: nowrap !important;
}
</style>