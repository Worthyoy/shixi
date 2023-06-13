<!-- 统计 -->
<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts/core";
import {
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
} from "echarts/components";
import { BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([
    DatasetComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    BarChart,
    CanvasRenderer,
]);

onMounted(() => {
    let myChart4 = echarts.init(document.getElementById("send-deliver"));
    let options4 = {
        // title: {
        // 	text: 'ECharts 入门示例'
        // },
        legend: {},
        tooltip: {},
        dataset: {
            source: [
                ["product", "发送总数", "发送成功数"],
                ["3/1", 100, 85.8],
                ["3/2", 100, 73.4],
                ["3/3", 100, 65.2],
                ["3/4", 100, 53.9],
                ["3/5", 100, 53.9],
                ["3/6", 100, 53.9],
                ["3/7", 100, 53.9],
                ["3/8", 100, 53.9],
                ["3/9", 100, 53.9],
                ["3/10", 100, 53.9],
                ["3/11", 100, 53.9],
                ["3/12", 100, 53.9],
                ["3/13", 100, 53.9],
                ["3/14", 100, 53.9],
                ["3/15", 100, 53.9],
                ["3/16", 100, 53.9],
                ["3/17", 100, 53.9],
            ],
        },
        xAxis: {
            type: "category",
            name: '日期',
        },
        yAxis: {
            name: '数量'
        },
        series: [{ type: "bar" }, { type: "bar" }],
    };
    // 绘制图表
    myChart4.setOption(options4);
});
</script>

<template>
    <div class="content">
        <!-- 测评概况 -->
        <div class="con-appraisal frame-border">
            <p class="app-title">项目及测评</p>
            <ul>
                <li>
                    <p>项目总数</p>
                    <p>3568</p>
                </li>
                <li>
                    <p>测评单位数</p>
                    <p>256</p>
                </li>
                <li>
                    <p>测评总人数</p>
                    <p>2345</p>
                </li>
                <li>
                    <p>完成的项目</p>
                    <p>2345</p>
                </li>
                <li>
                    <p>计划的测评</p>
                    <p>2345</p>
                </li>
            </ul>
        </div>
        <!-- 资源 -->
        <div class="con-appraisal frame-border">
            <p class="app-title">资源</p>
            <ul>
                <li>
                    <p>邮件服务器口</p>
                    <p>3/5</p>
                </li>
                <li>
                    <p>捕获服务口</p>
                    <p>1/2</p>
                </li>
                <li>
                    <p>模板</p>
                    <p>21</p>
                </li>
                <li>
                    <p>附件</p>
                    <p>7</p>
                </li>
            </ul>
        </div>
        <!-- 投递情况 -->
        <div class="con-send frame-border">
            <p class="app-title">投递情况</p>
            <div id="send-deliver"></div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    width: 100%;
    // height: 600px;
    // background-color: bisque;
    // border: 1px solid red;
    padding-bottom: 20px;

    .frame-border {
        width: 90%;
        border: 1px solid gainsboro;
        // background-color: white;
        border-radius: 20px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 25px;
        box-sizing: border-box;
        margin-bottom: 20px;
    }

    .app-title {
        // background-color: aqua;
        font-size: 22px;
    }

    .con-appraisal {
        height: 200px;

        ul {
            // background-color: skyblue;
            display: flex;
            padding-left: 20px;

            li {
                width: 200px;
                height: 100px;
                // border: 1px solid red;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                // align-items: center;

                p:nth-child(1) {
                    color: #9a9a9a;
                    font-size: 18px;
                }

                p:nth-child(2) {
                    color: #ff9138;
                    font-size: 24px;
                    font-weight: 700;
                }
            }
        }
    }

    .con-statistics {
        height: 400px;

        ul {
            height: 300px;
            // border: 1px solid red;
            display: flex;

            li {
                width: 400px;
                height: 300px;
                // border: 1px solid red;
            }
        }
    }

    #send-deliver {
        width: 100%;
        height: 400px;
    }
}</style>
