<script setup>
import {ElContainer,ElHeader,ElAside,ElMenu,ElIcon,ElMenuItem,ElMain, vLoading,ElFooter} from 'element-plus'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const admin = ref('admin')
</script>
<template>
    <el-container class="home container">
        <el-header>
            <div>国信安钓鱼工具</div>
            <!-- 姓名以及退出按钮 -->
            <div style="float: right;">
                <span style="padding-right: 40px;color: #399;">{{admin}}</span>
                <el-button type="text">退出</el-button>
            </div>
        </el-header>
        <el-container class="container2">
            <el-aside width="200px" class="aside">
                <el-menu :router="true" default-active="/home/index" class="el-menu-vertical-demo">
                    <el-menu-item index="/home/projectmanagement">
                        <span>项目管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/evaluation">
                        <span>测评管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/statistics">
                        <span>后台统计</span>
                    </el-menu-item>
                    <el-menu-item index="/home/connection">
                        <span>客户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/department">
                        <span>部门管理</span>
                    </el-menu-item>    
                
                    <el-menu-item index="/home/manage">
                        <span>管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/personnel">
                        <span>人员管理</span>
                    </el-menu-item>
                    <el-menu-item index="/home/record">
                        <span>记录</span>
                    </el-menu-item>
                    <el-menu-item index="/home/resources">
                        <span>资源</span>
                    </el-menu-item>
                    
                    <el-menu-item index="/home/system">
                        <span>系统管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main><RouterView/></el-main>
        </el-container>
    </el-container>
</template>
<style>
*{
    margin: 0;
    padding: 0;
}

.home .el-header{
    display: flex;
    height: 50px;
    background: #283f50;
    color: #fff;
    justify-content: space-between;
    align-items: center;
}
</style>