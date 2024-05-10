<template>
	<view class="shop-sup-detail">
	  <!-- 照片 -->
	  <view class="shop-image">
	  	  <image :src="datas.image" class="shop-image-url"></image>
	  </view>
	  <!-- 店名 -->
	  <view class="shop-name">
	  	{{datas.name}}
	  </view>
	  <!-- 根据传入的数据选择显示 距离 / 时间 -->
	  <view class="show-data">
			<text class="show-text">
				{{show_type==='time'?datas.time+'days':datas.distance+'m'}}
			</text>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			datas:{
				required:true,
				type:Object
			},
			show_type:{
				required:true,
				type:String
			}
		}
	}
</script>

<style lang="scss">
.shop-sup-detail{
	display: flex;
	height: 160rpx;
	padding: 20rpx;
	.shop-image{
		// background-color: #ccc;
		flex: 2;
		.shop-image-url{
			width: 160rpx;
			height: 160rpx;
		}
	}
	.shop-name{
		flex: 4;
		
		font-size: 36rpx;
	}
	.show-data{
		flex: 1;
		// background-color: #666;
		display: flex;
		text-align: center;
		.show-text{
			align-self: center;
			
			font-size: 26rpx;
		}
	}
}
</style>
