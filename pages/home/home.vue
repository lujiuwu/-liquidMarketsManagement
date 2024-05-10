<template>
	<view>
		<!-- 搜索组件 -->
		<view class="search">
			<u-search placeholder="一杯茶一根烟一句报错改一天" v-model="keyword" :show-action="false" bg-color="#fff"
				height="28"></u-search>
		</view>
		<!-- 顶部tab栏 -->
		<view class="top-tabs">
			<u-tabs :list="list" overlay="false" :is-scroll="false" :current="current" @click="change"
				itemStyle="width:33%;padding:12rpx 0;color:#fff;" :activeStyle="{
			color: '#eee',
			fontWeight: 'bold',
			transform: 'scale(1.05)'
    	}" lineWidth="45" :inactiveStyle="{
			color:'#fff'
		}" lineColor="#ffffff">
			</u-tabs>
		</view>
		<!-- 筛选栏 -->
		<!-- 分为 ：信誉度 - 总销量 - 筛选 -->
		<!-- 只有“推荐”显示筛选栏 -->
		<view class="filter" v-show="!current">
			<view class="button choice">
				<text class="text">{{choice_form}}</text>
			</view>
			<view class="button float" @click="this.show2 = true">
				<text class="text">筛选</text>
			</view>
		</view>
		<u-popup :show="show2" @open="open2()" @close="this.show2 = false" :closeable="true" close-icon-pos="top-right"
			round="14">
			<view class="popup">
				<!-- 筛选内部 -->
				<view class="stand">
					<view class="title">筛选标准</view>
					<u-subsection :list="choice_list" :current="choice_number" @change="choiceChange"
						class="choice"></u-subsection>
				</view>
				<!-- 2.流动情况 -->
				<view class="stand">
					<view class="title">摊位流动情况</view>
					<u-subsection :list="float_list" :current="float_number" @change="floatChange"
						class="choice"></u-subsection>
				</view>
				<view class="btns">
					<!-- 点击确定 -- 调用函数 -->
					<button @click="close2()" class="yes">确 定</button>
					<!-- 点击取消 -- 只关闭弹窗不做其他处理 -->
					<button @click="this.show2 = false" class="no">取 消</button>
				</view>

			</view>
		</u-popup>
		<!-- 店铺信息具体 -->
		<!-- 实际 -- 根据后端传入的数据渲染 -->
		<view v-for="(item,index) in show_list" :key="index" v-show="current!=2" @click="gotoDetail(item)">
			<single-shop :name="item.name" :sales="item.sales" :rate="item.rate" :comments="item.comments"
				:distance="item.distance" :img_url="item.img_url" ></single-shop>
		</view>

		<view v-for="(item,index) in recent_shops" :key="index" v-show="current===2">
			<single-shop-delete :name="item.name" :sales="item.sales" :rate="item.rate" :comments="item.comments"
				:distance="item.distance" :img_url="item.img_url" ></single-shop-delete>
		</view>
		<my-tabbar :tabbarArr="getTabBar" :Value="0"></my-tabbar>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	// 引入整个lodash对象
	import _ from "lodash";
	export default {
		data() {
			return {
				// 模拟后端传入的单个店铺数组
				shop_list: [{
						img_url: "../../static/shopSample2.png",
						name: "花雕醉鸡",
						sales: 145,
						rate: 4.8,
						group:'123456789',
						comments: [
							"真的很好吃，强烈推荐",
							"花雕醉鸡YYDS"
						],
						distance: 456,
						// 热度
						hot: 10
					},
					{
						img_url: "../../static/shopSample2.png",
						name: "卤肉卷",
						sales: 200,
						rate: 4.5,
						group:'123456789',
						comments: [
							"一个字。绝"

						],
						distance: 560,
						hot: 8
					},
					{
						img_url: "../../static/shopSample2.png",
						name: "土豆饼",
						sales: 90,
						rate: 4.3,
						group:'123456789',
						comments: [
							"还挺好吃的"

						],
						distance: 500,
						hot: 7
					},
					{
						img_url: "../../static/shopSample2.png",
						name: "正宗淄博烧烤",
						sales: 130,
						rate: 4.6,
						group:'123456789',
						comments: [
							"深夜杀手"

						],
						distance: 399,
						hot: 9
					}
				],
				show2: false,
				// 搜索框内容
				keyword: '',
				// 头部tab栏内容
				list: [{
						name: '推荐'
					},
					{
						name: '附近'
					},
					{
						name: '足迹'
					}
				],
				// 当前选中
				current: 0,

				// 筛选标准相关数据
				// 1.选项数组
				choice_list: [{
						name: '按信誉度'
					},
					{
						name: '按热度'
					},
					{
						name: '按销量'
					}

				],
				// 2.数字标志
				choice_number: 0,
				// 摊位流动情况相关数组
				// 1.选项数组 
				float_list: [{
						name: '较小'
					},
					{
						name: '一般'
					},
					{
						name: '较大'
					}
				],
				// 2.数字标志
				float_number: 0,
				// 排序模式数据
				choice_form: "默认排序",
				// 最近浏览的店铺数组
				recent_shops: [
					{
						img_url: "../../static/shopSample2.png",
						name: "土豆饼",
						sales: 90,
						rate: 4.3,
						group:'123456789',
						comments: [
							"还挺好吃的"
					
						],
						distance: 500,
						hot: 7
					}

				],
				// 渲染数据
				show_list: []

			};
		},
		computed: {
			...mapGetters('tabBar', ['getTabBar'])

		},
		methods: {
			// 切换顶部tab栏
			change(index) {
				// 根据tabs的切换改变下方渲染的内容
				this.current = index.index;
				
				// console.log(this.current)
				if (this.current == 0) {
					this.show_list = this.shop_list
				}
				if (this.current == 1) {
					// 选择附近 -- 按照距离排序
					this.show_list = _.sortBy(this.shop_list, function(o) {
						return o.distance
					})
				} 
			},
			// 弹窗的打开和关闭
			// 点击确定
			close2() {
				// 测试选择结果
				// console.log(this.float_number)
				// console.log(this.choice_number)
				// 保留选择结果 -- 传给后端 -- 重新渲染数据 -- 修改排序模式数据
				const user_float = this.float_number
				const user_choice = this.choice_number
				this.choice_form = this.choice_list[user_choice].name + ",流动" + this.float_list[user_float].name
				// 如果是按信誉度且流动较小 -- 则是默认排序
				if (user_choice == 0 && user_float == 0) this.choice_form = "默认排序"
				console.log(this.choice_form)
				// 修改渲染的数组
				if (user_choice == 0) {
					// 信誉度
					this.show_list = _.sortBy(this.shop_list, function(o) {
						return -o.rate
					})
				} else if (user_choice == 1) {
					// 热度
					this.show_list = _.sortBy(this.shop_list, function(o) {
						return -o.hot
					})
				} else {
					// 销量
					this.show_list = _.sortBy(this.shop_list, function(o) {
						return -o.sales
					})
				}
				this.show2 = false
			},
			open2() {
				this.show2 = true
			},
			// 筛选标准切换方法
			choiceChange(index) {
				this.choice_number = index;
			},
			// 摊位流动情况
			floatChange(index) {
				this.float_number = index;
			},
			// 点击跳转到店铺详情页
			gotoDetail(item){
				// 先将对象转换为字符串
				const infoStr = JSON.stringify(item)
				uni.navigateTo({
					url:'/pages-detail/shop_detail/shop_detail?info='+infoStr
				})
			}



		},
		onLoad() {
			// 页面初始化完成后
			// 默认按信誉度排序
			// 信誉度
			this.shop_list = _.sortBy(this.shop_list, function(o) {
				return -o.rate
			})
			// 渲染数组 
			this.show_list = this.shop_list
		}
	}
</script>

<style lang="scss">
	.show {
		height: 100px;
	}

	.top-tabs {
		background-color: #00aaff;
		color: #fff;
	}

	// 搜索框样式
	.search {
		background-color: #00aaff;
		padding: 5px 20rpx 12rpx;

	}

	.filter {
		height: 70rpx;
		border-bottom: 1px solid #ccc;

		display: flex;
        .choice{
			padding: 0 20rpx 0 90rpx;
		}
		.float{
			padding: 0 90rpx 0 20rpx;
		}
		.button {
            flex: 1;
			background-color: #fff;
			border-color: #fff;
			font-size: 28rpx;
			text-align: left;
			// padding: 0 45px;
			line-height: 60rpx;
			display: flex;

			.icon {
				flex: 1;
				margin-right: 8rpx;
				background-color: pink;
			}

			.text {
				flex: 9;
				// background-color: yellow;
				text-align: left;
			}

		}
		.float{
			.text{
				text-align: right;
				padding-right: 20px;
			}
			
			
		}
		

	}

	.popup {
		height: 660rpx;
		padding: 40rpx 30rpx;

		.stand {
			padding: 20px 0;

			.title {
				margin-bottom: 26rpx;
			}
		}

		.btns {
			float: right;
			margin-top: 80px;
			display: flex;
			width: 200px;

			button {
				flex: 1;
				height: 30px;
				font-size: 14px;
				margin-right: 5px;
				color: #fff;
				line-height: 30px;

			}

			.yes {
				background-color: #ffaa00;
			}

			.no {
				background-color: #55aaff;
			}
		}
	}
</style>