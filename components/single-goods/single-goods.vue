<template>
	<view class="single-goods">
		<!-- 商品图片 -->
		<view class="img">
			<image :src="img" class="img_url"></image>
		</view>
		<!-- 商品信息 -->
		<view class="single-info">
			<!-- 商品名称 -->
			<view class="name">
				{{name}}
			</view>
			<!-- 商品月销量 -->
			<view class="sales">
				月销量：{{sales}}
			</view>
			<!-- 商品价格 -->
			<view class="price">
				<text class="hypen">￥</text>
				<text class="text">{{price}}</text>
			</view>
			<!-- 加入购物车 -->
			<view class="add">
				<u-number-box :min="0" :max="100"></u-number-box>
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
			img:{
				type:String,
				required:true
			},
			name:{
				type:String,
				required:true
			},
			sales:{
				type:String,
				required:true
			},
			price:{
				type:String,
				required:true
			}
		}
	}
</script>

<style lang="scss">
.single-goods{
	padding: 20rpx;
	height: 200rpx;
	display: flex;
	box-sizing: content-box;
	.img{
		flex: 1;
		.img_url{
			width: 100%;
			height: 100%;
			border-radius: 10px;
		}
	}
	.single-info{
		position: relative;
		flex: 2;
		display: flex;
		flex-direction: column;
		// background-color: pink;
		margin-left: 20rpx;
		.name{
			flex: 1;
			font-weight: bold;
			font-size: 34rpx;
		}
		.sales{
			flex: 3;
			color: #666;
			margin-top: 10rpx;
			
		}
		.price{
			color: #eb4b2f;
			flex: 1;
			font-weight: bold;
			.hypen{
				font-size: 30rpx;
			}
			.text{
				font-size: 44rpx;
			};
		}
		.add{
			position: absolute;
			right: 0;
			bottom: 0;
		}
	}
}
</style>