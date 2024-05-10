<template>
	<view class="goods">
		<!-- 左侧为图片 右侧为描述 -->
		<view class="left">
			<image :src="img_url" class="img"></image>
		</view>
		<view class="right">
			<!-- 店铺名称 -->
			<view class="name">
				<view class="shop_name">{{name}}</view>
				<!-- 新增一个月销量 -- 不然不知道放哪里了 -->
				<view class="sales">月销量: {{sales}}+</view>
			</view>
			<!-- 评分 -- 结构 是 图标和文字 -->
			<view class="comm">
				<view class="rate">
					<u-icon name="star-fill" color="#00aaff"></u-icon>
				</view>
				<view class="number">
					<text>{{rate}}</text>
				</view>
				
			</view>
			<view v-for="(item,index) in comments" :key="index" class="dis">
				<text>{{item}}</text>
			</view>
			<!-- 距离 -->
			<view class="distance">
				<view class="dis_dis">
					<text>距离您: {{distance}}m</text>
				</view>
				<view class="dis_icon">
					<u-icon name="map-fill" color="#666" size="14"></u-icon>
				</view>
			</view>
		  
		</view>
	</view>
</template>

<script>
	export default {
		name:"single-goods",
		data() {
			return {
				
			};
		},
		props:{
			// 店铺名称
			name:{
				required:true,
				type:String
			},
			// 销量
			sales:{
				required:true,
				type:Number
			},
			// 店铺评分
			rate:{
				required:true,
				type:Number
			},
			// 店铺评价
			comments:{
				required:true,
				type:Array
			},
			// 店铺距离
			distance:{
				required:true,
				type:Number
			},
			// 店铺图片
			img_url:{
				required:true,
				type:String
			}
			
			
		}
	}
</script>

<style lang="scss">
.goods{
	height: 250rpx;
	width: 100%;
	// background-color: pink;
	display: flex;
	.left{
		flex:1;
		padding: 18rpx;
		.img{
			width: 100%;
			height: 100%;
			
		}
	}
	.right{
		padding-top: 20rpx;
		flex: 2;
		// background-color: #666;
		display: flex;
		flex-direction: column;
		.name{
			padding-left: 3rpx;
			margin-bottom: 4rpx;
			flex: 1;
			display: flex;
			.shop_name{
				flex: 2;
				font-size: 36rpx;
				font-weight: bold;
				text-overflow: ellipsis;  /* 超出部分省略号 */
				overflow: hidden;
				display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 1; /** 显示的行数 **/
				word-break: break-all;  /* break-all(允许在单词内换行。) */
			}
			.sales{
				flex: 3;
				font-size: 26rpx;
				margin-left:  20rpx;
				
			}
			
			
		}
		.comm{
			font-size: 26rpx;
			color: #00aaff;
			flex: 1;
			display: flex;
            .rate{
				flex: 1;
				padding-top: 4rpx;
			}
			.number{
				flex: 12;
			}
			
		}
		.dis{
			font-size: 26rpx;
			color: #55aaff;
			flex: 1;
			
		}
		.distance{
			
			font-size: 28rpx;
			flex: 2;
			display: flex;
			.dis_dis{
				flex: 2;
			}
			.dis_icon{
			    padding-top: 8rpx;
				flex: 3;
			}
		}
		
	}
}
</style>