<template>
    <div class="background">
        <el-form class="login" :model="form" label-width="70px">
            <h2 class="login_title">登录</h2>
            <el-form-item>
                <span slot="label" style="color: #111;position: absolute;left: -40px;">
                    <span>账号</span>
                </span>
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item>
                <span slot="label" style="color: #111;position: absolute;left: -40px;">
                    <span>密码</span>
                </span>
                <el-input v-model="form.region" />
            </el-form-item>
            <!-- 验证码 -->
            <!-- <el-form-item label="验证码" class="s">
            <el-input v-model="form.date1" style="width: 418px;" /> -->
            <!-- 点击可变的验证码图片 -->
            <!-- <img width="60" height="30"
                src="http://172.16.113.158:5000/auth/verify_code" alt="">
        </el-form-item> -->
            <el-form-item class="s">
                <span slot="label" style="color: #111;position: absolute;left: -50px;">
                    <span>验证码</span>
                </span>
                <el-input v-model="form.verify_code" style="width: 160px;" />
                <!-- 点击可变的验证码图片 -->
                <img :src="verifyCodeImgSrc" @click="refreshVerifyCode" style="margin-left: 20px;" />
            </el-form-item>
            <el-form-item id="btn_box">
                <el-button style="width: 100%;" type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>



        </el-form>
    </div>
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
const verifyCodeImgSrc = ref('')
const verifyCodeStr = ref('')
// const form = ref({
//     name: 'xxx@xxx',
//     region: '123',
//     date1: '',
//     date2: '',
//     delivery: false,
//     type: [],
//     resource: '',
//     desc: ''
// })
const form = ref({
    email: 'zhangsan@qq.com',
    password: 'caefefq34q3e',
    verify_code: ''
})
const refreshVerifyCode = () => {
    axios.get('/api/auth/verify_code', { responseType: 'arraybuffer' })
        .then(resp => {
            const base64Img = `data:image/jpeg;base64,${btoa(
                new Uint8Array(resp.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            )}`;
            verifyCodeImgSrc.value = URL.createObjectURL(new Blob([resp.data], { type: 'image/jpeg' }));
            verifyCodeStr.value = resp.headers['verify-code'];
        })
        .catch(error => {
            console.error(error);
        })
};
// 获取验证码图片和字符串
refreshVerifyCode();

const onSubmit = () => {
    // document.cookie="session=eyJTYW1lU2l0ZSI6dHJ1ZSwidmVyaWZ5X2NvZGUiOiI3T01oIn0.ZI60qg.PJ8uEB-VSzXbNUGhnQZA9DmhmoM";
    axios.post('/api/auth/login', form.value).then((rsp) => {
        console.log('jijijijijiji')
        console.log(rsp.data);
        if (rsp.data.status == 'success') {
            ElMessage(rsp.data.message)
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
    left: 15%;
    top: 50%;
    margin-left: -200px;
    margin-top: -150px;
    width: 400px;
    height: 300px;
    /* border: 1px solid #ccc; */
    padding: 10px 40px 0 0;
    font-family: fangsong;
    color: #282848;
}

.login .s {
    display: flex;
    justify-content: space-between;
}

.login .login_title {
    font-size: 2rem;
    margin-bottom: 10px;
}

.login h2 {
    font-size: 30px;
    text-align: center;
    font-weight: bolder;
}

#btn_box .el-form-item__content {
    flex-wrap: nowrap !important;
}

#btn_box {
    margin-left: 35px, !important;
}

.background {
    height: 100%;
    width: 100%;
    background-image: url('../img/Login2.jpg');
    background-repeat: no-repeat;
    background-size: cover;
}

.el-form-item__label {
    color: #282848 !important;
}
</style>