<template>
	<view class="my-submit">
		<!-- 左侧头像 -->
		<view class="submit-avatar">
			<image :src="submit_info.submit_avatar" class="avatar-image"></image>
		</view>
		<view class="submit-info">
			<view class="submit-name">
				{{submit_info.submit_name}}
			</view>
			<view class="submit-identity">
				{{submit_info.submit_identity}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-submit",
		data() {
			return {
				
			};
		},
		props:{
			submit_info:{
				required:true,
				type:Object
			}
		}
	}
</script>

<style lang="scss">
.my-submit{
	display: flex;
	margin: 36rpx 0 50rpx;
	padding: 0 20rpx;
	border-bottom: 1px solid #ccc;
	.submit-avatar{
		flex: 1;
		.avatar-image{
			width: 100rpx;
			height: 100rpx;
			border-radius: 100rpx;
		}
	}
	.submit-info{
		flex: 4;
		display: flex;
		flex-direction: column;
		.submit-name{
			flex: 1;
			font-weight: bold;
			font-size: 30rpx;
		}
		.submit-identity{
			flex: 1;
			font-size: 26rpx;
			
		}
	}
}
</style>