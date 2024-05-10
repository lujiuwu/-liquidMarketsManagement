<template>
	<view  class="shop-detail">
		<!-- 仿照一下美团 -->
		<!-- 第一部分 -- 背景 -- 传递数据的图片 -->
		<view class="background">
			<image :src="info.img_url" class="bg-image"></image>
		</view>
		<!-- 第二部分 -- 主体区域 -->
		<view class="main">
			<!-- 简介 -->
			<view class="info">
				<!-- 第一行 -- 名称 -->
				<view class="name">
					<text class="text">{{info.name}}</text>
					<!-- 在此行绝对定位放置店铺头像 -->
					<view class="avatar">
						<image :src="info.img_url" class="avatar-img"></image>
					</view>
				</view>
				<!-- 第二行 -- 评分 -->
				<view class="star">
					<view class="rate">
						<u-icon name="star-fill" color="#00aaff"></u-icon>
					</view>
					<view class="number">
						<text>{{info.rate}}</text>
					</view>
				</view>
				<!-- 第三行 -- 简介 -->
				<view class="intro">
					简介：{{info.intro?info.intro:"暂无简介"}}
				</view>
				<!-- 第四行 -- 联系方式 -->
				<view class="phone">
				    <view class="text-area">
				    	联系方式：{{info.phone?info.phone:"暂无联系方式"}}
				    </view>
					<!-- 要加一个复制按钮 （我也真是的 考虑的好周到） -->
					<view class="button-area">
						<text class="button" @click="copyValue(info.phone)">复制</text>
					</view>
					
				</view>
				<!-- 第五行 -- 粉丝群号 -->
				<view class="group">
					<view class="text-area">
					粉丝群号：{{info.group?info.group:"暂无粉丝群号"}}
					</view>
					<!-- 要加一个复制按钮 （我也真是的 考虑的好周到） -->
					<view class="button-area">
						<text class="button" @click="copyValue(info.phone)">复制</text>
					</view>
					
				</view>
				
			</view>
			<!-- tab切换 -- 购买 评论 商家 -->
			<view class="tabs-area">
				<view class="tabs">
					<u-tabs :list="list" overlay="false" :is-scroll="false" :current="current" @click="change"
							itemStyle="width:33%;padding:12rpx 0;color:#fff;" :activeStyle="{
						color: '#000',
						fontWeight: 'bold',
						transform: 'scale(1.05)',
						fontSize:'36rpx'
					}" lineWidth="40" :inactiveStyle="{
						color:'#3d3d3d',
						fontSize:'34rpx'
					}" lineColor="#00aaff">
					</u-tabs>
				</view>
				
			</view>
			<!-- 商品 -->
			<view class="goods" v-show="!current">
				<!-- 左侧 -- 选项栏 -- 不知道显示 先放在这儿吧-->
				<view class="choices">
					
				</view>
				<!-- 右侧 -- 商品简介 -->
				<view class="goods-area">
					<!-- 搜索栏 -->
					<view class="goods-search">
						<u-search placeholder="搜索商品" v-model="keyword" :show-action="false" :height="38"></u-search>
					</view>
					<view class="single-goods" v-for="(item,index) in info.goods" :key="index">
						<single-goods :img="item.goodsImage" :name="item.goodsName" :sales="item.goodsSales" :price="item.goodsPrice"></single-goods>
					</view>
				</view>
				
			</view>
			<!-- 加入购物车 -->
			<view class="addCart" v-show="!current">
				<view class="add">
					
				</view>
			</view>
			<!-- 评论 -->
			<view class="comments-area" v-show="current==1">
				<!-- 显示评分 -->
				<view class="show-rate">
					<view class="number">
						<text class="number-text">
							
							{{info.rate}}
						</text>
					</view>
					<view class="icon">
						<view class="show-text">
							<text class="text-cnt">店铺评分</text>
						</view>
						<view class="show-star">
							<u-rate :count="5" :value="info.rate"  :readonly="true" :size="30" :active-color="'#fae357'"></u-rate>
						</view>
					</view>
				</view>
				<!-- 评论主体 -->
				<view class="comments-body">
					<view class="single-comment" v-for="(item,index) in comments" :key="index">
						<single-comment :avatar="item.useravatar" :name="item.username" :content="item.content" :rate="item.rate" :tag="item.tag" :time="item.time"></single-comment>
					</view>
				</view>
				
				
			</view>
			<!-- 商家信息 -->
			<view class="merchant-info" v-show="current==2">
				<!-- 三行格式一致 -->
				<!-- 第一行 -- 地点 -->
				<view class="merchant-position">
					<view class="marchant-icon">
						<image src="../../static/position.png" class="merchant-image"></image>
					</view>
					<view class="merchant-text">
						<text class="inner-text">距您{{info.distance}}m</text>
					</view>
				</view>
				<!-- 第二行 -- 联系方式 -->
				<view class="merchant-phone">
					<view class="marchant-icon">
						<image src="../../static/phone.png" class="merchant-image"></image>
					</view>
					<view class="merchant-text">
						<text class="inner-text">联系方式：{{info.phone}}</text>
					</view>
				</view>
				<!-- 第三行 -- 粉丝群号 -->
				<view class="merchant-group">
					<view class="marchant-icon">
						<image src="../../static/group.png" class="merchant-image"></image>
					</view>
					<view class="merchant-text">
						<text class="inner-text">粉丝群号：{{info.group}}</text>
						
					</view>
				</view>
			</view>
		</view>

		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:{
						img_url: "../../static/shopSample2.png",
						name: "土豆饼",
						sales: 90,
						rate: 4.3,
						group:'123456789',
						phone:'122456789',
						comments: [
							"还挺好吃的"
					
						],
						distance: 500,
						hot: 7,
						intro:"专心做土豆饼",
						// 商品信息
						goods:[
							{

										 goodsImage:"../../pages-detail/static/foodSample.png",
										 goodsName:"食物", // 名称
										 goodsSales:"12", // 月销量
										 goodsPrice:"30" // 价格
							}
						]
					},
				// 评论信息
				comments:[
					{
						username:"用户甲",
						useravatar:"../../pages-detail/static/avatar.png",
						time:"2024.1.27",
						rate:4.5,
						content:"孩子很喜欢吃",
						tag:"食物"
					}
				],
				// tab栏信息
				list: [{
						name: '购买'
					},
					{
						name: '评价'
					},
					{
						name: '商家'
					}
				],
				// 当前选中
				current: 0,
				// 搜索栏双向绑定
				keyword:""

			};
		},
		// 接收传递的数据
		onLoad(options) {
			// console.log(options.info)
			// this.info = JSON.parse(options.info)
			console.log(this.info)
			
		},
		methods:{
			// 复制方法
			// 1.复制联系方式
			copyValue(value){
				uni.setClipboardData({
							    data: value ,
							    success: function () {
							        uni.showToast({
							            title: '复制成功',
							        });
							    },
							    fail:function () {
							        uni.showToast({
							            title: '复制失败',
							        });
							    }
							});
			},
			// 切换tab栏
			change(index) {
				// 根据tabs的切换改变下方渲染的内容
				this.current = index.index;
			}
			
		}
	}
</script>

<style lang="scss">
.shop-detail{
	position: relative;
	.background{
		width: 100%;
		.bg-image{
			width: 100%;
			// 将图片变暗
			filter: brightness(50%);
		}
	}
	.main{
		// 覆盖在背景图之上 -- 采用绝对定位
		position: absolute;
		top: 100px;
		background-color: #fff;
		width: 100%;
		.info{
			
			height: 300rpx;
			border-radius: 20px;
			box-sizing: border-box;
			padding: 30rpx;
			display: flex;
			flex-direction: column;
			.name{
				position: relative;
				flex: 1;
				// background-color: #ccc;
				font-weight: bold;
				font-size: 44rpx;
				// 文本垂直居中
				display: flex;
				.text{
					align-self: center;
				}
				.avatar{
					width: 180rpx;
					height: 180rpx;
					position: absolute;
					right: 40rpx;
					bottom: -30rpx;
					
					.avatar-img{
						width: 100%;
						height: 100%;
						border-radius: 10px;
						border: 1px solid #fff;
					}
				}
			}
			.star{
				flex: 1;
				// background-color: #666;
				display: flex;
				.rate{
					flex: 1;
					display: inline-block;
				}
				.number{
					flex: 20;
					color:#00aaff;
				}
			}
			.intro{
				flex: 1;
				font-weight: bold;
				font-size: 32rpx;
				margin-bottom: 20rpx;
			}
			.phone,.group{
				flex: 1;
				display: flex;
		
				.text-area{
					flex: 1;
				}
				.button-area{
					flex: 1;
				}
			}
		
		
		}
		.tabs-area{
			.tabs{
				width: 60%;
				color: #000;	
			}
				
		}
		.goods-area{
			margin-top: 20rpx;
			.goods-search{
				padding: 0 40rpx;
			}
		}
		.addCart{
			padding: 0 50rpx;
			box-sizing:border-box;
			position: fixed;
			bottom: 60rpx;
			height: 50px;
			width: 100%;
			.add{
				background-color: #232426;
				width: 100%;
				height: 100%;
				border-radius: 100rpx;
			}
			
		}
		.comments-area{
			.show-rate{
				padding: 30rpx 20rpx;
				width: 100%;
				height: 140rpx;
				background-color: #fff;
				display: flex;
				border-bottom: 40rpx solid #eee;
				.number{
					flex: 1;
					// background-color: pink;
					display: flex;
					.number-text{
						align-self: center;
						font-weight: bold;
						font-size: 80rpx;
						color: #00aaff;
					}
				}
				.icon{
					margin-left: 10rpx;
					flex: 4;
					display: flex;
					flex-direction: column;
					display: flex;
					flex-direction: column;
					.show-text{
						flex: 3;
					    // background-color: #00aaff;
						display: flex;
						.text-cnt{
							align-self: center;
							font-size: 34rpx;
						}
					}
					.show-star{
						flex: 2;
					}
				}
			}
			.comments-body{
				margin-top: 0rpx;
				height: 100px;
				// background-color: pink;
			}
		}
		.merchant-info{
			height: 100px;
			// background-color: #ccc;
			margin-top: 40rpx;
			.merchant-position{
				border-top: 40rpx solid #eee;
				border-bottom: 40rpx solid #eee;
			}
			.merchant-group{
				border-bottom: 40rpx solid #eee;
			}
			
			.merchant-position,.merchant-phone,.merchant-group{
				// background-color: blue;
				padding: 20rpx 40rpx;
				display: flex;
				.marchant-icon{
					flex: 1;
					// background-color: pink;
					.merchant-image{
						width: 50rpx;
						height: 50rpx;
					}
				}
				.merchant-text{
					margin-left: 28rpx;
					flex: 11;
					display: flex;
					.inner-text{
						align-self: center;
					}
				}
			}
		}

	}
	

}

</style>
