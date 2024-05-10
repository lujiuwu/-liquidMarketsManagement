<template>
<view>
		<view class="page-body">
			<!-- 地图 - 应该设置一个吸顶  -->
			<view class="page-section-gap">
			 <map class="page-section"  :layer-style='5' :style="{'height': mapHeight+'rpx'}"  :show-location='true'  :latitude="latitude" :longitude="longitude" :markers="marker" :scale="scale"  @markertap="markertap"   @callouttap='callouttap'>
			    
			 </map>
			</view>
			<!-- 其余部分 -->
			<view class="otherArea" :style="{'margin-top':mapHeight+'rpx'}" >
				
				<!-- 需要固定位置的部分 -->
				<view class="fixedArea" :style="{'position':'fixed','top':mapHeight+'rpx'}">
					<!-- 第一部分 -- 搜索栏 -->
					<view class="search">
						<u-search :clearabled="true" :showAction="false"></u-search>
					</view>
					<!-- 第二部分 -- 应该也设置一个tab 切换显示选择 -- 距我的位置 距上次检查 -->
					<view class="show-tabs">
						<!-- tab切换 -- 购买 评论 商家 -->
						<u-back-top :scrollTop="scrollTop" :mode="mode" :iconStyle="iconStyle" top="20"></u-back-top>
						<view class="tabs-area">
							<view class="tabs">
								<u-tabs :list="list" overlay="false" :is-scroll="false" :current="current" @click="change"
										itemStyle="width:50%;padding:12rpx 0;color:#fff;" :activeStyle="{
									color: '#000', 
									fontSize:'30rpx'
								}" lineWidth="70" :inactiveStyle="{
									color:'#242424',
									fontSize:'30rpx'
								}" lineColor="#00aaff">
								</u-tabs>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 第三部分 -- 显示店铺 -->
					<view class="shops">
						
						<!-- 店铺详情 -- 分两种情况-->
						<view class="shops-detail">
							<view class="single-sup-detail" v-for="(datas,index) in datas_arr" :key="index" @click="changToRoutes()">
								<shop-sup-detail :datas="datas" :show_type="!current?'distance':'time'"></shop-sup-detail>
							</view>
						</view>
					</view>
				
				
			</view>
			<!-- 页面内跳转 -- 阿西不知道怎么办了 -->
			<view class="routes" :style="{'position':'fixed','top':mapHeight+'rpx',	'transform':'translateX'+transitionDistance}">
				<!-- 第一部分 -- 首部 -->
				<view class="routes-head">
					<!-- 左侧 -- 返回箭头 -->
					<view class="back-arrow" @click="changeToShops()">
						<view class="arrow-icon">
							<u-icon name="arrow-left-double" color="#000" size="28"></u-icon>
						</view>
					</view>
					<!-- 右侧 -- 路线选择tab栏 -->
					<view class="route-tab">
						<view class="tabs-area">
							<view class="tabs">
								<u-tabs :list="route_list" overlay="false" :is-scroll="false" :current="route_current" @click="route_change"
										itemStyle="width:50%;padding:20rpx 0;color:#fff;" :activeStyle="{
									color: '#000', 
									fontSize:'30rpx',
									fontWeight:'bold'
								}" lineWidth="0" :inactiveStyle="{
									color:'#242424',
									fontSize:'30rpx'
								}" :scrollable="false">
								</u-tabs>
							</view>
						</view>
					</view>
				</view>
				<!-- 第二部分 -- 主体部分 -->
				<view class="routes-body">
					<!-- 路线组件 -->
					<my-route :route_datas_obj="route_datas" :current="route_current"></my-route>
				</view>
			</view>
		</view>
		<my-tabbar :tabbarArr="getTabBar" :Value="1"></my-tabbar>
</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
		  return {
		    latitude:30.826461, //纬度
		    longitude:104.184441,//经度s
		    scale:13,//缩放级别
		    bottomData:false,
			// 标记点
		    marker: [
		        {
		            id:0,
		            latitude: 30.826461,//纬度
		            longitude: 104.184441,//经度
		            iconPath: '',    //显示的图标        
		            rotate:0,   // 旋转度数
		            width:20,   //宽
		            height:30,   //高
		            //   title:'我在这里',//标注点名
		            alpha:0.5,   //透明度
		            callout:{//自定义标记点上方的气泡窗口 点击有效
		                content:'西南石油大学',//文本
		                color:'#ffffff',//文字颜色
		                fontSize:13,//文本大小
		                // borderRadius:15,//边框圆角
		                borderWidth:'10',
		                bgColor:'#e51860',//背景颜色
		                display:'ALWAYS',//常显
		                    },
		        }
		                       
		            ],
					
			// 图标
			icon:"arrow-up",
			// tab栏数据
			list:[
				{name:"距当前位置"},
				{name:"距上次监察"}
			],
			current:0,
			// 传输给详情的数据
			datas_arr:[
				{
					image:'../../static/shopSample2.png',
					name:"薄巧蛋糕",
					// 时间这里应该是时间戳 -- 根据具体规则显示单位 s min h days..
					// 测试阶段只使用天数为时间单位
					time:"10",
					// 位置 m / km
					distance:100
				},
				{
					image:'../../static/shopSample2.png',
					name:"薄巧蛋糕",
					// 时间这里应该是时间戳 -- 根据具体规则显示单位 s min h days..
					// 测试阶段只使用天数为时间单位
					time:"10",
					// 位置 m / km
					distance:100
				},
				{
					image:'../../static/shopSample2.png',
					name:"薄巧蛋糕",
					// 时间这里应该是时间戳 -- 根据具体规则显示单位 s min h days..
					// 测试阶段只使用天数为时间单位
					time:"10",
					// 位置 m / km
					distance:100
				},
				
			],
			// 地图高度
			mapHeight:0,
			// 搜素框fixed数据
			searchFixed:0,
			// tab栏fixed数据
			tabFixed:0,
			// 置顶按钮样式
			scrollTop: 0,
		    mode: 'square',
			iconStyle: {
				fontSize: '32rpx',
				color: '#2979ff'
			},
			// tab栏数据
			route_list:[
				{name:"路线一"},
				{name:"路线二"},
				{name:"路线三"}
			],
			route_current:0,
			// 传输给组件的数据
			route_datas:{
				// 交通工具数据数组
				transportations:[
					{
						icon:'../../static/distance.png',
						text:'直线距离',
						distance:11.1
					},
					{
						icon:'../../static/bike.png',
						text:'直线距离',
						distance:11.1
					},
					{
						icon:'../../static/car.png',
						text:'直线距离',
						price:49
					}
				],
				// 路线数据
				// 先不写了吧 不然还想运行个屁

			},
			transitionDistance:'(500px)'
			
		}
		},
		computed:{
			...mapGetters('tabBar',['getTabBar'])
			
			
		},
		 methods:{
		    //地图点击事件
		    markertap(e)
			{
		        console.log("===你点击了标记点===",e)
		    },
		    //地图点击事件
		    callouttap(e)
			{
		        console.log('地图点击事件',e)
		    },
			// 点击箭头 -- 分区上移/下移
			arrowChange(){
				// 点击切换箭头图标 三元更方便
				this.icon = this.icon=="arrow-up"?"arrow-down":"arrow-up"
			},
			// 切换tab栏
			change(index) {
				// 根据tabs的切换改变下方渲染的内容
				this.current = index.index;
			},
			route_change(index){
				this.route_current = index.index
			},
			// 切换下方组件
			changeToShops(){
				this.transitionDistance='(500px)'
			},
			changToRoutes(){
				this.transitionDistance = '(0)'
			}
				
		},
		onLoad() {
			// 赋值
			this.mapHeight = uni.getWindowInfo().windowHeight-140
			// 搜索框
			this.searchFixed = 34
		},
		// 置顶相关事件
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
				
				 

	}
</script>

<style lang="scss">
.page-body{
	display: flex;
	// 地图组件
	.page-section{
		position: fixed;
		top: 0;
		width: 100%;
	}
		
	.otherArea{
		width: 100%;
		// background-color: pink;
		display: flex;
		flex-direction: column;
		height: 1000rpx;
		overflow-y: hidden;
		.fixedArea{
			flex: 2;
			display: flex;
			flex-direction: column;
			width: 100%;
			background-color: #fff;
			.search{
				flex: 1;
				// background-color: #ccc;
				padding: 20rpx;
			}
			.show-tabs{
				width: 100%;
				flex: 1;
				// 为了好看一点 -- 设置一个外阴影
				box-shadow:0 5px 5px -5px #d8d8d8;
				.tabs-area{
					width: 60%;
				}
			}
		}
		
		.shops{
		   margin-top: 180rpx;
		   // background-color: #666;

		}
	}
	.routes{
		transition-duration: .5s;
		position: fixed;
		width: 100%;
		height: 500px;
		background-color: #fff;
		// z-index: 100;
		display: flex;
		flex-direction: column;
		.routes-head{
			height: 80rpx;
			display: flex;
			border-bottom: 5px solid #ccc;
			.back-arrow{
				flex: 1;
				// background-color: #666;
				display: flex;
				
				.arrow-icon{
					box-sizing: border-box;
					padding-left: 40rpx;
					align-self: center;
				}
			}
			.route-tab{
				flex: 4;
			}
			
		}
		.routes-body{
			height: 200rpx;
			// background-color: #eee;
		}
	}
}

</style>
