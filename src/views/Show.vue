<!-- 项目展示 -->
<script setup >
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
	let myChart1 = echarts.init(document.getElementById("echart-one"));
	let myChart2 = echarts.init(document.getElementById("echart-two"));
	let myChart3 = echarts.init(document.getElementById("echart-three"));
	let myChart4 = echarts.init(document.getElementById("send-deliver"));
	let options1 = {
		// title: {
		// 	text: 'ECharts 入门示例'
		// },
		legend: {},
		tooltip: {},
		dataset: {
			source: [
				["product", "打开邮件人数", "打开链接数"],
				["人事部", 43.3, 85.8],
				["财务部", 83.1, 73.4],
				["技术部", 86.4, 65.2],
				["商务部", 72.4, 53.9],
			],
		},
		xAxis: {
			type: "category",
			name: "部门",
		},
		yAxis: { name: "数量" },

		// Declare several bar series, each will be mapped
		// to a column of dataset.source by default.
		series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
	};
	let options2 = {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				// Use axis to trigger tooltip
				type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
			},
		},
		legend: {},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: {
			type: "value",
			name: "数量",
		},
		yAxis: {
			type: "category",
			data: ["人事部", "财务部", "技术部", "商务部"],
			name: "部门",
		},
		series: [
			{
				name: "内容1",
				type: "bar",
				stack: "total",
				label: {
					show: true,
				},
				emphasis: {
					focus: "series",
				},
				data: [210, 223, 110, 345],
			},
			{
				name: "内容2",
				type: "bar",
				stack: "total",
				label: {
					show: true,
				},
				emphasis: {
					focus: "series",
				},
				data: [120, 132, 101, 134],
			},
			{
				name: "内容3",
				type: "bar",
				stack: "total",
				label: {
					show: true,
				},
				emphasis: {
					focus: "series",
				},
				data: [220, 182, 191, 234],
			},
		],
	};
	let options3 = {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				// Use axis to trigger tooltip
				type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
			},
		},
		legend: {},
		grid: {
			left: "3%",
			right: "4%",
			bottom: "3%",
			containLabel: true,
		},
		xAxis: {
			type: "value",
			name: "数量",
		},
		yAxis: {
			type: "category",
			data: ["人事部", "财务部", "技术部", "商务部"],
			name: "部门",
		},
		series: [
			{
				name: "打开附件",
				type: "bar",
				stack: "total",
				label: {
					show: true,
				},
				emphasis: {
					focus: "series",
				},
				data: [320, 302, 301, 334],
			},
			{
				name: "运行代码人数",
				type: "bar",
				stack: "total",
				label: {
					show: true,
				},
				emphasis: {
					focus: "series",
				},
				data: [120, 132, 101, 134],
			},
		],
	};
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
			name: "日期",
		},
		yAxis: {
			name: "数量",
		},
		series: [{ type: "bar" }, { type: "bar" }],
	};
	// 绘制图表
	myChart1.setOption(options1);
	myChart2.setOption(options2);
	myChart3.setOption(options3);
	myChart4.setOption(options4);
});
</script>

<template>
	<header>
		<div class="header-logo">
			<img src="" alt="" />
		</div>
		<p>某某钓鱼测评项目</p>
	</header>
	<div class="content">
		<!-- 测评概况 -->
		<div class="con-appraisal frame-border">
			<p class="app-title">测评概况</p>
			<ul>
				<li>
					<p>已完成</p>
					<p>3/5</p>
				</li>
				<li>
					<p>待测评</p>
					<p>2</p>
				</li>
				<li>
					<p>邮件发送总数</p>
					<p>2345</p>
				</li>
				<li>
					<p>部门数量</p>
					<p>2345</p>
				</li>
				<li>
					<p>部门种类数</p>
					<p>2345</p>
				</li>
				<li>
					<p>发送完成度</p>
					<p>2345</p>
				</li>
			</ul>
		</div>
		<!-- 中招统计 -->
		<div class="con-statistics frame-border">
			<p class="app-title">中招统计</p>
			<ul>
				<li id="echart-one"></li>
				<li id="echart-two"></li>
				<li id="echart-three"></li>
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
header {
	width: 100%;
	height: 100px;
	// background-color: pink;
	display: flex;
	justify-content: center;
	align-items: center;

	.header-logo {
		width: 60px;
		height: 60px;
		border: 1px solid rgb(190, 190, 190);
		border-radius: 50%;
		margin-right: 20px;
	}

	p {
		font-size: 40px;
		letter-spacing: 14px;
	}
}

.content {
	width: 100%;
	// height: 600px;
	// background-color: bisque;
	// border: 1px solid red;
	padding-bottom: 20px;

	.frame-border {
		width: 90%;
		border: 1px solid gainsboro;
		background-color: white;
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
