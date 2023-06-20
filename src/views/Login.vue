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
        <!-- <el-form-item label="验证码" class="s">
            <el-input v-model="form.date1" style="width: 418px;" /> -->
            <!-- 点击可变的验证码图片 -->
            <!-- <img width="60" height="30"
                src="http://172.16.113.158:5000/auth/verify_code" alt="">
        </el-form-item> -->
        <el-form-item label="验证码" class="s">
            <el-input v-model="form.verify_code" style="width: 200px;" />
            <!-- 点击可变的验证码图片 -->
            <img :src="verifyCodeImgSrc" @click="refreshVerifyCode" />
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
            alert(rsp.data.message)
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