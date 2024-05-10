<template>
	<view class="sup-problem">
		<!-- 所有问题筛选选项+ -->
		<view class="picers">
			<view class="single-picker" v-for="(picker,index) in columns" :key="index" @click="openPicker(index)">
				<view class="btn" >
					{{picker.title}}
				</view>
				<view class="icon">
					<u-icon name="arrow-down-fill" color="#000" size="12" class="icon-url"></u-icon>
				</view>
				 
				<u-picker :show="picker.show"  :columns="picker.column" @confirm="confirmPicker($event,index)" @cancel="cancelPicker(index)"></u-picker>
			</view>
		</view>
	    <!-- 搜索框 -->
		<view class="search-problem">
			<u-search placeholder="请输入搜索问题内容" v-model="keyword" :clearabled="true" :showAction="false" :height="40" :shape="square"></u-search>
		</view>
		<!-- 所有问题 -->
		<view class="all-problems">
			<view class="single-problem" v-for="(problem,index) in problems_obj" :key="index" @click="gotoDetail(problem)">
				<single-problem :problem_obj="problem"></single-problem>
			</view>
		</view>
		<my-tabbar :tabbarArr="getTabBar" :Value="2"></my-tabbar>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				columns:[
					{
						title:"所在地区",
						show:false,
						column:[
							["成都市","重庆市"]
						]
					},
					{
						title:"问题类型",
						show:false,
						column:[
							["违规经营","摊位脏乱","资质过期","资质不全","商品质量","区域超限"]
						]
					},
					{
						
						title:"问题状态",
						show:false,
						column:[
							["未开始","进行中","已完成"]
						]
					}
				],
				// 搜索框双向绑定
				keyword:"",
				// 传输单个问题的数据
				problems_obj:[
					{
						problem_submit:[
							"张三",
							"123456789"
						],
						problem_shop:"天天烤鸭",
						problem_status:"已完成",
						problem_image:"../../static/shopSample2.png",
						problem_title:"店内烤鸭食物变质问题",
						problem_proof:[
							"../static/foodSample.png",
							"../static/foodSample.png"
							
						],
						problem_time:"2024.1.5",
						// 问题编号
						problem_code:"NO001",
						// 地址
						problem_address:"成都市新都区正因街10号",
						// tags
						problem_tags:["食物变质","区域超限"]
					},
					{
						problem_submit:[
							"张三",
							"123456789"
						],
						problem_shop:"水果烧烤",
						problem_status:"未开始",
						problem_image:"../../static/shopSample2.png",
						problem_title:"商品价格有争议",
						problem_time:"2024.2.6",
						// 问题编号
						problem_code:"NO003",
						// 地址
						problem_address:"成都市新都区正因街12号",
						// tags
						problem_tags:["哄抬物价"]
					}
				]
				  };
		},
		computed:{
			...mapGetters('tabBar',['getTabBar'])
		},
		methods:{
			openPicker(index){
				this.columns[index].show = true
			},
			// 点击确定后
			confirmPicker(e,index){
				// 1.将picker的显示值修改为用户选择的 2. 关闭picker选项栏
				const {value} = e
				// 测试 
				// console.log(value)
				// console.log(index)
				this.columns[index].title = value[0]
				this.columns[index].show = false
				// 加载效果
				uni.showLoading({
					title:"加载中",
					mask:true,
				})
				setTimeout(function () {
					uni.hideLoading();
				}, 300);
			},
			// 点击取消后
			cancelPicker(index){
				this.columns[index].show = false
			},
			// 跳转到问题详情页面
			gotoDetail(problem){
				// 转换为字符串
				const problem_detail = JSON.stringify(problem)
				// 跳转
				uni.navigateTo({
					url:"/pages-detail/problem-detail/problem-detail?problem_detail="+problem_detail
				})
				
			}
		}
	}
</script>

<style lang="scss">
.sup-problem{
	// 下拉栏选择
	.picers{
		padding: 10rpx 0;
		display: flex;
		border-bottom: 1px solid #ccc;
	    .single-picker{
			height: 60rpx;
			// background-color: pink;
			flex: 1;
			display: flex;
			line-height: 60rpx;
			padding: 0 40rpx;
			text-align: right;
			.btn{
				flex: 9;
				font-size: 28rpx;
				margin-right: 16rpx;
			}
			.icon{
				flex: 1;
				display: flex;
				.icon-url{
					align-self: center;
					text-align: left;
				}
			}
		}
	}
	.search-problem{
		margin-top: 30rpx;
		padding: 0 20rpx;
		
	}
	.all-problems{
		margin-top: 40rpx;
		padding: 0 20rpx;
	}
}
</style>
